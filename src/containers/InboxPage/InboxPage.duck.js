import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import { storableError } from '../../util/errors';
import { parse } from '../../util/urlHelpers';
import { TRANSITIONS, TRANSITION_ACCEPT, TRANSITION_DECLINE, TRANSITION_CANCEL_BY_PROVIDER, TRANSITION_CANCEL_BY_CUSTOMER } from '../../util/transaction';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { fetchCurrentUserNotifications } from '../../ducks/user.duck';
import * as log from '../../util/log';

const sortedTransactions = txs =>
  reverse(
    sortBy(txs, tx => {
      return tx.attributes ? tx.attributes.lastTransitionedAt : null;
    })
  );

// ================ Action types ================ //

export const FETCH_ORDERS_OR_SALES_REQUEST = 'app/InboxPage/FETCH_ORDERS_OR_SALES_REQUEST';
export const FETCH_ORDERS_OR_SALES_SUCCESS = 'app/InboxPage/FETCH_ORDERS_OR_SALES_SUCCESS';
export const FETCH_ORDERS_OR_SALES_ERROR = 'app/InboxPage/FETCH_ORDERS_OR_SALES_ERROR';

// ================ Reducer ================ //

const entityRefs = entities =>
  entities.map(entity => ({
    id: entity.id,
    type: entity.type,
  }));

const initialState = {
  fetchInProgress: false,
  fetchOrdersOrSalesError: null,
  pagination: null,
  transactionRefs: [],
};

export default function checkoutPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ORDERS_OR_SALES_REQUEST:
      return { ...state, fetchInProgress: true, fetchOrdersOrSalesError: null };
    case FETCH_ORDERS_OR_SALES_SUCCESS: {
      const transactions = sortedTransactions(payload.data.data);
      return {
        ...state,
        fetchInProgress: false,
        transactionRefs: entityRefs(transactions),
        pagination: payload.data.meta,
      };
    }
    case FETCH_ORDERS_OR_SALES_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, fetchInProgress: false, fetchOrdersOrSalesError: payload };

    default:
      return state;
  }
}

// ================ Action creators ================ //

const fetchOrdersOrSalesRequest = () => ({ type: FETCH_ORDERS_OR_SALES_REQUEST });
const fetchOrdersOrSalesSuccess = response => ({
  type: FETCH_ORDERS_OR_SALES_SUCCESS,
  payload: response,
});
const fetchOrdersOrSalesError = e => ({
  type: FETCH_ORDERS_OR_SALES_ERROR,
  error: true,
  payload: e,
});

// ================ Thunks ================ //

const INBOX_PAGE_SIZE = 50;

export const loadData = (params, search) => (dispatch, getState, sdk) => {
  const { tab } = params;

  const onlyFilterValues = {
    orders: 'order',
    sales: 'sale',
  };

  const onlyFilter = onlyFilterValues[tab];
  if (!onlyFilter) {
    return Promise.reject(new Error(`Invalid tab for InboxPage: ${tab}`));
  }

  dispatch(fetchOrdersOrSalesRequest());

  const { page = 1 } = parse(search);

  const apiQueryParams = {
    only: onlyFilter,
    lastTransitions: TRANSITIONS,
    include: [
      'provider',
      'provider.profileImage',
      'customer',
      'customer.profileImage',
      'booking',
      'listing',
      'protectedData',
    ],
    'fields.transaction': [
      'lastTransition',
      'lastTransitionedAt',
      'transitions',
      'payinTotal',
      'payoutTotal',
      'protectedData',
      'lineItems'
    ],
    'fields.user': ['profile.displayName', 'profile.abbreviatedName'],
    'fields.image': ['variants.square-small', 'variants.square-small2x'],
    page,
    per_page: INBOX_PAGE_SIZE,
  };

  return sdk.transactions
    .query(apiQueryParams)
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(fetchOrdersOrSalesSuccess(response));
      return response;
    })
    .catch(e => {
      dispatch(fetchOrdersOrSalesError(storableError(e)));
      throw e;
    });
};

export const acceptSale = id => (dispatch, getState, sdk) => {

  return sdk.transactions
    .transition({ id, transition: TRANSITION_ACCEPT, params: {} }, { expand: true })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(fetchCurrentUserNotifications());
      return response;
    })
    .catch(e => {
      log.error(e, 'accept-sale-failed', {
        txId: id,
        transition: TRANSITION_ACCEPT,
      });
      throw e;
    });
};

export const declineSale = id => (dispatch, getState, sdk) => {

  return sdk.transactions
    .transition({ id, transition: TRANSITION_DECLINE, params: {} }, { expand: true })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(fetchCurrentUserNotifications());
      return response;
    })
    .catch(e => {
      log.error(e, 'reject-sale-failed', {
        txId: id,
        transition: TRANSITION_DECLINE,
      });
      throw e;
    });
};

export const cancelSale = params => (dispatch, getState, sdk) => {

  const { transactionId , isProvider } = params;
  const nextTransition = isProvider ? TRANSITION_CANCEL_BY_PROVIDER : TRANSITION_CANCEL_BY_CUSTOMER;

  return sdk.transactions
    .transition({ id: transactionId, transition: nextTransition, params: {} }, { expand: true })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(fetchCurrentUserNotifications());
      return response;
    })
    .catch(e => {
      log.error(e, 'reject-sale-failed', {
        txId: transactionId,
        transition: nextTransition,
      });
      throw e;
    });
};
