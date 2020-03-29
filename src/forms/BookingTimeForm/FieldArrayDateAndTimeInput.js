import React from 'react';
import { string } from 'prop-types';
import { FieldArray } from 'react-final-form-arrays';
import FieldDateAndTimeInput from './FieldDateAndTimeInput';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import css from './FieldArrayDateAndTimeInput.css';

const FieldArrayDateAndTimeInput = props => {
  const {
    name: formName,
    rootListClassName,
    listClassName,
    itemClassName,
    addMoreClassName,
    values,
    meta,
    ...rest
  } = props;
  const classes = classNames(rootListClassName || css.root, listClassName);
  return (<FieldArray name={formName} >
    {({ fields }) => {
      return (
        <div className={classes}>
          {fields.map((name, index) => {
            return (
              <FieldDateAndTimeInput
                {...rest}
                values={values[formName][index]
                  ? values[formName][index]
                  : {
                    bookingStartDate: null,
                    bookingEndDate: null
                  }}
                formId={name}
              />);
          })}
          <div
            className={addMoreClassName || css.addMore}
            onClick={() => {
              fields.push(null);
            }}>
            <FormattedMessage id="FieldArrayDateAndTimeInput.addMoreDates" />
          </div>
        </div>);
    }}
  </FieldArray>)
};


FieldArrayDateAndTimeInput.defaultProps = {
  name: string.isRequired
};

FieldArrayDateAndTimeInput.propTypes = {
};

export default FieldArrayDateAndTimeInput;
