import React from 'react';
import PropTypes from 'prop-types';
import desktopLogo from './sub_logo_crop.png';

const IconLogo = props => {
  const { className, format, ...rest } = props;

  if (format === 'desktop') {
    return (
      <img src={desktopLogo} className={className} alt="Sub in Au" />
    );
  }

  return (
    <img src={desktopLogo} className={className} alt="Sub in Au" />
  );
};

const { string } = PropTypes;

IconLogo.defaultProps = {
  className: null,
};

IconLogo.propTypes = {
  className: string,
};

export default IconLogo;
