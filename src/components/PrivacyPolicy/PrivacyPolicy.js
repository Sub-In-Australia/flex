import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NamedLink } from '../';

import css from './PrivacyPolicy.css';

const PrivacyPolicy = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      {/* <p className={css.lastUpdated}>Last updated: November 22, 2019</p> */}

      <h3>
        Register
</h3>
      <p>
        SUB IN AUSTRALIA service: Sharetribe Ltd
    <br/>
          <a href="http://www.sharetribe.com/en">www.sharetribe.com</a>
          <br/> info (at) sharetribe.com
</p>
          <h3>
            Name of the register
</h3>
          <p>
            User register of the SUB IN AUSTRALIA service
</p>
          <h3>
            Use of personal details (purpose of register)
</h3>
          <p>
            Personal details are collected to make communication and use of service possible. Details can be used for communication between service providers and users and also for direct communication between users. Some personal details are visible on the profile page of the user, but those details are voluntary (except name).
</p>
          <p>
            The handling of personal details is not outsourced, but the register data is stored on a server that is rented from a third party company.
</p>
          <h3>
            Information content of the register
</h3>
          <p>
            The following information may be stored in the register:
</p>
          <ul>
            <li>
              Personal details: Name, email address, phone number, street address
    </li>
            <li>
              Account details: username, password (stored in encrypted format)
    </li>
            <li>
              The description text that the user may write about him/herself
    </li>
            <li>
              The offers and requests the user has posted to the service
    </li>
            <li>
              The given and received feedback and badges
    </li>
            <li>
              Statistical data about service usage, e.g. number times the user has logged in
    </li>
          </ul>
          <p></p>
          <h3>
            Regular sources of information
</h3>
          <p>
            Personal details are given by the user on registration to the service or when using it later.
</p>
          <h3>
            Regular handovers of the information
</h3>
          <p>
            The information may be handed over for research purposes as described in the
            &nbsp;<NamedLink name="TermsOfServicePage">Terms of use</NamedLink> that the user accepts before starting to use the service. The researchers may not publish any research results so that identifying information would be revealed or that any specific user could be detected.
</p>
          <p>
            Information considering users of a single SUB IN AUSTRALIA community may be handed over to the client who has founded that community or to the community administrators appointed by that client.
</p>
          <h3>
            Transfers of the information outside the EU and the European Economic Area
</h3>
          <p>
            Information may be stored to a server that may be located inside or outside of the EU and the European Economic Area
</p>
          <h3>
            Register protection principles
</h3>
          <p>
            The information is stored on computers. The access to the information is restricted with passwords and physical access to the computers is restricted by the server hosting company.
</p>
    </div>
  );
};

PrivacyPolicy.defaultProps = {
          rootClassName: null,
  className: null,
};

const {string} = PropTypes;

PrivacyPolicy.propTypes = {
          rootClassName: string,
  className: string,
};

export default PrivacyPolicy;
