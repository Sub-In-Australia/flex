import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { TopbarContainer } from '../../containers';
import {
  Page,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  HowToUse,
} from '../../components';
import config from '../../config';

import css from './HowToUsePage.css';

const HowToUsePageComponent = props => {
  const { scrollingDisabled, intl } = props;

  const tabs = [
    {
      text: intl.formatMessage({ id: 'HowToUsePage.privacyTabTitle' }),
      selected: false,
      linkProps: {
        name: 'PrivacyPolicyPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'HowToUsePage.tosTabTitle' }),
      linkProps: {
        name: 'TermsOfServicePage',
      },
    },
    {
      text: intl.formatMessage({ id: 'HowToUsePage.howToUseTabTitle' }),
      selected: true,
      linkProps: {
        name: 'HowToUsePage',
      },
    },
  ];
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage({ id: 'HowToUsePage.schemaTitle' }, { siteTitle });
  const schema = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    name: schemaTitle,
  };
  return (
    <Page title={schemaTitle} scrollingDisabled={scrollingDisabled} schema={schema}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer currentPage="HowToUsePage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav tabs={tabs} />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.heading}>
              <FormattedMessage id="HowToUsePage.heading" />
            </h1>
            <HowToUse />
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

const { bool } = PropTypes;

HowToUsePageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const HowToUsePage = compose(
  connect(mapStateToProps),
  injectIntl
)(HowToUsePageComponent);

export default HowToUsePage;
