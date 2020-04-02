import React from 'react';
import { compose } from 'redux';
import { bool, func, shape, string, array } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import { required } from '../../util/validators';

import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, Form, FieldTextInput, FieldSelect } from '../../components';

import css from './EditListingFeaturesForm.css';

const EditListingFeaturesFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={formRenderProps => {
      const {
        disabled,
        ready,
        rootClassName,
        className,
        name,
        handleSubmit,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        intl,
        yesNoAnswers,
      } = formRenderProps;

      const childrenCheckIDMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.childrenCheckID',
      });
      const childrenCheckIDPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.childrenCheckIDPlaceholder',
      });
      const childrenCheckIDRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.childrenCheckIDRequired',
      });

      const firstAidCertificateMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.firstAidCertificate',
      });
      const firstAidCertificatePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.firstAidCertificatePlaceholder',
      });
      const firstAidCertificateRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.firstAidCertificateRequired',
      });

      const organisationalReferenceContactNameMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.organisationalReferenceContactName',
      });
      const organisationalReferenceContactNamePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.organisationalReferenceContactNamePlaceholder',
      });
      const organisationalReferenceContactNameRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.organisationalReferenceContactNameRequired',
      });

      const organisationalReferenceContactNumberMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.organisationalReferenceContactNumber',
      });
      const organisationalReferenceContactNumberPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.organisationalReferenceContactNumberPlaceholder',
      });
      const organisationalReferenceContactNumberRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.organisationalReferenceContactNumberRequired',
      });

      const personalReferenceContactNameMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.personalReferenceContactName',
      });
      const personalReferenceContactNamePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.personalReferenceContactNamePlaceholder',
      });
      const personalReferenceContactNameRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.personalReferenceContactNameRequired',
      });

      const personalReferenceContactNumberMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.personalReferenceContactNumber',
      });
      const personalReferenceContactNumberPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.personalReferenceContactNumberPlaceholder',
      });
      const personalReferenceContactNumberRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.personalReferenceContactNumberRequired',
      });

      const classes = classNames(rootClassName || css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = disabled || submitInProgress;

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingFeaturesForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingFeaturesForm.showListingFailed" />
        </p>
      ) : null;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}

          <FieldTextInput
            id="childrenCheckID"
            name="childrenCheckID"
            className={css.generalField}
            type="text"
            label={childrenCheckIDMessage}
            placeholder={childrenCheckIDPlaceholderMessage}
            validate={required(childrenCheckIDRequiredMessage)}
          />

          <FieldSelect
            id={'firstAidCertificate'}
            name="firstAidCertificate"
            label={firstAidCertificateMessage}
            className={css.generalField}
            validate={required(firstAidCertificateRequiredMessage)}
          >
            <option value="" disabled>{firstAidCertificatePlaceholderMessage}</option>
            {yesNoAnswers.map(type => (
              <option key={type.key} value={type.key}>{intl.formatMessage({ id: type.labelId })}</option>
            ))}
          </FieldSelect>

          <FieldTextInput
            id="organisationalReferenceContactName"
            name="organisationalReferenceContactName"
            className={css.generalField}
            type="text"
            label={organisationalReferenceContactNameMessage}
            placeholder={organisationalReferenceContactNamePlaceholderMessage}
            validate={required(organisationalReferenceContactNameRequiredMessage)}
          />

          <FieldTextInput
            id="organisationalReferenceContactNumber"
            name="organisationalReferenceContactNumber"
            className={css.generalField}
            type="number"
            label={organisationalReferenceContactNumberMessage}
            placeholder={organisationalReferenceContactNumberPlaceholderMessage}
            validate={required(organisationalReferenceContactNumberRequiredMessage)}
          />

          <FieldTextInput
            id="personalReferenceContactName"
            name="personalReferenceContactName"
            className={css.generalField}
            type="text"
            label={personalReferenceContactNameMessage}
            placeholder={personalReferenceContactNamePlaceholderMessage}
            validate={required(personalReferenceContactNameRequiredMessage)}
          />

          <FieldTextInput
            id="personalReferenceContactNumber"
            name="personalReferenceContactNumber"
            className={css.generalField}
            type="number"
            label={personalReferenceContactNumberMessage}
            placeholder={personalReferenceContactNumberPlaceholderMessage}
            validate={required(personalReferenceContactNumberRequiredMessage)}
          />

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

EditListingFeaturesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
  yesNoAnswers: config.custom.yesNoAnswers
};

EditListingFeaturesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  name: string.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  yesNoAnswers: array
};

const EditListingFeaturesForm = EditListingFeaturesFormComponent;

export default compose(injectIntl)(EditListingFeaturesForm);
