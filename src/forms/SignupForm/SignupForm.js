import React from 'react';
import PropTypes, { array } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm, Field } from 'react-final-form';
import classNames from 'classnames';
import * as validators from '../../util/validators';
import {
  Form, PrimaryButton, FieldTextInput, FieldSelect,
  FieldCheckbox, FieldPhoneNumberInput
} from '../../components';
import { ACCOUNT_TYPE_CHILDCARE_WORKER, ACCOUNT_TYPE_MEDICAL_WORKER } from '../../util/types';
import { Condition } from '../../util/helperComponents';

import css from './SignupForm.css';
import config from '../../config';

const KEY_CODE_ENTER = 13;

const SignupFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        rootClassName,
        className,
        formId,
        handleSubmit,
        inProgress,
        invalid,
        intl,
        onOpenTermsOfService,
        seekingOrProviding,
        highRiskWithCovid19,
        loginOrSignupError,
      } = fieldRenderProps;

      // email
      const emailLabel = intl.formatMessage({
        id: 'SignupForm.emailLabel',
      });
      const emailPlaceholder = intl.formatMessage({
        id: 'SignupForm.emailPlaceholder',
      });
      const emailRequiredMessage = intl.formatMessage({
        id: 'SignupForm.emailRequired',
      });
      const emailRequired = validators.required(emailRequiredMessage);
      const emailInvalidMessage = intl.formatMessage({
        id: 'SignupForm.emailInvalid',
      });
      const emailValid = validators.emailFormatValid(emailInvalidMessage);

      // password
      const passwordLabel = intl.formatMessage({
        id: 'SignupForm.passwordLabel',
      });
      const passwordPlaceholder = intl.formatMessage({
        id: 'SignupForm.passwordPlaceholder',
      });
      const passwordRequiredMessage = intl.formatMessage({
        id: 'SignupForm.passwordRequired',
      });
      const passwordMinLengthMessage = intl.formatMessage(
        {
          id: 'SignupForm.passwordTooShort',
        },
        {
          minLength: validators.PASSWORD_MIN_LENGTH,
        }
      );
      const passwordMaxLengthMessage = intl.formatMessage(
        {
          id: 'SignupForm.passwordTooLong',
        },
        {
          maxLength: validators.PASSWORD_MAX_LENGTH,
        }
      );
      const passwordMinLength = validators.minLength(
        passwordMinLengthMessage,
        validators.PASSWORD_MIN_LENGTH
      );
      const passwordMaxLength = validators.maxLength(
        passwordMaxLengthMessage,
        validators.PASSWORD_MAX_LENGTH
      );
      const passwordRequired = validators.requiredStringNoTrim(passwordRequiredMessage);
      const passwordValidators = validators.composeValidators(
        passwordRequired,
        passwordMinLength,
        passwordMaxLength
      );

      // account type
      const accountTypeLabel = intl.formatMessage({
        id: 'SignupForm.accountTypeLabel'
      });
      const accountTypePlaceholder = intl.formatMessage({
        id: 'SignupForm.accountTypePlaceholder',
      });
      const accountTypeRequiredMessage = intl.formatMessage({
        id: 'SignupForm.accountTypeRequired',
      });
      const accountTypeRequired = validators.required(accountTypeRequiredMessage);

      // firstName
      const firstNameLabel = intl.formatMessage({
        id: 'SignupForm.firstNameLabel',
      });
      const firstNamePlaceholder = intl.formatMessage({
        id: 'SignupForm.firstNamePlaceholder',
      });
      const firstNameRequiredMessage = intl.formatMessage({
        id: 'SignupForm.firstNameRequired',
      });
      const firstNameRequired = validators.required(firstNameRequiredMessage);

      // lastName
      const lastNameLabel = intl.formatMessage({
        id: 'SignupForm.lastNameLabel',
      });
      const lastNamePlaceholder = intl.formatMessage({
        id: 'SignupForm.lastNamePlaceholder',
      });
      const lastNameRequiredMessage = intl.formatMessage({
        id: 'SignupForm.lastNameRequired',
      });
      const lastNameRequired = validators.required(lastNameRequiredMessage);

      // I read the tos
      const iReadTheTosLabel = intl.formatMessage({
        id: 'SignupForm.iReadTheTosLabel'
      });
      const iReadTheTosPlaceholder = intl.formatMessage({
        id: 'SignupForm.iReadTheTosPlaceholder',
      });
      const iReadTheTosRequiredMessage = intl.formatMessage({
        id: 'SignupForm.iReadTheTosRequired',
      });
      const iReadTheTosRequired = validators.required(iReadTheTosRequiredMessage);

      // Reference Check
      const referenceCheckLabel = intl.formatMessage({
        id: 'SignupForm.referenceCheckLabel'
      });

      // I am able to supply verification of identity and credentials
      const ableToSupplyVerificationOfICLabel = intl.formatMessage({
        id: 'SignupForm.ableToSupplyVerificationOfICLabel'
      });

      // Seeking or Providing
      const seekingOrProvidingLabel = intl.formatMessage({
        id: 'SignupForm.seekingOrProvidingLabel'
      });
      const seekingOrProvidingPlaceholder = intl.formatMessage({
        id: 'SignupForm.seekingOrProvidingPlaceholder',
      });
      const seekingOrProvidingRequiredMessage = intl.formatMessage({
        id: 'SignupForm.seekingOrProvidingRequired',
      });
      const seekingOrProvidingRequired = validators.required(seekingOrProvidingRequiredMessage);

      // phone number
      const phoneNumberLabel = intl.formatMessage({
        id: 'SignupForm.phoneNumberLabel',
      });
      const phoneNumberPlaceholder = intl.formatMessage({
        id: 'SignupForm.phoneNumberPlaceholder',
      });
      const phoneNumberRequiredMessage = intl.formatMessage({
        id: 'SignupForm.phoneNumberRequired',
      });
      const phoneNumberRequired = validators.required(phoneNumberRequiredMessage);

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

      const classes = classNames(rootClassName || css.root, className);
      const submitInProgress = inProgress;
      const submitDisabled = invalid || submitInProgress;

      const handleTermsKeyUp = e => {
        // Allow click action with keyboard like with normal links
        if (e.keyCode === KEY_CODE_ENTER) {
          onOpenTermsOfService();
        }
      };
      const termsLink = (
        <span
          className={css.termsLink}
          onClick={onOpenTermsOfService}
          role="button"
          tabIndex="0"
          onKeyUp={handleTermsKeyUp}
        >
          <FormattedMessage id="SignupForm.termsAndConditionsLinkText" />
        </span>
      );

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <div>
            <FieldTextInput
              type="email"
              id={formId ? `${formId}.email` : 'email'}
              name="email"
              autoComplete="email"
              label={emailLabel}
              placeholder={emailPlaceholder}
              className={css.email}
              validate={validators.composeValidators(emailRequired, emailValid)}
            />
            <div className={css.name}>
              <FieldTextInput
                className={css.firstNameRoot}
                type="text"
                id={formId ? `${formId}.fname` : 'fname'}
                name="fname"
                autoComplete="given-name"
                label={firstNameLabel}
                placeholder={firstNamePlaceholder}
                validate={firstNameRequired}
              />
              <FieldTextInput
                className={css.lastNameRoot}
                type="text"
                id={formId ? `${formId}.lname` : 'lname'}
                name="lname"
                autoComplete="family-name"
                label={lastNameLabel}
                placeholder={lastNamePlaceholder}
                validate={lastNameRequired}
              />
            </div>
            <FieldTextInput
              className={css.password}
              type="password"
              id={formId ? `${formId}.password` : 'password'}
              name="password"
              autoComplete="new-password"
              label={passwordLabel}
              placeholder={passwordPlaceholder}
              validate={passwordValidators}
            />
          </div>

          <FieldTextInput
            type="text"
            id={formId ? `${formId}.iReadTheTos` : 'iReadTheTos'}
            name="iReadTheTos"
            label={iReadTheTosLabel}
            placeholder={iReadTheTosPlaceholder}
            className={css.iReadTheTos}
            validate={iReadTheTosRequired}
          />

          <FieldCheckbox
            id={formId ? `${formId}.referenceCheck` : 'referenceCheck'}
            name="referenceCheck"
            label={referenceCheckLabel}
            value={"accepted"}
            className={css.referenceCheck}
          />

          <FieldCheckbox
            id={formId ? `${formId}.ableToSupplyVerificationOfIC` : 'ableToSupplyVerificationOfIC'}
            name="ableToSupplyVerificationOfIC"
            label={ableToSupplyVerificationOfICLabel}
            value={"accepted"}
            className={css.ableToSupplyVerificationOfIC}
          />

          <FieldSelect
            id={formId ? `${formId}.accountType` : 'accountType'}
            name="accountType"
            label={seekingOrProvidingLabel}
            className={css.seekingOrProviding}
            validate={seekingOrProvidingRequired}
          >
            <option value="" disabled>{seekingOrProvidingPlaceholder}</option>
            {seekingOrProviding.map(type => (
              <option key={type.key} value={type.key}>{intl.formatMessage({ id: type.labelId })}</option>
            ))}
          </FieldSelect>

          <FieldPhoneNumberInput
            id={formId ? `${formId}.phoneNumber` : 'phoneNumber'}
            name="phoneNumber"
            label={phoneNumberLabel}
            placeholder={phoneNumberPlaceholder}
            className={css.phoneNumber}
            validate={phoneNumberRequired}
          />

          <Condition when="accountType" is={ACCOUNT_TYPE_CHILDCARE_WORKER}>
            <FieldTextInput
              className={css.generalField}
              type="text"
              id={formId ? `${formId}.wwvpRegistrationNumber` : 'wwvpRegistrationNumber'}
              name="wwvpRegistrationNumber"
              label={wwvpRegistrationNumberLabel}
              placeholder={wwvpRegistrationNumberPlaceholder}
              validate={wwvpRegistrationNumberRequired}
            />
            <FieldTextInput
              className={css.generalField}
              type="text"
              id={formId ? `${formId}.workingWithChildrenCheck` : 'workingWithChildrenCheck'}
              name="workingWithChildrenCheck"
              label={workingWithChildrenCheckLabel}
              placeholder={workingWithChildrenCheckPlaceholder}
              validate={workingWithChildrenCheckRequired}
            />
            <FieldTextInput
              className={css.generalField}
              type="text"
              id={formId ? `${formId}.vitRegistrationNumber` : 'vitRegistrationNumber'}
              name="vitRegistrationNumber"
              label={vitRegistrationNumberLabel}
              placeholder={vitRegistrationNumberPlaceholder}
            />
            <FieldTextInput
              className={css.generalField}
              type="text"
              id={formId ? `${formId}.expiryDate` : 'expiryDate'}
              name="expiryDate"
              label={expiryDateLabel}
              placeholder={expiryDatePlaceholder}
              validate={expiryDateRequired}
            />
            <FieldTextInput
              className={css.generalField}
              type="text"
              id={formId ? `${formId}.stateOfIssue` : 'stateOfIssue'}
              name="stateOfIssue"
              label={stateOfIssueLabel}
              placeholder={stateOfIssuePlaceholder}
              validate={stateOfIssueRequired}
            />
          </Condition>

          <Condition when="accountType" is={ACCOUNT_TYPE_MEDICAL_WORKER}>
            <FieldTextInput
              className={css.generalField}
              type="text"
              id={formId ? `${formId}.healthcareWorkerIdentifier` : 'healthcareWorkerIdentifier'}
              name="healthcareWorkerIdentifier"
              label={healthcareWorkerIdentifierLabel}
              placeholder={healthcareWorkerIdentifierPlaceholder}
              validate={healthcareWorkerIdentifierRequired}
            />
            <FieldSelect
              className={css.generalField}
              id={formId ? `${formId}.highRiskWithCovid19` : 'highRiskWithCovid19'}
              name="highRiskWithCovid19"
              label={highRiskWithCovid19Label}
            >
              <option value="" disabled>{highRiskWithCovid19Placeholder}</option>
              {highRiskWithCovid19.map(type => (
                <option key={type.key} value={type.key}>{intl.formatMessage({ id: type.labelId })}</option>
              ))}
            </FieldSelect>
            <FieldTextInput
              className={css.generalField}
              type="text"
              id={formId ? `${formId}.professionPosition` : 'professionPosition'}
              name="professionPosition"
              label={professionPositionLabel}
              placeholder={professionPositionPlaceholder}
              validate={professionPositionRequired}
            />
            <FieldTextInput
              className={css.generalField}
              type="text"
              id={formId ? `${formId}.healthcareRegistrationNumber` : 'healthcareRegistrationNumber'}
              name="healthcareRegistrationNumber"
              label={healthcareRegistrationNumberLabel}
              placeholder={healthcareRegistrationNumberPlaceholder}
              validate={healthcareRegistrationNumberRequired}
            />
            <FieldTextInput
              className={css.generalField}
              type="text"
              id={formId ? `${formId}.linkedIn` : 'linkedIn'}
              name="linkedIn"
              label={linkedInLabel}
              placeholder={linkedInPlaceholder}
            />
            <FieldTextInput
              className={css.generalField}
              type="text"
              id={formId ? `${formId}.workingLocation` : 'workingLocation'}
              name="workingLocation"
              label={workingLocationLabel}
              placeholder={workingLocationPlaceholder}
              validate={workingLocationRequired}
            />
          </Condition>

          {loginOrSignupError}
          <div className={css.bottomWrapper}>
            <p className={css.bottomWrapperText}>
              <span className={css.termsText}>
                <FormattedMessage
                  id="SignupForm.termsAndConditionsAcceptText"
                  values={{ termsLink }}
                />
              </span>
            </p>
            <PrimaryButton type="submit" inProgress={submitInProgress} disabled={submitDisabled}>
              <FormattedMessage id="SignupForm.signUp" />
            </PrimaryButton>
          </div>
        </Form>
      );
    }}
  />
);

SignupFormComponent.defaultProps = {
  inProgress: false,
  seekingOrProviding: config.custom.seekingOrProviding,
  highRiskWithCovid19: config.custom.highRiskWithCovid19
};

const { bool, func } = PropTypes;

SignupFormComponent.propTypes = {
  inProgress: bool,
  seekingOrProviding: array,
  highRiskWithCovid19: array,

  onOpenTermsOfService: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SignupForm = compose(injectIntl)(SignupFormComponent);
SignupForm.displayName = 'SignupForm';

export default SignupForm;
