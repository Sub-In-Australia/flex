import React, { Component } from 'react';
import { bool, string, array } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Field, Form as FinalForm } from 'react-final-form';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { ensureCurrentUser } from '../../util/data';
import { propTypes, ACCOUNT_TYPE_CHILDCARE_WORKER, ACCOUNT_TYPE_MEDICAL_WORKER } from '../../util/types';
import * as validators from '../../util/validators';
import { isUploadImageOverLimitError } from '../../util/errors';
import {
  Form, Avatar, Button, ImageFromFile, IconSpinner, FieldTextInput,
  FieldPhoneNumberInput, FieldSelect, FieldCheckbox
} from '../../components';
import config from '../../config';
import { Condition } from '../../util/helperComponents';

import css from './ProfileSettingsForm.css';

const ACCEPT_IMAGES = 'image/*';
const UPLOAD_CHANGE_DELAY = 2000; // Show spinner so that browser has time to load img srcset

class ProfileSettingsFormComponent extends Component {
  constructor(props) {
    super(props);

    this.uploadDelayTimeoutId = null;
    this.state = { uploadDelay: false };
    this.submittedValues = {};
  }

  componentDidUpdate(prevProps) {
    // Upload delay is additional time window where Avatar is added to the DOM,
    // but not yet visible (time to load image URL from srcset)
    if (prevProps.uploadInProgress && !this.props.uploadInProgress) {
      this.setState({ uploadDelay: true });
      this.uploadDelayTimeoutId = window.setTimeout(() => {
        this.setState({ uploadDelay: false });
      }, UPLOAD_CHANGE_DELAY);
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.uploadDelayTimeoutId);
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        render={fieldRenderProps => {
          const {
            className,
            currentUser,
            handleSubmit,
            intl,
            invalid,
            onImageUpload,
            pristine,
            profileImage,
            rootClassName,
            updateInProgress,
            updateProfileError,
            uploadImageError,
            uploadInProgress,
            form,
            values,
            highRiskWithCovid19,
          } = fieldRenderProps;

          const user = ensureCurrentUser(currentUser);

          // First name
          const firstNameLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.firstNameLabel',
          });
          const firstNamePlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.firstNamePlaceholder',
          });
          const firstNameRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.firstNameRequired',
          });
          const firstNameRequired = validators.required(firstNameRequiredMessage);

          // Last name
          const lastNameLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNameLabel',
          });
          const lastNamePlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNamePlaceholder',
          });
          const lastNameRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNameRequired',
          });
          const lastNameRequired = validators.required(lastNameRequiredMessage);

          // phone number
          const phoneNumberLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.phoneNumberLabel',
          });
          const phoneNumberPlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.phoneNumberPlaceholder',
          });
          const phoneNumberRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.phoneNumberRequired',
          });
          const phoneNumberRequired = validators.required(phoneNumberRequiredMessage);

          // Bio
          const bioLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.bioLabel',
          });
          const bioPlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.bioPlaceholder',
          });

          // I read the tos
          const iReadTheTosLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.iReadTheTosLabel'
          });
          const iReadTheTosPlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.iReadTheTosPlaceholder',
          });
          const iReadTheTosRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.iReadTheTosRequired',
          });
          const iReadTheTosRequired = validators.required(iReadTheTosRequiredMessage);

          // Reference Check
          const referenceCheckLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.referenceCheckLabel'
          });

          // I am able to supply verification of identity and credentials
          const ableToSupplyVerificationOfICLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.ableToSupplyVerificationOfICLabel'
          });


          // Healthcare worker identifier - For Medical Worker (Customer)
          const healthcareWorkerIdentifierLabel = intl.formatMessage({
            id: 'SignupForm.healthcareWorkerIdentifierLabel',
          });
          const healthcareWorkerIdentifierPlaceholder = intl.formatMessage({
            id: 'SignupForm.healthcareWorkerIdentifierPlaceholder',
          });
          const healthcareWorkerIdentifierRequiredMessage = intl.formatMessage({
            id: 'SignupForm.healthcareWorkerIdentifierRequired',
          });
          const healthcareWorkerIdentifierRequired = validators.required(healthcareWorkerIdentifierRequiredMessage);

          // High risk with Covid19 - For Medical Worker (Customer)
          const highRiskWithCovid19Label = intl.formatMessage({
            id: 'SignupForm.highRiskWithCovid19Label',
          });
          const highRiskWithCovid19Placeholder = intl.formatMessage({
            id: 'SignupForm.highRiskWithCovid19Placeholder',
          });

          // Profession/Position - For Medical Worker (Customer)
          const professionPositionLabel = intl.formatMessage({
            id: 'SignupForm.professionPositionLabel',
          });
          const professionPositionPlaceholder = intl.formatMessage({
            id: 'SignupForm.professionPositionPlaceholder',
          });
          const professionPositionRequiredMessage = intl.formatMessage({
            id: 'SignupForm.professionPositionRequired',
          });
          const professionPositionRequired = validators.required(professionPositionRequiredMessage);

          // Healthcare Registration Number - For Medical Worker (Customer)
          const healthcareRegistrationNumberLabel = intl.formatMessage({
            id: 'SignupForm.healthcareRegistrationNumberLabel',
          });
          const healthcareRegistrationNumberPlaceholder = intl.formatMessage({
            id: 'SignupForm.healthcareRegistrationNumberPlaceholder',
          });
          const healthcareRegistrationNumberRequiredMessage = intl.formatMessage({
            id: 'SignupForm.healthcareRegistrationNumberRequired',
          });
          const healthcareRegistrationNumberRequired = validators.required(healthcareRegistrationNumberRequiredMessage);

          // LinkedIn Profile - For Medical Worker (Customer)
          const linkedInLabel = intl.formatMessage({
            id: 'SignupForm.linkedInLabel',
          });
          const linkedInPlaceholder = intl.formatMessage({
            id: 'SignupForm.linkedInPlaceholder',
          });

          // Location: Hospital/Healthcare Centre - For Medical Worker (Customer)
          const workingLocationLabel = intl.formatMessage({
            id: 'SignupForm.workingLocationLabel',
          });
          const workingLocationPlaceholder = intl.formatMessage({
            id: 'SignupForm.workingLocationPlaceholder',
          });
          const workingLocationRequiredMessage = intl.formatMessage({
            id: 'SignupForm.workingLocationRequired',
          });
          const workingLocationRequired = validators.required(workingLocationRequiredMessage);

          // WWVP Registration Number - For Childcare Worker (Provider)
          const wwvpRegistrationNumberLabel = intl.formatMessage({
            id: 'SignupForm.wwvpRegistrationNumberLabel',
          });
          const wwvpRegistrationNumberPlaceholder = intl.formatMessage({
            id: 'SignupForm.wwvpRegistrationNumberPlaceholder',
          });
          const wwvpRegistrationNumberRequiredMessage = intl.formatMessage({
            id: 'SignupForm.wwvpRegistrationNumberRequired',
          });
          const wwvpRegistrationNumberRequired = validators.required(wwvpRegistrationNumberRequiredMessage);

          // Working With Children Check - For Childcare Worker (Provider)
          const workingWithChildrenCheckLabel = intl.formatMessage({
            id: 'SignupForm.workingWithChildrenCheckLabel',
          });
          const workingWithChildrenCheckPlaceholder = intl.formatMessage({
            id: 'SignupForm.workingWithChildrenCheckPlaceholder',
          });
          const workingWithChildrenCheckRequiredMessage = intl.formatMessage({
            id: 'SignupForm.workingWithChildrenCheckRequired',
          });
          const workingWithChildrenCheckRequired = validators.required(workingWithChildrenCheckRequiredMessage);

          // VIT Registration Number - For Childcare Worker (Provider)
          const vitRegistrationNumberLabel = intl.formatMessage({
            id: 'SignupForm.vitRegistrationNumberLabel',
          });
          const vitRegistrationNumberPlaceholder = intl.formatMessage({
            id: 'SignupForm.vitRegistrationNumberPlaceholder',
          });
          const vitRegistrationNumberRequiredMessage = intl.formatMessage({
            id: 'SignupForm.vitRegistrationNumberRequired',
          });
          const vitRegistrationNumberRequired = validators.required(vitRegistrationNumberRequiredMessage);

          // Expiry Date - For Childcare Worker (Provider)
          const expiryDateLabel = intl.formatMessage({
            id: 'SignupForm.expiryDateLabel',
          });
          const expiryDatePlaceholder = intl.formatMessage({
            id: 'SignupForm.expiryDatePlaceholder',
          });
          const expiryDateRequiredMessage = intl.formatMessage({
            id: 'SignupForm.expiryDateRequired',
          });
          const expiryDateRequired = validators.required(expiryDateRequiredMessage);

          // State of Issue - For Childcare Worker (Provider)
          const stateOfIssueLabel = intl.formatMessage({
            id: 'SignupForm.stateOfIssueLabel',
          });
          const stateOfIssuePlaceholder = intl.formatMessage({
            id: 'SignupForm.stateOfIssuePlaceholder',
          });
          const stateOfIssueRequiredMessage = intl.formatMessage({
            id: 'SignupForm.stateOfIssueRequired',
          });
          const stateOfIssueRequired = validators.required(stateOfIssueRequiredMessage);

          const uploadingOverlay =
            uploadInProgress || this.state.uploadDelay ? (
              <div className={css.uploadingImageOverlay}>
                <IconSpinner />
              </div>
            ) : null;

          const hasUploadError = !!uploadImageError && !uploadInProgress;
          const errorClasses = classNames({ [css.avatarUploadError]: hasUploadError });
          const transientUserProfileImage = profileImage.uploadedImage || user.profileImage;
          const transientUser = { ...user, profileImage: transientUserProfileImage };

          // Ensure that file exists if imageFromFile is used
          const fileExists = !!profileImage.file;
          const fileUploadInProgress = uploadInProgress && fileExists;
          const delayAfterUpload = profileImage.imageId && this.state.uploadDelay;
          const imageFromFile =
            fileExists && (fileUploadInProgress || delayAfterUpload) ? (
              <ImageFromFile
                id={profileImage.id}
                className={errorClasses}
                rootClassName={css.uploadingImage}
                aspectRatioClassName={css.squareAspectRatio}
                file={profileImage.file}
              >
                {uploadingOverlay}
              </ImageFromFile>
            ) : null;

          // Avatar is rendered in hidden during the upload delay
          // Upload delay smoothes image change process:
          // responsive img has time to load srcset stuff before it is shown to user.
          const avatarClasses = classNames(errorClasses, css.avatar, {
            [css.avatarInvisible]: this.state.uploadDelay,
          });
          const avatarComponent =
            !fileUploadInProgress && profileImage.imageId ? (
              <Avatar
                className={avatarClasses}
                renderSizes="(max-width: 767px) 96px, 240px"
                user={transientUser}
                disableProfileLink
              />
            ) : null;

          const chooseAvatarLabel =
            profileImage.imageId || fileUploadInProgress ? (
              <div className={css.avatarContainer}>
                {imageFromFile}
                {avatarComponent}
                <div className={css.changeAvatar}>
                  <FormattedMessage id="ProfileSettingsForm.changeAvatar" />
                </div>
              </div>
            ) : (
                <div className={css.avatarPlaceholder}>
                  <div className={css.avatarPlaceholderText}>
                    <FormattedMessage id="ProfileSettingsForm.addYourProfilePicture" />
                  </div>
                  <div className={css.avatarPlaceholderTextMobile}>
                    <FormattedMessage id="ProfileSettingsForm.addYourProfilePictureMobile" />
                  </div>
                </div>
              );

          const submitError = updateProfileError ? (
            <div className={css.error}>
              <FormattedMessage id="ProfileSettingsForm.updateProfileFailed" />
            </div>
          ) : null;

          const classes = classNames(rootClassName || css.root, className);
          const submitInProgress = updateInProgress;
          const submittedOnce = Object.keys(this.submittedValues).length > 0;
          const pristineSinceLastSubmit = submittedOnce && isEqual(values, this.submittedValues);
          const submitDisabled =
            invalid || pristine || pristineSinceLastSubmit || uploadInProgress || submitInProgress;

          return (
            <Form
              className={classes}
              onSubmit={e => {
                this.submittedValues = values;
                handleSubmit(e);
              }}
            >
              <div className={css.sectionContainer}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.yourProfilePicture" />
                </h3>
                <Field 
                  id="accountType"
                  name="accountType"
                  type="hidden"
                  disabled
                >
                  {fieldProps => {
                    const { id, input, disabled } = fieldProps;
                    const { name, type } = input;

                    return (
                      <input 
                        id={id}
                        name={name}
                        type={type}
                        disabled={disabled}
                      />
                    )
                  }}
                </Field>
                <Field
                  accept={ACCEPT_IMAGES}
                  id="profileImage"
                  name="profileImage"
                  label={chooseAvatarLabel}
                  type="file"
                  form={null}
                  uploadImageError={uploadImageError}
                  disabled={uploadInProgress}
                >
                  {fieldProps => {
                    const { accept, id, input, label, disabled, uploadImageError } = fieldProps;
                    const { name, type } = input;
                    const onChange = e => {
                      const file = e.target.files[0];
                      form.change(`profileImage`, file);
                      form.blur(`profileImage`);
                      if (file != null) {
                        const tempId = `${file.name}_${Date.now()}`;
                        onImageUpload({ id: tempId, file });
                      }
                    };

                    let error = null;

                    if (isUploadImageOverLimitError(uploadImageError)) {
                      error = (
                        <div className={css.error}>
                          <FormattedMessage id="ProfileSettingsForm.imageUploadFailedFileTooLarge" />
                        </div>
                      );
                    } else if (uploadImageError) {
                      error = (
                        <div className={css.error}>
                          <FormattedMessage id="ProfileSettingsForm.imageUploadFailed" />
                        </div>
                      );
                    }

                    return (
                      <div className={css.uploadAvatarWrapper}>
                        <label className={css.label} htmlFor={id}>
                          {label}
                        </label>
                        <input
                          accept={accept}
                          id={id}
                          name={name}
                          className={css.uploadAvatarInput}
                          disabled={disabled}
                          onChange={onChange}
                          type={type}
                        />
                        {error}
                      </div>
                    );
                  }}
                </Field>
                <div className={css.tip}>
                  <FormattedMessage id="ProfileSettingsForm.tip" />
                </div>
                <div className={css.fileInfo}>
                  <FormattedMessage id="ProfileSettingsForm.fileInfo" />
                </div>
              </div>
              <div className={css.sectionContainer}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.yourName" />
                </h3>
                <div className={css.nameContainer}>
                  <FieldTextInput
                    className={css.firstName}
                    type="text"
                    id="firstName"
                    name="firstName"
                    label={firstNameLabel}
                    placeholder={firstNamePlaceholder}
                    validate={firstNameRequired}
                  />
                  <FieldTextInput
                    className={css.lastName}
                    type="text"
                    id="lastName"
                    name="lastName"
                    label={lastNameLabel}
                    placeholder={lastNamePlaceholder}
                    validate={lastNameRequired}
                  />
                </div>
              </div>
              <div className={css.sectionContainer}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.contactHeading" />
                </h3>
                <FieldPhoneNumberInput
                  id={'phoneNumber'}
                  name="phoneNumber"
                  label={phoneNumberLabel}
                  placeholder={phoneNumberPlaceholder}
                  className={css.phoneNumber}
                  validate={phoneNumberRequired}
                />
              </div>
              <div className={css.sectionContainer}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.bioHeading" />
                </h3>
                <FieldTextInput
                  type="textarea"
                  id="bio"
                  name="bio"
                  label={bioLabel}
                  placeholder={bioPlaceholder}
                />
                <p className={css.bioInfo}>
                  <FormattedMessage id="ProfileSettingsForm.bioInfo" />
                </p>
              </div>
              <div className={classNames(css.sectionContainer, css.lastSection)}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.moreInformationHeading" />
                </h3>
                <FieldTextInput
                  type="text"
                  id={'iReadTheTos'}
                  name="iReadTheTos"
                  label={iReadTheTosLabel}
                  placeholder={iReadTheTosPlaceholder}
                  className={css.iReadTheTos}
                  validate={iReadTheTosRequired}
                />

                <FieldCheckbox
                  id={'referenceCheck'}
                  name="referenceCheck"
                  label={referenceCheckLabel}
                  value={'accepted'}
                  className={css.referenceCheck}
                />

                <FieldCheckbox
                  id={'ableToSupplyVerificationOfIC'}
                  name="ableToSupplyVerificationOfIC"
                  label={ableToSupplyVerificationOfICLabel}
                  value={'accepted'}
                  className={css.ableToSupplyVerificationOfIC}
                />

                {/* <Condition when="accountType" is={ACCOUNT_TYPE_CHILDCARE_WORKER}>
                  <FieldTextInput
                    className={css.generalField}
                    type="text"
                    id={'wwvpRegistrationNumber'}
                    name="wwvpRegistrationNumber"
                    label={wwvpRegistrationNumberLabel}
                    placeholder={wwvpRegistrationNumberPlaceholder}
                    validate={wwvpRegistrationNumberRequired}
                  />
                  <FieldTextInput
                    className={css.generalField}
                    type="text"
                    id={'workingWithChildrenCheck'}
                    name="workingWithChildrenCheck"
                    label={workingWithChildrenCheckLabel}
                    placeholder={workingWithChildrenCheckPlaceholder}
                    validate={workingWithChildrenCheckRequired}
                  />
                  <FieldTextInput
                    className={css.generalField}
                    type="text"
                    id={'vitRegistrationNumber'}
                    name="vitRegistrationNumber"
                    label={vitRegistrationNumberLabel}
                    placeholder={vitRegistrationNumberPlaceholder}
                  />
                  <FieldTextInput
                    className={css.generalField}
                    type="text"
                    id={'expiryDate'}
                    name="expiryDate"
                    label={expiryDateLabel}
                    placeholder={expiryDatePlaceholder}
                    validate={expiryDateRequired}
                  />
                  <FieldTextInput
                    className={css.generalField}
                    type="text"
                    id={'stateOfIssue'}
                    name="stateOfIssue"
                    label={stateOfIssueLabel}
                    placeholder={stateOfIssuePlaceholder}
                    validate={stateOfIssueRequired}
                  />
                </Condition> */}

                <Condition when="accountType" is={ACCOUNT_TYPE_MEDICAL_WORKER}>
                  <FieldTextInput
                    className={css.generalField}
                    type="text"
                    id={'healthcareWorkerIdentifier'}
                    name="healthcareWorkerIdentifier"
                    label={healthcareWorkerIdentifierLabel}
                    placeholder={healthcareWorkerIdentifierPlaceholder}
                    validate={healthcareWorkerIdentifierRequired}
                  />
                  <FieldSelect
                    className={css.generalField}
                    id={'highRiskWithCovid19'}
                    name="highRiskWithCovid19"
                    label={highRiskWithCovid19Label}
                  >
                    <option value="" disabled>{highRiskWithCovid19Placeholder}</option>
                    {highRiskWithCovid19.map(type => (
                      <option key={type.key} value={type.key}>{intl.formatMessage({ id: type.labelId })}</option>
                    ))}
                  </FieldSelect>
                  {/* <FieldTextInput
                    className={css.generalField}
                    type="text"
                    id={'professionPosition'}
                    name="professionPosition"
                    label={professionPositionLabel}
                    placeholder={professionPositionPlaceholder}
                    validate={professionPositionRequired}
                  />
                  <FieldTextInput
                    className={css.generalField}
                    type="text"
                    id={'healthcareRegistrationNumber'}
                    name="healthcareRegistrationNumber"
                    label={healthcareRegistrationNumberLabel}
                    placeholder={healthcareRegistrationNumberPlaceholder}
                    validate={healthcareRegistrationNumberRequired}
                  />
                  <FieldTextInput
                    className={css.generalField}
                    type="text"
                    id={'linkedIn'}
                    name="linkedIn"
                    label={linkedInLabel}
                    placeholder={linkedInPlaceholder}
                  />
                  <FieldTextInput
                    className={css.generalField}
                    type="text"
                    id={'workingLocation'}
                    name="workingLocation"
                    label={workingLocationLabel}
                    placeholder={workingLocationPlaceholder}
                    validate={workingLocationRequired}
                  /> */}
                </Condition>
              </div>
              {submitError}
              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={pristineSinceLastSubmit}
              >
                <FormattedMessage id="ProfileSettingsForm.saveChanges" />
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

ProfileSettingsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  uploadImageError: null,
  updateProfileError: null,
  updateProfileReady: false,
  highRiskWithCovid19: config.custom.highRiskWithCovid19
};

ProfileSettingsFormComponent.propTypes = {
  rootClassName: string,
  className: string,

  uploadImageError: propTypes.error,
  uploadInProgress: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  updateProfileReady: bool,
  highRiskWithCovid19: array,

  // from injectIntl
  intl: intlShape.isRequired,
};

const ProfileSettingsForm = compose(injectIntl)(ProfileSettingsFormComponent);

ProfileSettingsForm.displayName = 'ProfileSettingsForm';

export default ProfileSettingsForm;
