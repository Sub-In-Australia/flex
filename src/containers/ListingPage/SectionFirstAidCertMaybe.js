import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';

import css from './ListingPage.css';
import { Modal, ResponsiveImage, ImageCarousel } from '../../components';

const SectionFirstAidCertMaybe = props => {
  const { 
    title,
    listing, 
    handleViewPhotosClick,
    imageCarouselOpen,
    onImageCarouselClose,
    onManageDisableScrolling,
  } = props;

  const hasImages = listing.images && listing.images.length > 0;
  const firstImage = hasImages ? listing.images[0] : null;

  return (
    <div className={css.sectionFeatures}>
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.firstAidCertTitle" />
      </h2>
      <div className={css.threeToTwoWrapper}>
        <div className={css.aspectWrapper} onClick={handleViewPhotosClick}>
          <ResponsiveImage
            rootClassName={css.rootForImage}
            alt={title}
            image={firstImage}
            variants={[
              'landscape-crop',
              'landscape-crop2x',
              'landscape-crop4x',
              'landscape-crop6x',
            ]}
          />
        </div>
      </div>
      <Modal
        id="ListingPage.imageCert"
        scrollLayerClassName={css.carouselModalScrollLayer}
        containerClassName={css.carouselModalContainer}
        lightCloseButton
        isOpen={imageCarouselOpen}
        onClose={onImageCarouselClose}
        usePortal
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <ImageCarousel images={[listing.images[0]] || []} />
      </Modal>
    </div>
  );
};

export default SectionFirstAidCertMaybe;
