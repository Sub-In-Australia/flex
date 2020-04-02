/**
 * Creates a sortable image grid with children added to the end of the created grid.
 *
 * Example:
 * // images = [{ id: 'tempId', imageId: 'realIdFromAPI', file: File }];
 * <AddImage images={images}>
 *   <input type="file" accept="images/*" onChange={handleChange} />
 * </AddImage>
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ImageFromFile, ResponsiveImage, IconSpinner } from '../../components';

import css from './AddImage.css';
import RemoveImageButton from '../AddImages/RemoveImageButton';

const ThumbnailWrapper = props => {
  const { className, image, savedImageAltText, onRemoveImage } = props;
  const handleRemoveClick = e => {
    e.stopPropagation();
    onRemoveImage(image.id);
  };

  if (image && image.file) {
    // Add remove button only when the image has been uploaded and can be removed
    const removeButton = image.imageId ? <RemoveImageButton onClick={handleRemoveClick} /> : null;

    // While image is uploading we show overlay on top of thumbnail
    const uploadingOverlay = !image.imageId ? (
      <div className={css.thumbnailLoading}>
        <IconSpinner />
      </div>
    ) : null;

    return (
      <ImageFromFile
        id={image.id}
        className={className}
        rootClassName={css.thumbnail}
        file={image.file}
      >
        {uploadingOverlay}
      </ImageFromFile>
    );
  } else {
    const classes = classNames(css.thumbnail, className);
    return (
      <div className={classes}>
        <div className={css.threeToTwoWrapper}>
          <div className={css.aspectWrapper}>
            <ResponsiveImage
              rootClassName={css.rootForImage}
              image={image}
              alt={savedImageAltText}
              variants={['landscape-crop', 'landscape-crop2x']}
            />
          </div>
        </div>
      </div>
    );
  }
};

ThumbnailWrapper.defaultProps = { className: null };

const { func, node, string, object } = PropTypes;

ThumbnailWrapper.propTypes = {
  className: string,
  image: object.isRequired,
  savedImageAltText: string.isRequired,
  onRemoveImage: func.isRequired,
};

const AddImage = props => {
  const {
    children,
    className,
    thumbnailClassName,
    image,
    savedImageAltText,
    onRemoveImage,
  } = props;
  const classes = classNames(css.root, className);
  return (
    <div className={classes}>

      {
        image && <ThumbnailWrapper
          image={image}
          className={thumbnailClassName}
          savedImageAltText={savedImageAltText}
          onRemoveImage={onRemoveImage}
        />
      }
      {
        children
      }
    </div>
  );
};

AddImage.defaultProps = { className: null, thumbnailClassName: null, images: [] };

AddImage.propTypes = {
  image: object,
  children: node.isRequired,
  className: string,
  thumbnailClassName: string,
  savedImageAltText: string.isRequired,
  onRemoveImage: func.isRequired,
};

export default AddImage;
