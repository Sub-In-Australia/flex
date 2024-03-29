import React, { Component } from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  Page,
  UserNav,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
} from '../../components';
import { ProfileSettingsForm } from '../../forms';
import { TopbarContainer } from '../../containers';
import { ACCOUNT_TYPE_CHILDCARE_WORKER } from '../../util/types';

import { updateProfile, uploadImage } from './ProfileSettingsPage.duck';
import css from './ProfileSettingsPage.css';

const onImageUploadHandler = (values, fn) => {
  const { id, imageId, file } = values;
  if (file) {
    fn({ id, imageId, file });
  }
};

export class ProfileSettingsPageComponent extends Component {
  render() {
    const {
      currentUser,
      currentUserListing,
      image,
      onImageUpload,
      onUpdateProfile,
      scrollingDisabled,
      updateInProgress,
      updateProfileError,
      uploadImageError,
      uploadInProgress,
      intl,
    } = this.props;

    const user = ensureCurrentUser(currentUser);
    const { firstName, lastName, bio, publicData, privateData } = user.attributes.profile;
    const profileImageId = user.profileImage ? user.profileImage.id : null;
    const profileImage = image || { imageId: profileImageId };
    const {
      accountType,

      // professionPosition, linkedIn, workingLocation,
      highRiskWithCovid19,
    } = publicData || {};

    const {
      iReadTheTos, referenceCheck, ableToSupplyVerificationOfIC,
      phoneNumber,

      //For Childcare worker (Provider)
      // wwvpRegistrationNumber, workingWithChildrenCheck,
      // vitRegistrationNumber, expiryDate, stateOfIssue,

      //For Medical worker (Customer)
      healthcareWorkerIdentifier,
      // healthcareRegistrationNumber,

    } = privateData || {};

    const isChildcareWorker = accountType === ACCOUNT_TYPE_CHILDCARE_WORKER;

    const handleSubmit = values => {
      const { firstName, lastName, bio: rawBio,

        //For both
        iReadTheTos, referenceCheck, ableToSupplyVerificationOfIC,
        phoneNumber,

        //For Childcare worker (Provider)
        // wwvpRegistrationNumber, workingWithChildrenCheck,
        // vitRegistrationNumber, expiryDate, stateOfIssue,

        //For Medical worker (Customer)
        healthcareWorkerIdentifier, highRiskWithCovid19,
        // professionPosition, healthcareRegistrationNumber,
        // linkedIn, workingLocation,
      } = values;
      const isChildcareWorker = accountType === ACCOUNT_TYPE_CHILDCARE_WORKER;

      // Ensure that the optional bio is a string
      const bio = rawBio || '';

      const profile = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        bio,
        displayName: `${firstName.trim()} ${lastName.trim()}`,
        publicData: isChildcareWorker ? {
          
        } : {
            // professionPosition, linkedIn, workingLocation,
            highRiskWithCovid19,
          },
        privateData: isChildcareWorker ? {
          iReadTheTos, referenceCheck, ableToSupplyVerificationOfIC,
          phoneNumber,

          // wwvpRegistrationNumber, workingWithChildrenCheck,
          // vitRegistrationNumber, expiryDate, stateOfIssue,
        } : {
            iReadTheTos, referenceCheck, ableToSupplyVerificationOfIC,
            phoneNumber,

            healthcareWorkerIdentifier,
            // healthcareRegistrationNumber,
          },
      };
      const uploadedImage = this.props.image;

      // Update profileImage only if file system has been accessed
      const updatedValues =
        uploadedImage && uploadedImage.imageId && uploadedImage.file
          ? { ...profile, profileImageId: uploadedImage.imageId }
          : profile;

      onUpdateProfile(updatedValues);
    };

    const initialValuesSpecial = isChildcareWorker ? {
      // wwvpRegistrationNumber, workingWithChildrenCheck,
      // vitRegistrationNumber, expiryDate, stateOfIssue,
    } : {
        // professionPosition, linkedIn, workingLocation,
        // healthcareRegistrationNumber,
        healthcareWorkerIdentifier, highRiskWithCovid19,
      }

    const profileSettingsForm = user.id ? (
      <ProfileSettingsForm
        className={css.form}
        currentUser={currentUser}
        initialValues={{
          firstName, lastName, bio, profileImage: user.profileImage,
          accountType, iReadTheTos, referenceCheck,
          ableToSupplyVerificationOfIC, phoneNumber,
          ...initialValuesSpecial,
        }}
        profileImage={profileImage}
        onImageUpload={e => onImageUploadHandler(e, onImageUpload)}
        uploadInProgress={uploadInProgress}
        updateInProgress={updateInProgress}
        uploadImageError={uploadImageError}
        updateProfileError={updateProfileError}
        onSubmit={handleSubmit}
      />
    ) : null;

    const title = intl.formatMessage({ id: 'ProfileSettingsPage.title' });

    return (
      <Page className={css.root} title={title} scrollingDisabled={scrollingDisabled}>
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="ProfileSettingsPage" />
            <UserNav selectedPageName="ProfileSettingsPage" listing={currentUserListing} />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div className={css.content}>
              <div className={css.headingContainer}>
                <h1 className={css.heading}>
                  <FormattedMessage id="ProfileSettingsPage.heading" />
                </h1>
                {user.id ? (
                  <NamedLink
                    className={css.profileLink}
                    name="ProfilePage"
                    params={{ id: user.id.uuid }}
                  >
                    <FormattedMessage id="ProfileSettingsPage.viewProfileLink" />
                  </NamedLink>
                ) : null}
              </div>
              {profileSettingsForm}
            </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

ProfileSettingsPageComponent.defaultProps = {
  currentUser: null,
  currentUserListing: null,
  uploadImageError: null,
  updateProfileError: null,
  image: null,
};

ProfileSettingsPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  currentUserListing: propTypes.ownListing,
  image: shape({
    id: string,
    imageId: propTypes.uuid,
    file: object,
    uploadedImage: propTypes.image,
  }),
  onImageUpload: func.isRequired,
  onUpdateProfile: func.isRequired,
  scrollingDisabled: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  uploadImageError: propTypes.error,
  uploadInProgress: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser, currentUserListing } = state.user;
  const {
    image,
    uploadImageError,
    uploadInProgress,
    updateInProgress,
    updateProfileError,
  } = state.ProfileSettingsPage;
  return {
    currentUser,
    currentUserListing,
    image,
    scrollingDisabled: isScrollingDisabled(state),
    updateInProgress,
    updateProfileError,
    uploadImageError,
    uploadInProgress,
  };
};

const mapDispatchToProps = dispatch => ({
  onImageUpload: data => dispatch(uploadImage(data)),
  onUpdateProfile: data => dispatch(updateProfile(data)),
});

const ProfileSettingsPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(ProfileSettingsPageComponent);

export default ProfileSettingsPage;
