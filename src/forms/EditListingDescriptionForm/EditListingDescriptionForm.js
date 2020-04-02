import React from 'react';
import { arrayOf, bool, func, shape, string, array } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldSelect } from '../../components';
import CustomCertificateSelectFieldMaybe from './CustomCertificateSelectFieldMaybe';

import css from './EditListingDescriptionForm.css';
import config from '../../config';

const TITLE_MAX_LENGTH = 60;

const EditListingDescriptionFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        certificate,
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        yesNoAnswers,
      } = formRenderProps;

      const titleMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.title' });
      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titlePlaceholder',
      });
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titleRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);

      const ageMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.age',
      });
      const agePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.agePlaceholder',
      });
      const ageRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.ageRequired',
      });

      const overseasLastMonthMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.overseasLastMonth',
      });
      const overseasLastMonthPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.overseasLastMonthPlaceholder',
      });
      const overseasLastMonthRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.overseasLastMonthRequired',
      });

      const contactAnyCovid19CaseMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.contactAnyCovid19Case',
      });
      const contactAnyCovid19CasePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.contactAnyCovid19CasePlaceholder',
      });
      const contactAnyCovid19CaseRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.contactAnyCovid19CaseRequired',
      });

      const covidSymptomsLastMonthMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.covidSymptomsLastMonth',
      });
      const covidSymptomsLastMonthPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.covidSymptomsLastMonthPlaceholder',
      });
      const covidSymptomsLastMonthRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.covidSymptomsLastMonthRequired',
      });

      const contactWithHealthcareProMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.contactWithHealthcarePro',
      });
      const contactWithHealthcareProPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.contactWithHealthcareProPlaceholder',
      });
      const contactWithHealthcareProRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.contactWithHealthcareProRequired',
      });

      const considerYourselfHealthyMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.considerYourselfHealthy',
      });
      const considerYourselfHealthyPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.considerYourselfHealthyPlaceholder',
      });
      const considerYourselfHealthyRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.considerYourselfHealthyRequired',
      });

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <FieldTextInput
            id="title"
            name="title"
            className={css.title}
            type="text"
            label={titleMessage}
            placeholder={titlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          />

          <FieldTextInput
            id="age"
            name="age"
            className={css.generalField}
            type="number"
            label={ageMessage}
            placeholder={agePlaceholderMessage}
            validate={composeValidators(required(ageRequiredMessage))}
          />

          <FieldSelect
            id={'overseasLastMonth'}
            name="overseasLastMonth"
            label={overseasLastMonthMessage}
            className={css.generalField}
            validate={required(overseasLastMonthRequiredMessage)}
          >
            <option value="" disabled>{overseasLastMonthPlaceholderMessage}</option>
            {yesNoAnswers.map(type => (
              <option key={type.key} value={type.key}>{intl.formatMessage({ id: type.labelId })}</option>
            ))}
          </FieldSelect>

          <FieldSelect
            id={'contactAnyCovid19Case'}
            name="contactAnyCovid19Case"
            label={contactAnyCovid19CaseMessage}
            className={css.generalField}
            validate={required(contactAnyCovid19CaseRequiredMessage)}
          >
            <option value="" disabled>{contactAnyCovid19CasePlaceholderMessage}</option>
            {yesNoAnswers.map(type => (
              <option key={type.key} value={type.key}>{intl.formatMessage({ id: type.labelId })}</option>
            ))}
          </FieldSelect>

          <FieldSelect
            id={'covidSymptomsLastMonth'}
            name="covidSymptomsLastMonth"
            label={covidSymptomsLastMonthMessage}
            className={css.generalField}
            validate={required(covidSymptomsLastMonthRequiredMessage)}
          >
            <option value="" disabled>{covidSymptomsLastMonthPlaceholderMessage}</option>
            {yesNoAnswers.map(type => (
              <option key={type.key} value={type.key}>{intl.formatMessage({ id: type.labelId })}</option>
            ))}
          </FieldSelect>

          <FieldSelect
            id={'contactWithHealthcarePro'}
            name="contactWithHealthcarePro"
            label={contactWithHealthcareProMessage}
            className={css.generalField}
            validate={required(contactWithHealthcareProRequiredMessage)}
          >
            <option value="" disabled>{contactWithHealthcareProPlaceholderMessage}</option>
            {yesNoAnswers.map(type => (
              <option key={type.key} value={type.key}>{intl.formatMessage({ id: type.labelId })}</option>
            ))}
          </FieldSelect>

          <FieldSelect
            id={'considerYourselfHealthy'}
            name="considerYourselfHealthy"
            label={considerYourselfHealthyMessage}
            className={css.generalField}
            validate={required(considerYourselfHealthyRequiredMessage)}
          >
            <option value="" disabled>{considerYourselfHealthyPlaceholderMessage}</option>
            {yesNoAnswers.map(type => (
              <option key={type.key} value={type.key}>{intl.formatMessage({ id: type.labelId })}</option>
            ))}
          </FieldSelect>

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

EditListingDescriptionFormComponent.defaultProps = {
  className: null,
  fetchErrors: null,
  yesNoAnswers: config.custom.yesNoAnswers
};

EditListingDescriptionFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  certificate: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
  yesNoAnswers: array
};

export default compose(injectIntl)(EditListingDescriptionFormComponent);
