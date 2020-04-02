import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import config from '../../config';

import css from './ListingPage.css';

const getYesNoAnswerId = (key) => {
  const obj = config.custom.yesNoAnswers.find(item => item.key === key);
  return obj && obj.labelId;
}

const SectionDescriptionMaybe = props => {
  const { publicData, intl } = props;
  const {
    age, overseasLastMonth, contactAnyCovid19Case,
    covidSymptomsLastMonth, contactWithHealthcarePro,
    considerYourselfHealthy,
  } = publicData || {};

  const ageMessage = intl.formatMessage({
    id: 'ListingPage.sectionDesc.age',
  });

  const overseasLastMonthMessage = intl.formatMessage({
    id: 'ListingPage.sectionDesc.overseasLastMonth',
  });

  const contactAnyCovid19CaseMessage = intl.formatMessage({
    id: 'ListingPage.sectionDesc.contactAnyCovid19Case',
  });

  const covidSymptomsLastMonthMessage = intl.formatMessage({
    id: 'ListingPage.sectionDesc.covidSymptomsLastMonth',
  });

  const contactWithHealthcareProMessage = intl.formatMessage({
    id: 'ListingPage.sectionDesc.contactWithHealthcarePro',
  });

  const considerYourselfHealthyMessage = intl.formatMessage({
    id: 'ListingPage.sectionDesc.considerYourselfHealthy',
  });

  return (
    <div className={css.sectionDescription}>
      <h2 className={css.descriptionTitle}>
        <FormattedMessage id="ListingPage.descriptionTitle" />
      </h2>
      <div className={css.propertyWrapper}>
        <h3 className={css.propertyLabel}>
          {ageMessage}:
        </h3>
        <p className={css.propertyValue}>
          {age}
        </p>
      </div>
      <div className={css.propertyWrapper}>
        <h3 className={css.propertyLabel}>
          {overseasLastMonthMessage}:
        </h3>
        <p className={css.propertyValue}>
          {intl.formatMessage({ id: getYesNoAnswerId(overseasLastMonth) })}
        </p>
      </div>
      <div className={css.propertyWrapper}>
        <h3 className={css.propertyLabel}>
          {contactAnyCovid19CaseMessage}:
        </h3>
        <p className={css.propertyValue}>
          {intl.formatMessage({ id: getYesNoAnswerId(contactAnyCovid19Case) })}
        </p>
      </div>
      <div className={css.propertyWrapper}>
        <h3 className={css.propertyLabel}>
          {covidSymptomsLastMonthMessage}:
        </h3>
        <p className={css.propertyValue}>
          {intl.formatMessage({ id: getYesNoAnswerId(covidSymptomsLastMonth) })}
        </p>
      </div>
      <div className={css.propertyWrapper}>
        <h3 className={css.propertyLabel}>
          {contactWithHealthcareProMessage}:
        </h3>
        <p className={css.propertyValue}>
          {intl.formatMessage({ id: getYesNoAnswerId(contactWithHealthcarePro) })}
        </p>
      </div>
      <div className={css.propertyWrapper}>
        <h3 className={css.propertyLabel}>
          {considerYourselfHealthyMessage}:
        </h3>
        <p className={css.propertyValue}>
          {intl.formatMessage({ id: getYesNoAnswerId(considerYourselfHealthy) })}
        </p>
      </div>
    </div>
  );
};

export default SectionDescriptionMaybe;
