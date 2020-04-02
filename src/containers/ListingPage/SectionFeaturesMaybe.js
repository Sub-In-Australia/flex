import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import config from '../../config';

import css from './ListingPage.css';

const getYesNoAnswerId = (key) => {
  const obj = config.custom.yesNoAnswers.find(item => item.key === key);
  return obj && obj.labelId;
}

const SectionFeaturesMaybe = props => {
  const { publicData, intl } = props;
  if (!publicData) {
    return null;
  }

  const {
    firstAidCertificate,
    childrenCardValidation,
    referenceChecksComplete
  } = publicData || {};

  const firstAidCertificateMessage = intl.formatMessage({
    id: 'ListingPage.sectionCert.firstAidCertificate',
  });

  const childrenCardValidationMessage = intl.formatMessage({
    id: 'ListingPage.sectionCert.childrenCardValidation',
  });

  const referenceChecksCompleteMessage = intl.formatMessage({
    id: 'ListingPage.sectionCert.referenceChecksComplete',
  });


  return (
    <div className={css.sectionFeatures}>
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.featuresTitle" />
      </h2>
      <div className={css.propertyWrapper}>
        <h3 className={css.propertyLabel}>
          {firstAidCertificateMessage}:
        </h3>
        <p className={css.propertyValue}>
          {intl.formatMessage({ id: getYesNoAnswerId(firstAidCertificate) })}
        </p>
      </div>
      <div className={css.propertyWrapper}>
        <h3 className={css.propertyLabel}>
          {childrenCardValidationMessage}:
        </h3>
        <p className={css.propertyValue}>
          {childrenCardValidation}
        </p>
      </div>
      <div className={css.propertyWrapper}>
        <h3 className={css.propertyLabel}>
          {referenceChecksCompleteMessage}:
        </h3>
        <p className={css.propertyValue}>
          {referenceChecksComplete}
        </p>
      </div>
    </div>
  );
};

export default SectionFeaturesMaybe;
