import React, { Component } from 'react';
import { bool, func, object, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import { calculateQuantityFromHours, timestampToDate } from '../../util/dates';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Form, PrimaryButton } from '../../components';
import EstimatedBreakdownMaybe, { EstimatedBreakdownTotalMaybe } from './EstimatedBreakdownMaybe';
import FieldArrayDateAndTimeInput from './FieldArrayDateAndTimeInput';
import arrayMutators from 'final-form-arrays';
import moment from 'moment';

import css from './BookingTimeForm.css';

export class BookingTimeFormComponent extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleToggleBookingsDetails = this.handleToggleBookingsDetails.bind(this);
    this.bookingTime = [null];
    this.state = { showBookingsDetails: false };
  }

  handleFormSubmit(e) {
    this.props.onSubmit(e);
  }

  handleToggleBookingsDetails() {
    // console.log('toggle');
    // console.log(this.state.showBookingsDetails);
    this.setState({
      showBookingsDetails: !this.state.showBookingsDetails
    })
  };

  render() {
    const { rootClassName, className, price: unitPrice, ...rest } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    // console.log(this.state.showBookingsDetails, 'render');

    const toggleBookingsDetailsTranslationId = this.state.showBookingsDetails ? "BookingTimeForm.hideBookingsDetails" : "BookingTimeForm.showBookingsDetails";

    if (!unitPrice) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingTimeForm.listingPriceMissing" />
          </p>
        </div>
      );
    }
    if (unitPrice.currency !== config.currency) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingTimeForm.listingCurrencyInvalid" />
          </p>
        </div>
      );
    }

    return (
      <FinalForm
        {...rest}
        unitPrice={unitPrice}
        onSubmit={this.handleFormSubmit}
        mutators={{ ...arrayMutators }}
        render={fieldRenderProps => {
          const {
            endDatePlaceholder,
            startDatePlaceholder,
            form,
            pristine,
            handleSubmit,
            intl,
            isOwnListing,
            listingId,
            submitButtonWrapperClassName,
            unitPrice,
            unitType,
            values,
            monthlyTimeSlots,
            onFetchTimeSlots,
            timeZone,
          } = fieldRenderProps;

          const bookingTime = values && values.bookingTime ? values.bookingTime : null;

          // This is the place to collect breakdown estimation data. See the
          // EstimatedBreakdownMaybe component to change the calculations
          // for customized payment processes.
          const bookingData = bookingTime
            ? bookingTime.map(values => {
              const startTime = values && values.bookingStartTime ? values.bookingStartTime : null;
              const endTime = values && values.bookingEndTime ? values.bookingEndTime : null;

              const startDate = startTime ? timestampToDate(startTime) : null;
              const endDate = endTime ? timestampToDate(endTime) : null;

              return startDate && endDate
                ? {
                  unitType,
                  unitPrice,
                  startDate,
                  endDate,

                  // Calculate the quantity as hours between the booking start and booking end
                  quantity: calculateQuantityFromHours(startDate, endDate),
                  timeZone,
                }
                : null
            })
            : null;

          const shouldShowBookingsToggle = bookingData.filter(booking => booking).length >= 2;

          const shouldShowBookingsDetails = !shouldShowBookingsToggle || this.state.showBookingsDetails;
          
          const bookingStartLabel = intl.formatMessage({
            id: 'BookingTimeForm.bookingStartTitle',
          });
          const bookingEndLabel = intl.formatMessage({ id: 'BookingTimeForm.bookingEndTitle' });
          const bookingInfo = bookingData ? (
            <div className={css.priceBreakdownContainer}>
              <h3 className={css.priceBreakdownTitle}>
                <FormattedMessage id="BookingTimeForm.priceBreakdownTitle" />
              </h3>
              {
                shouldShowBookingsToggle && (
                  <span className={css.toggleBookingBreakdown} onClick={this.handleToggleBookingsDetails}>
                    <FormattedMessage id={toggleBookingsDetailsTranslationId}/>
                  </span>
                )
              }
              {shouldShowBookingsDetails && bookingData.map(data => {
                return data
                  ? (<EstimatedBreakdownMaybe bookingData={data} />)
                  : null;
              })}
              {
                bookingData.length > 1 && (
                  <EstimatedBreakdownTotalMaybe bookingArray={bookingData}/>
                )
              }
            </div>
          ) : null;

          const submitButtonClasses = classNames(
            submitButtonWrapperClassName || css.submitButtonWrapper
          );

          const startDateInputProps = {
            label: bookingStartLabel,
            placeholderText: startDatePlaceholder,
          };
          const endDateInputProps = {
            label: bookingEndLabel,
            placeholderText: endDatePlaceholder,
          };

          const dateInputProps = {
            startDateInputProps,
            endDateInputProps,
          };

          //We use this to store and get old booking time values
          //monthlyTimeSlots got update would trigger the form to re-render
          if (!values.bookingTime[0] && this.bookingTime[0]) {
            form.change('bookingTime', this.bookingTime);
          } else {
            this.bookingTime = values.bookingTime;
          }

          const getBookingsStartEachMonth = (bookingTime) => {
            return bookingTime.reduce((result, currentTime) => {
              const monthString = moment(currentTime.bookingStartTime)
                .format('YYYY-MM');
              result[monthString] = result[monthString]
                ? [...result[monthString], currentTime]
                : [currentTime];
              return result;
            }, {});
          }

          const sortBookingsTime = bookingTimes => {
            return bookingTimes.sort((timeA, timeB) => {
              const { bookingStartTime: startTimeA } = timeA;
              const { bookingStartTime: startTimeB } = timeB;
              return startTimeA - startTimeB;
            });
          }

          //Check if there are over laped time
          //Check intersect time
          //Check union time
          //For now assuming that there is only 1 slot, we would raise if there are overlap time
          const validateOverlapedTime = bookingsTime => {
            const sortedBookingsTime = sortBookingsTime(bookingsTime); //Sort on booking start, near now
            let haveOverlapedTime = false;
            sortedBookingsTime.forEach((bookingTime, i, readableBookingTimes) => {
              if (haveOverlapedTime || i === readableBookingTimes.length - 1) {
                return;
              }
              const { bookingEndTime: currentEnd } = bookingTime;
              const { bookingStartTime: nextStart } = readableBookingTimes[i + 1];
              if (currentEnd > nextStart) {
                haveOverlapedTime = true;
              }
            });
            return haveOverlapedTime;
          }

          const validateAvailableSeat = ({
            bookingsStartEachMonth,
            monthlyTimeSlots }) => {
            return Object.entries(monthlyTimeSlots)
              .reduce((result, [month, { timeSlots }]) => {
                if (!timeSlots) {
                  return result;
                }

                const bookingsStartInMonth = bookingsStartEachMonth[month]
                  ? bookingsStartEachMonth[month]
                  : [];
                let indexOfNotEnoughSeatSlot = [];
                let haveInvalidBookings = false;

                const timeslotsWithBookings = timeSlots.map((slots, i) => {
                  const { start, end, seats } = slots.attributes;

                  const bookingsStartInSlots = bookingsStartInMonth
                    .filter(({ bookingStartTime }) => {
                      return bookingStartTime >= start.getTime() &&
                        bookingStartTime < end.getTime()
                    });

                  const overlapedTime = validateOverlapedTime(bookingsStartInSlots);
                  const notEnoughSeat = overlapedTime;

                  if (notEnoughSeat) {
                    indexOfNotEnoughSeatSlot.push(i);
                    haveInvalidBookings = true;
                  }

                  return {
                    ...slots,
                    bookings: bookingsStartInSlots,
                    notEnoughSeat
                  };
                });

                result[month] = {
                  timeSlots: timeslotsWithBookings,
                  indexOfNotEnoughSeatSlot,
                  haveInvalidBookings
                };
                return result;
              }, {})
          }

          const validateBookingTime = ({
            bookingTime,
            monthlyTimeSlots }) => {
            if (!bookingTime || !bookingTime[0]) {
              return monthlyTimeSlots;
            }
            const bookingsStartEachMonth = getBookingsStartEachMonth(bookingTime);
            return validateAvailableSeat({ bookingsStartEachMonth, monthlyTimeSlots });
          }

          const verifiredSeatTimeslots = validateBookingTime({
            bookingTime: values.bookingTime.filter(time => !!time),
            monthlyTimeSlots
          });

          const invalidSlots = Object.entries(verifiredSeatTimeslots)
            .filter(([month, { haveInvalidBookings }]) => haveInvalidBookings);

          const cantBeBook = invalidSlots.length > 0;

          return (
            <Form onSubmit={handleSubmit} className={classes}>
              {monthlyTimeSlots && timeZone ? (
                <FieldArrayDateAndTimeInput
                  {...dateInputProps}
                  className={css.bookingDates}
                  listingId={listingId}
                  bookingStartLabel={bookingStartLabel}
                  onFetchTimeSlots={onFetchTimeSlots}
                  monthlyTimeSlots={monthlyTimeSlots}
                  values={values}
                  intl={intl}
                  form={form}
                  pristine={pristine}
                  timeZone={timeZone}
                  name={'bookingTime'}
                />
              ) : null}
              {bookingInfo}
              <p className={css.smallPrint}>
                <FormattedMessage
                  id={
                    isOwnListing
                      ? 'BookingTimeForm.ownListing'
                      : 'BookingTimeForm.youWontBeChargedInfo'
                  }
                />
              </p>
              {cantBeBook && (
                <div className={css.invalidSlot}>
                  <p className={css.smallPrint}>
                    <FormattedMessage
                      id='BookingTimeForm.haveInvalidSeatBookings'
                    />
                  </p>
                  {invalidSlots.map(([month, { indexOfNotEnoughSeatSlot, timeSlots }], i) => {
                    return indexOfNotEnoughSeatSlot.map(index => {
                      return timeSlots[index].bookings.map(({ bookingStartTime, bookingEndTime }) => {
                        return (<p className={css.smallPrint}>
                          {`${moment(bookingStartTime).format('MMM Do YYYY, h:mm a')}-${moment(bookingEndTime).format('h:mm a')}`}
                        </p>);
                      });
                    });
                  })}
                </div>
              )}
              <div className={submitButtonClasses}>
                <PrimaryButton
                  disabled={cantBeBook}
                  type="submit">
                  <FormattedMessage id="BookingTimeForm.requestToBook" />
                </PrimaryButton>
              </div>
            </Form>
          );
        }
        }
      />
    );
  }
}

BookingTimeFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  price: null,
  isOwnListing: false,
  listingId: null,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  monthlyTimeSlots: null,
};

BookingTimeFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  unitType: propTypes.bookingUnitType.isRequired,
  price: propTypes.money,
  isOwnListing: bool,
  listingId: propTypes.uuid,
  monthlyTimeSlots: object,
  onFetchTimeSlots: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,

  // for tests
  startDatePlaceholder: string,
  endDatePlaceholder: string,
};

const BookingTimeForm = compose(injectIntl)(BookingTimeFormComponent);
BookingTimeForm.displayName = 'BookingTimeForm';

export default BookingTimeForm;
