import React from 'react';
import { bool, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { propTypes, ACCOUNT_TYPE_CHILDCARE_WORKER } from '../../util/types';
import { OwnListingLink } from '../../components';

import css from './SectionHowItWorks.css';
import { ensureCurrentUser } from '../../util/data';

const SectionHowItWorks = props => {
  const { rootClassName, className, currentUser, currentUserListing,
    currentUserListingFetched
  } = props;

  const ensuredCurrentUser = ensureCurrentUser(currentUser);
  const isChildcareWorker = ensuredCurrentUser.attributes.profile.publicData
    && ensuredCurrentUser.attributes.profile.publicData.accountType === ACCOUNT_TYPE_CHILDCARE_WORKER;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionHowItWorks.titleLineOne" />
        <br />
        <FormattedMessage id="SectionHowItWorks.titleLineTwo" />
      </div>

      <div className={css.steps}>
        <div className={css.step}>
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionHowItWorks.part1Title" />
          </h2>
          <p>
            <FormattedMessage id="SectionHowItWorks.part1Text" />
          </p>
        </div>

        <div className={css.step}>
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionHowItWorks.part2Title" />
          </h2>
          <p>
            <FormattedMessage id="SectionHowItWorks.part2Text" />
          </p>
        </div>

        <div className={css.step}>
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionHowItWorks.part3Title" />
          </h2>
          <p>
            <FormattedMessage id="SectionHowItWorks.part3Text" />
          </p>
        </div>
      </div>
      {isChildcareWorker &&
        <div className={css.createListingLink}>
          <OwnListingLink listing={currentUserListing} listingFetched={currentUserListingFetched}>
            <FormattedMessage id="SectionHowItWorks.createListingLink" />
          </OwnListingLink>
        </div>
      }
    </div>
  );
};

SectionHowItWorks.defaultProps = {
  rootClassName: null,
  className: null,
  currentUserListing: null,
  currentUserListingFetched: false,
};

SectionHowItWorks.propTypes = {
  rootClassName: string,
  className: string,
  currentUserListing: propTypes.ownListing,
  currentUserListingFetched: bool,
};

export default SectionHowItWorks;
