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
    <svg
      className={className}
      {...rest}
      width="28"
      height="26"
      viewBox="0 0 28 26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="#0095B3"
        strokeWidth="1.5"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.0221667 14.9028333c-2.123449-1.7178872-3.3997596-4.2705084-3.5-6.99999997C10.5891066 5.44596767 11.6329727 3.11721418 13.4225 1.4325c.3334333-.32683002.8670667-.32683002 1.2005 0 1.7886677 1.68521534 2.8320183 4.01375565 2.8991667 6.47033333-.1002404 2.72949157-1.376551 5.28211277-3.5 6.99999997z" />
        <path d="M17.43 6.67783333C19.1014265 5.54101183 21.0786397 4.93849069 23.1 4.95c.4796887.00063444.8689352.3883177.8715.868.0697835 2.45026057-.8386379 4.82752063-2.5246667 6.6068333-2.0009973 1.8590387-4.7084726 2.7613887-7.4246666 2.4745M10.6166667 6.69066667C8.9359545 5.53533534 6.93938056 4.92739894 4.9 4.95c-.48033591-.0000107-.87062682.38767479-.87383333.868-.07166144 2.4509653.835542 4.82959311 2.52116666 6.6103333 2.01953017 1.8618845 4.74324717 2.7635551 7.47483337 2.4745M22.75 16.0625c0 2.4161667-3.9176667 4.375-8.75 4.375-4.83233333 0-8.75-1.9541667-8.75-4.375" />
        <path d="M26.0283333 12.559c.701412 1.0334801 1.0821012 2.2510363 1.0943334 3.5 0 4.8323333-5.8765 8.75-13.125 8.75-7.24850003 0-13.12500003-3.9141667-13.12500003-8.7465.01168117-1.248701.39154021-2.4661979 1.092-3.5" />
      </g>
    </svg>
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
