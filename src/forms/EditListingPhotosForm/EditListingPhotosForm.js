import React, { Component } from 'react';
import { array, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { nonEmptyArray, composeValidators } from '../../util/validators';
import { isUploadImageOverLimitError } from '../../util/errors';
import { AddImages, Button, Form, ValidationError, AddImage } from '../../components';

import css from './EditListingPhotosForm.css';

const ACCEPT_IMAGES = 'image/*';
const identity = v => v;

export class EditListingPhotosFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { imageUploadRequested: false };
    this.onImageUploadHandler = this.onImageUploadHandler.bind(this);
    this.submittedImages = [];
  }

  onImageUploadHandler(file) {
    if (file) {
      this.setState({ imageUploadRequested: true });
      this.props
        .onImageUpload({ id: `${file.name}_${Date.now()}`, file })
        .then(() => {
          this.setState({ imageUploadRequested: false });
        })
        .catch(() => {
          this.setState({ imageUploadRequested: false });
        });
    }
  }

  onCoverUploadHandler = file => {
    if (file) {
      this.setState({ imageUploadRequested: true });
      this.props.onCoverUpload({ id: `${file.name}_${Date.now()}`, file })
        .then(() => {
          this.setState({ imageUploadRequested: false });
        })
        .catch(() => {
          this.setState({ imageUploadRequested: false });
        });
    }
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        onImageUploadHandler={this.onImageUploadHandler}
        onCoverUploadHandler={this.onCoverUploadHandler}
        imageUploadRequested={this.state.imageUploadRequested}
        initialValues={{ images: this.props.images, cover: this.props.cover }}
        render={formRenderProps => {
          const {
            form,
            className,
            fetchErrors,
            handleSubmit,
            images,
            imageUploadRequested,
            intl,
            invalid,
            onImageUploadHandler,
            onRemoveImage,
            disabled,
            ready,
            saveActionMsg,
            updated,
            updateInProgress,
            onCoverUploadHandler,
            values,
          } = formRenderProps;
          console.log(values.cover)
          const chooseImageText = (
            <span className={css.chooseImageText}>
              <span className={css.chooseImage}>
                <FormattedMessage id="EditListingPhotosForm.chooseImage" />
              </span>
              <span className={css.imageTypes}>
                <FormattedMessage id="EditListingPhotosForm.imageTypes" />
              </span>
            </span>
          );

          const chooseImageCoverText = values.cover ? (
            <span className={classNames(css.chooseImageText, css.changeImgText)}>
              Change Images
            </span>
          ) : (
              <span className={css.chooseImageText}>
                <span className={css.chooseImage}>
                  <FormattedMessage id="EditListingPhotosForm.chooseImage" />
                </span>
                <span className={css.imageTypes}>
                  <FormattedMessage id="EditListingPhotosForm.imageTypes" />
                </span>
              </span>
            );

          const imageRequiredMessage = intl.formatMessage({
            id: 'EditListingPhotosForm.imageRequired',
          });

          const { publishListingError, showListingsError, updateListingError, uploadImageError } =
            fetchErrors || {};
          const uploadOverLimit = isUploadImageOverLimitError(uploadImageError);

          let uploadImageFailed = null;

          if (uploadOverLimit) {
            uploadImageFailed = (
              <p className={css.error}>
                <FormattedMessage id="EditListingPhotosForm.imageUploadFailed.uploadOverLimit" />
              </p>
            );
          } else if (uploadImageError) {
            uploadImageFailed = (
              <p className={css.error}>
                <FormattedMessage id="EditListingPhotosForm.imageUploadFailed.uploadFailed" />
              </p>
            );
          }

          // NOTE: These error messages are here since Photos panel is the last visible panel
          // before creating a new listing. If that order is changed, these should be changed too.
          // Create and show listing errors are shown above submit button
          const publishListingFailed = publishListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPhotosForm.publishListingFailed" />
            </p>
          ) : null;
          const showListingFailed = showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPhotosForm.showListingFailed" />
            </p>
          ) : null;

          const submittedOnce = this.submittedImages.length > 0;
          // imgs can contain added images (with temp ids) and submitted images with uniq ids.
          const arrayOfImgIds = imgs =>
            imgs.map(i => (typeof i.id === 'string' ? i.imageId : i.id));
          const imageIdsFromProps = arrayOfImgIds(images);
          const imageIdsFromPreviousSubmit = arrayOfImgIds(this.submittedImages);
          const imageArrayHasSameImages = isEqual(imageIdsFromProps, imageIdsFromPreviousSubmit);
          const pristineSinceLastSubmit = submittedOnce && imageArrayHasSameImages;

          const submitReady = (updated && pristineSinceLastSubmit) || ready;
          const submitInProgress = updateInProgress;
          const submitDisabled =
            invalid || disabled || submitInProgress || imageUploadRequested || ready;

          const classes = classNames(css.root, className);

          return (
            <Form
              className={classes}
              onSubmit={e => {
                this.submittedImages = images;
                handleSubmit(e);
              }}
            >
              {updateListingError ? (
                <p className={css.error}>
                  <FormattedMessage id="EditListingPhotosForm.updateFailed" />
                </p>
              ) : null}
              <div className={css.section}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id='EditListingPhotosForm.yourMainPhotoTitle' />
                </h3>
                <div className={css.description}>
                  <FormattedMessage id='EditListingPhotosForm.yourMainPhotoDesc' />
                </div>
                <AddImages
                  className={css.imagesField}
                  images={images}
                  thumbnailClassName={css.thumbnail}
                  savedImageAltText={intl.formatMessage({
                    id: 'EditListingPhotosForm.savedImageAltText',
                  })}
                  onRemoveImage={onRemoveImage}
                >
                  <Field
                    id="addImage"
                    name="addImage"
                    accept={ACCEPT_IMAGES}
                    form={identity}
                    label={chooseImageText}
                    type="file"
                    disabled={imageUploadRequested}
                  >
                    {fieldprops => {
                      const { accept, input, label, disabled: fieldDisabled } = fieldprops;
                      const { name, type } = input;
                      const onChange = e => {
                        const file = e.target.files[0];
                        form.change(`addImage`, file);
                        form.blur(`addImage`);
                        onImageUploadHandler(file);
                      };
                      const inputProps = { accept, id: name, name, onChange, type };
                      return (
                        <div className={css.addImageWrapper}>
                          <div className={css.aspectRatioWrapper}>
                            {fieldDisabled ? null : (
                              <input {...inputProps} className={css.addImageInput} />
                            )}
                            <label htmlFor={name} className={css.addImage}>
                              {label}
                            </label>
                          </div>
                        </div>
                      );
                    }}
                  </Field>

                  <Field
                    component={props => {
                      const { input, meta } = props;
                      return (
                        <div className={css.imageRequiredWrapper}>
                          <input {...input} />
                          <ValidationError fieldMeta={meta} />
                        </div>
                      );
                    }}
                    name="images"
                    type="hidden"
                    // validate={composeValidators(nonEmptyArray(imageRequiredMessage))}
                  />
                </AddImages>
              </div>
              <div className={css.section}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id='EditListingPhotosForm.firstAidCertificateTitle' />
                </h3>
                <div className={css.description}>
                  <FormattedMessage id='EditListingPhotosForm.firstAidCertificateDesc' />
                </div>
                <AddImage
                  className={classNames(css.imagesField, css.coverWrapper)}
                  image={values.cover}
                  thumbnailClassName={css.thumbnail}
                  savedImageAltText={intl.formatMessage({
                    id: 'EditListingPhotosForm.savedImageAltText',
                  })}
                  onRemoveImage={onRemoveImage}
                >
                  <Field
                    id="addImages"
                    name="addImages"
                    form={identity}
                    accept={ACCEPT_IMAGES}
                    label={chooseImageCoverText}
                    type="file"
                    disabled={imageUploadRequested}
                  >
                    {fieldprops => {
                      const { accept, input, label, disabled } = fieldprops;
                      const { name, type } = input;
                      const onChange = e => {
                        const file = e.target.files[0];
                        form.change(`addImages`, file);
                        form.blur(`addImages`);
                        onCoverUploadHandler(file);
                      };
                      const inputProps = { accept, id: name, name, onChange, type };
                      return (
                        <div className={classNames(css.addImageWrapper)}>
                          {
                            values.cover ? (
                              <div className={css.changeImageWrapper}>
                                {disabled ? null : (
                                  <input {...inputProps} className={css.addImageInput} />
                                )}
                                <label htmlFor={name} className={values.cover ? css.changeImage : css.addImage}>
                                  {label}
                                </label>
                              </div>
                            ) : (
                                <div className={css.aspectRatioWrapper}>
                                  {disabled ? null : (
                                    <input {...inputProps} className={css.addImageInput} />
                                  )}
                                  <label htmlFor={name} className={values.cover ? css.changeImage : css.addImage}>
                                    {label}
                                  </label>
                                </div>
                              )

                          }

                          {/* <div className={css.aspectRatioWrapper}>
                            {disabled ? null : (
                              <input {...inputProps} className={css.addImageInput} />
                            )}
                            <label htmlFor={name} className={values.cover ? css.changeImage : css.addImage}>
                              {label}
                            </label>
                          </div> */}
                        </div>
                      );
                    }}
                  </Field>
                  <Field
                    component={props => {
                      const { input, meta } = props;
                      return (
                        <div className={css.imageRequiredWrapper}>
                          <input {...input} />
                          <ValidationError fieldMeta={meta} />
                        </div>
                      );
                    }}
                    name="cover"
                    type="hidden"
                  />
                </AddImage>
              </div>
              {uploadImageFailed}

              <p className={css.tip}>
                <FormattedMessage id="EditListingPhotosForm.addImagesTip" />
              </p>
              {publishListingFailed}
              {showListingFailed}

              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={submitReady}
              >
                {saveActionMsg}
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

EditListingPhotosFormComponent.defaultProps = { fetchErrors: null, images: [] };

EditListingPhotosFormComponent.propTypes = {
  fetchErrors: shape({
    publishListingError: propTypes.error,
    showListingsError: propTypes.error,
    uploadImageError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  images: array,
  intl: intlShape.isRequired,
  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  onRemoveImage: func.isRequired,
};

export default compose(injectIntl)(EditListingPhotosFormComponent);
