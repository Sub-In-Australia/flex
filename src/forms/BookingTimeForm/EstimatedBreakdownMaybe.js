/**
 * Booking breakdown estimation
 *
 * Transactions have payment information that can be shown with the
 * BookingBreakdown component. However, when selecting booking
 * details, there is no transaction object present and we have to
 * estimate the breakdown of the transaction without data from the
 * API.
 *
 * If the payment process of a customized marketplace is something
 * else than simply daily or nightly bookings, the estimation will
 * most likely need some changes.
 *
 * To customize the estimation, first change the BookingDatesForm to
 * collect all booking information from the user (in addition to the
 * default date pickers), and provide that data to the
 * EstimatedBreakdownMaybe components. You can then make customization
 * within this file to create a fake transaction object that
 * calculates the breakdown information correctly according to the
 * process.
 *
 * In the future, the optimal scenario would be to use the same
 * transactions.initiateSpeculative API endpoint as the CheckoutPage
 * is using to get the breakdown information from the API, but
 * currently the API doesn't support that for logged out users, and we
 * are forced to estimate the information here.
 */
import React from 'react';
import Decimal from 'decimal.js';
import { types as sdkTypes } from '../../util/sdkLoader';
import { TRANSITION_REQUEST_PAYMENT, TX_TRANSITION_ACTOR_CUSTOMER } from '../../util/transaction';
import { LINE_ITEM_CUSTOMER_COMMISSION, LINE_ITEM_UNITS } from '../../util/types';
import { unitDivisor, convertMoneyToNumber, convertUnitToSubUnit } from '../../util/currency';
import { BookingBreakdown } from '../../components';
import { last, cloneDeep } from 'lodash';

import css from './BookingTimeForm.css';
import { customerCommission } from '../../marketplace-custom-config';

const { Money, UUID } = sdkTypes;

const estimatedTotalPrice = (unitPrice, unitCount) => {
  const numericPrice = convertMoneyToNumber(unitPrice);
  const numericTotalPrice = new Decimal(numericPrice).times(unitCount).toNumber();
  return new Money(
    convertUnitToSubUnit(numericTotalPrice, unitDivisor(unitPrice.currency)),
    unitPrice.currency
  );
};

// When we cannot speculatively initiate a transaction (i.e. logged
// out), we must estimate the booking breakdown. This function creates
// an estimated transaction object for that use case.
const estimatedTransaction = (unitType, bookingStart, bookingEnd, unitPrice, quantity) => {
  const now = new Date();
  const totalPrice = estimatedTotalPrice(unitPrice, quantity);

  const totalCustomerCommission = new Money(totalPrice.amount * customerCommission, totalPrice.currency);

  const totalPriceAfterCommission = new Money(totalPrice.amount + totalCustomerCommission.amount, totalPrice.currency);

  return {
    id: new UUID('estimated-transaction'),
    type: 'transaction',
    attributes: {
      createdAt: now,
      lastTransitionedAt: now,
      lastTransition: TRANSITION_REQUEST_PAYMENT,
      payinTotal: totalPriceAfterCommission,
      payoutTotal: totalPrice,
      lineItems: [
        {
          code: unitType,
          includeFor: ['customer', 'provider'],
          unitPrice: unitPrice,
          quantity: new Decimal(quantity),
          lineTotal: totalPrice,
          reversal: false,
        },
        {
          code: LINE_ITEM_CUSTOMER_COMMISSION,
          includeFor: ['customer'],
          unitPrice: unitPrice,
          lineTotal: totalCustomerCommission,
          reversal: false,
          percentage: new Decimal(customerCommission),
        }
      ],
      transitions: [
        {
          createdAt: now,
          by: TX_TRANSITION_ACTOR_CUSTOMER,
          transition: TRANSITION_REQUEST_PAYMENT,
        },
      ],
    },
    booking: {
      id: new UUID('estimated-booking'),
      type: 'booking',
      attributes: {
        start: bookingStart,
        end: bookingEnd,
      },
    },
  };
};

const EstimatedBreakdownMaybe = props => {
  const { unitType, unitPrice, startDate, endDate, quantity, timeZone } = props.bookingData;

  const isUnits = unitType === LINE_ITEM_UNITS;
  const quantityIfUsingUnits = !isUnits || Number.isInteger(quantity);
  const canEstimatePrice = startDate && endDate && unitPrice && quantityIfUsingUnits;
  if (!canEstimatePrice) {
    return null;
  }

  const tx = estimatedTransaction(unitType, startDate, endDate, unitPrice, quantity);

  return (
    <BookingBreakdown
      className={css.receipt}
      userRole="customer"
      unitType={unitType}
      transaction={tx}
      booking={tx.booking}
      timeZone={timeZone}
    />
  );
};

export default EstimatedBreakdownMaybe;

const normalizeTransactionForEstimate = (tx) => {
  const normalizedTx = cloneDeep(tx);
  if (!normalizedTx.quantity) {
    const { start, end } = normalizedTx.booking.attributes;
    normalizedTx.quantity = (end - start) / 3600000;

    normalizedTx.startDate = start;
    normalizedTx.endDate = end;
    normalizedTx.unitType = LINE_ITEM_UNITS;
    const unitLineItem = normalizedTx.attributes.lineItems.find(l => l.code === LINE_ITEM_UNITS);
    normalizedTx.unitPrice = unitLineItem.unitPrice;
  }
  return normalizedTx;
};

const createVirtualMasterTransaction = (bookings) => {
  // calculate sum of quantity, booking start, booking end, totalPrice
  const virtualBookings = cloneDeep(bookings);
  virtualBookings[0] = normalizeTransactionForEstimate(virtualBookings[0]);

  const masterBooking = bookings.slice(1).reduce((masterTx, tx) => {
    const normalizedTx = normalizeTransactionForEstimate(tx);
    masterTx.quantity += normalizedTx.quantity;
    masterTx.startDate = masterTx.startDate < normalizedTx.startDate ? masterTx.startDate : normalizedTx.startDate;
    masterTx.endDate = masterTx.endDate > normalizedTx.endDate ? masterTx.endDate : normalizedTx.endDate;
    return masterTx;
  }, cloneDeep(virtualBookings[0]));

  return masterBooking;
};

export const EstimatedBreakdownSummaryMaybe = props => {
  // compact the booking array;
  const bookings = props.bookingArray.filter(booking => booking);

  if (bookings.length < 1) {
    return null;
  }

  const masterTransaction = createVirtualMasterTransaction(bookings);

  const { unitType, unitPrice, startDate, endDate, quantity, timeZone } = masterTransaction;

  const isUnits = unitType === LINE_ITEM_UNITS;
  const quantityIfUsingUnits = !isUnits || Number.isInteger(quantity);
  const canEstimatePrice = startDate && endDate && unitPrice && quantityIfUsingUnits;

  if (!canEstimatePrice) {
    return null;
  }

  const tx = estimatedTransaction(unitType, startDate, endDate, unitPrice, quantity);

  return (
    <div>
      <h3>Bookings Summary:</h3>
      <BookingBreakdown
        className={css.receipt}
        userRole="customer"
        unitType={unitType}
        transaction={tx}
        booking={tx.booking}
        timeZone={timeZone}
        displayHour={false}
      />
    </div>
  );
};
