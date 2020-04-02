import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { twitterPageURL } from '../../util/urlHelpers';
import config from '../../config';
import {
  IconSocialMediaFacebook,
  IconSocialMediaInstagram,
  IconSocialMediaTwitter,
  Logo,
  ExternalLink,
  NamedLink,
} from '../../components';

import css from './Footer.css';
import { ensureCurrentUser } from '../../util/data';
import { ACCOUNT_TYPE_CHILDCARE_WORKER } from '../../util/types';

const renderSocialMediaLinks = intl => {
  const { siteFacebookPage, siteInstagramPage, siteTwitterHandle } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  const goToFb = intl.formatMessage({ id: 'Footer.goToFacebook' });
  const goToInsta = intl.formatMessage({ id: 'Footer.goToInstagram' });
  const goToTwitter = intl.formatMessage({ id: 'Footer.goToTwitter' });

  const fbLink = siteFacebookPage ? (
    <ExternalLink key="linkToFacebook" href={siteFacebookPage} className={css.icon} title={goToFb}>
      <IconSocialMediaFacebook />
    </ExternalLink>
  ) : null;

  const twitterLink = siteTwitterPage ? (
    <ExternalLink
      key="linkToTwitter"
      href={siteTwitterPage}
      className={css.icon}
      title={goToTwitter}
    >
      <IconSocialMediaTwitter />
    </ExternalLink>
  ) : null;

  const instragramLink = siteInstagramPage ? (
    <ExternalLink
      key="linkToInstagram"
      href={siteInstagramPage}
      className={css.icon}
      title={goToInsta}
    >
      <IconSocialMediaInstagram />
    </ExternalLink>
  ) : null;
  return [fbLink, twitterLink, instragramLink].filter(v => v != null);
};

const Footer = props => {
  const { rootClassName, className, intl, currentUser } = props;
  const socialMediaLinks = renderSocialMediaLinks(intl);

  const ensuredCurrentUser = ensureCurrentUser(currentUser);
  const isChildcareWorker = ensuredCurrentUser.attributes.profile.publicData
    && ensuredCurrentUser.attributes.profile.publicData.accountType === ACCOUNT_TYPE_CHILDCARE_WORKER

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.topBorderWrapper}>
        <div className={css.content}>
          <div className={css.someLiksMobile}>{socialMediaLinks}</div>
          <div className={css.links}>
            <div className={css.organization} id="organization">
              <NamedLink name="LandingPage" className={css.logoLink}>
                <span>
                  <Logo format="desktop" className={css.logo} />
                </span>
              </NamedLink>
              <div className={css.organizationInfo}>
                <p className={css.organizationDescription}>
                  <FormattedMessage id="Footer.organizationDescription" />
                </p>
                <p className={css.organizationCopyright}>
                  <NamedLink name="LandingPage" className={css.copyrightLink}>
                    <FormattedMessage id="Footer.copyright" />
                  </NamedLink>
                </p>
              </div>
            </div>
            <div className={css.infoLinks}>
              <ul className={css.list}>
                {isChildcareWorker &&
                  <li className={css.listItem}>
                    <NamedLink name="NewListingPage" className={css.link}>
                      <FormattedMessage id="Footer.toNewListingPage" />
                    </NamedLink>
                  </li>
                }
                <li className={css.listItem}>
                  <NamedLink name="AboutPage" className={css.link}>
                    <FormattedMessage id="Footer.toAboutPage" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="HowToUsePage" className={css.link}>
                    <FormattedMessage id="Footer.toHowToUsePage" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="LandingPage" className={css.link}>
                    <FormattedMessage id="Footer.toHelpPage" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="AboutPage" to={{ hash: '#contact' }} className={css.link}>
                    <FormattedMessage id="Footer.toContactPage" />
                  </NamedLink>
                </li>
              </ul>
            </div>
            <div className={css.searches}>
              <ul className={css.list}>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Melbourne%2C%20Victoria%2C%20Australia&bounds=-37.5112737225%2C145.512528832%2C-38.433859306%2C144.593741856',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchMelbourne" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Sydney%2C%20New%20South%20Wales%2C%20Australia&bounds=-33.578140996%2C151.343020992%2C-34.118344992%2C150.520928608',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchSydney" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Brisbane%2C%20Queensland%2C%20Australia&bounds=-26.996844991%2C153.31787024%2C-27.767436998%2C152.668522848',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchBrisbane" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Canberra%2C%20Australian%20Capital%20Territory%2C%20Australia&bounds=-35.147699163%2C149.263643456%2C-35.480260417%2C148.9959216',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchCanberra" />
                  </NamedLink>
                </li>
              </ul>
            </div>
            <div className={css.searchesExtra}>
              <ul className={css.list}>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=address=Adelaide%2C%20South%20Australia%2C%20Australia&bounds=-34.652564053%2C138.780189824%2C-35.348970061%2C138.44212992',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchAdelaide" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Perth%2C%20Western%20Australia%2C%20Australia&bounds=-31.6244855145%2C116.239023008%2C-32.675715325%2C115.617614368',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchPerth" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Darwin%2C%20Northern%20Territory%2C%20Australia&bounds=-12.330059717%2C131.05149984%2C-12.521741584%2C130.815116992',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchDarwin" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Hobart%2C%20Tasmania%2C%20Australia&bounds=-42.655375527%2C147.613383232%2C-43.014122643%2C147.133660416',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchHobart" />
                  </NamedLink>
                </li>
              </ul>
            </div>
            <div className={css.extraLinks}>
              <div className={css.someLinks}>{socialMediaLinks}</div>
              <div className={css.legalMatters}>
                <ul className={css.tosAndPrivacy}>
                  <li>
                    <NamedLink name="TermsOfServicePage" className={css.legalLink}>
                      <FormattedMessage id="Footer.termsOfUse" />
                    </NamedLink>
                  </li>
                  <li>
                    <NamedLink name="PrivacyPolicyPage" className={css.legalLink}>
                      <FormattedMessage id="Footer.privacyPolicy" />
                    </NamedLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={css.copyrightAndTermsMobile}>
            <NamedLink name="LandingPage" className={css.organizationCopyrightMobile}>
              <FormattedMessage id="Footer.copyright" />
            </NamedLink>
            <div className={css.tosAndPrivacyMobile}>
              <NamedLink name="PrivacyPolicyPage" className={css.privacy}>
                <FormattedMessage id="Footer.privacy" />
              </NamedLink>
              <NamedLink name="TermsOfServicePage" className={css.terms}>
                <FormattedMessage id="Footer.terms" />
              </NamedLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Footer.defaultProps = {
  rootClassName: null,
  className: null,
};

Footer.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    currentUser
  } = state.user;

  return {
    currentUser
  };
}

export default compose(
  connect(
    mapStateToProps
  ),
  injectIntl
)(Footer);
