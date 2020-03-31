import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NamedLink } from '../';

import css from './HowToUse.css';

const HowToUse = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <span className={classes}>
      {/* <p className={css.lastUpdated}>Last updated: November 22, 2019</p> */}

      <p>&gt;&nbsp;Sign up&nbsp;<NamedLink name="SignupPage">here</NamedLink>&nbsp;&lt;&nbsp;&nbsp;to&nbsp;<i>Sub_in for Australia</i>&nbsp;or register as a Healthcare worker looking for childcare&nbsp;assistance and supervision.&nbsp;</p>
      <ul>
        <li><p>Only &lt;50yrs, healthy and qualified people (current working with children &amp; background/reference&nbsp;checked) should&nbsp;register as child carers.&nbsp;</p></li>
        <li><p>Parents&nbsp;must confirm this&nbsp;directly with individuals<span>&nbsp;offering their services.</span></p></li>
        <li><p>Childcarers, Early Childhood Educators and Teachers&nbsp;can set their own availability and specify in their profile what age of child they would prefer to supervise and care for, and in what location.&nbsp;</p></li>
        <li><p>Grandparents/vulnerable older people will not need to stand in for families and can continue to isolate.</p></li>
        <li><p>This matching platform prevents schools from having to stay open to cater&nbsp;exclusively&nbsp;to Healthcare workers children. This crazy&nbsp;scenario&nbsp;would mean that frontline&nbsp;parents would inevitably&nbsp;infect their children who could transmit to their peers to then infect other Healthcare workers (parents)&nbsp;who are working in hospitals and in close contact with sick patients.</p></li>
        <li><p>Childcare is suggested to take&nbsp;place at the home or premises of the Healthcare professional or their family.&nbsp;</p></li>
        <li><p>Payment is made at the time of booking by the Healthcare worker,&nbsp;and then&nbsp;goes directly to the childcarer 24hrs after the appointment&nbsp;date has passed and the job completed.</p></li>
        <li><p>We are actively working to&nbsp;have&nbsp;the Federal Government&nbsp;allow Healthcare workers signed up to Sub_in Australia to be able to transfer their usual claims for Child Care Subsidy to&nbsp;care at home, in social isolation, for their children. Ideally there would be no cap for this.</p></li>
      </ul>
      <p>&gt;&nbsp;Sign up&nbsp;<NamedLink name="SignupPage">here</NamedLink> &nbsp;&lt;&nbsp;&nbsp;It's free to do, easy and only takes a few minutes!</p>
      <p>&gt; Want to volunteer? <b>We have TONS of jobs</b> to do at Sub_in Australia. You can send us a message <a href="https://sub-in-australia.sharetribe.com/user_feedbacks/new">here</a> or share the website&nbsp;<a href="https://sub-in-australia.sharetribe.com/">https://sub-in-australia.sharetribe.com/</a>&nbsp;via social media or on your blog/website and help Google recognise us. This is so so important and yet, so easy to do! &lt;</p>
    </span>
  );
};

HowToUse.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

HowToUse.propTypes = {
  rootClassName: string,
  className: string,
};

export default HowToUse;
