import React from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './AboutPage.css';
import image from '../../assets/background-1440.jpg';

const AboutPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About Yogatime',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>A community built & operated service for Australia</h1>
          <img className={css.coverImage} src={image} alt="My first ice cream." />

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>Supporting healthcare professionals with teachers and childcare support through Covid-19</p>
            </div>

            <div className={css.contentMain}>
              <h2>
                Sub_In Australia is a free community connection service. Our site allows healthcare professionals fighting COVID-19 to find qualified teachers & child care workers to safely look after their children when schools close.
              </h2>

              <p>
                This will allow +30% of nurses, doctors and others on the front line to continue to do their jobs in service & sacrifice to the greater community and make it less likely that the system will become overwhelmed, leading to increased infection and mortality. Sub_In also provides employment or altruistic service opportunities to people with verified childcare experience and qualifications.
              </p>

              <p>
                It's free and only takes a few minutes to sign up as someone needing childcare or someone qualified wanting to do it!
              </p>

              <p>
                Want to volunteer? We have TONS of jobs to do at Sub_in Australia. You can send us a message <a href="https://sub-in-australia.sharetribe.com/user_feedbacks/new" title="contact">here</a> or share the website <a href="https://sub-in-australia.sharetribe.com/" title="Sub in Australia">https: // sub-in-australia.sharetribe.com/</a> via social media or on your blog/website and help Google recognise us. 
              </p>
            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default AboutPage;
