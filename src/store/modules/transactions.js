import { CALL_API } from 'redux-api-middleware';

// ------------------------------------
// Constants
// ------------------------------------
export const GET_TXN_TYPES = 'kdq:auth:get_txn_types';
export const GET_TXN_TYPES_SUCCESS = 'kdq:auth:get_txn_types_success';
export const GET_TXN_TYPES_FAIL = 'kdq:auth:get_txn_types_fail';
export const CREATE_TXN = 'kdq:auth:create_txn';
export const CREATE_TXN_SUCCESS = 'kdq:auth:create_txn_success';
export const CREATE_TXN_FAIL = 'kdq:auth:create_txn_fail';
export const GET_TXNS = 'kdq:auth:get_txns';
export const GET_TXNS_SUCCESS = 'kdq:auth:get_txns_success';
export const GET_TXNS_FAIL = 'kdq:auth:get_txns_fail';

// ------------------------------------
// Actions
// ------------------------------------
export function getTransactionTypes() {
  return(dispatch, getState) => {
    const { auth: { token } } = getState();

    return dispatch({
      [CALL_API]: {
        endpoint: '/api/transactions/types',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        types: [ GET_TXN_TYPES, GET_TXN_TYPES_SUCCESS, GET_TXN_TYPES_FAIL],
      },
    });
  }
}

export function getTransactions(page = 1, pageSize = 10) {
  return(dispatch, getState) => {
    const { auth: { token } } = getState();

    return dispatch({
      [CALL_API]: {
        endpoint: `/api/transactions?page=${page}&pageSize=${pageSize}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        types: [ GET_TXNS, GET_TXNS_SUCCESS, GET_TXNS_FAIL],
      },
    });
  }
}

export function createTransaction(data) {
  return(dispatch, getState) => {
    const { auth: { token } } = getState();
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/transactions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        types: [ CREATE_TXN, CREATE_TXN_SUCCESS, CREATE_TXN_FAIL],
      },
    });
  }
}

export const actions = {
  getTransactionTypes,
  createTransaction,
  getTransactions,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_TXN_TYPES]: (state) => ({
    ...state,
    fetchingTransactionTypes: true,
    fetchTransactionTypesErrors: [],
  }),
  [GET_TXN_TYPES_SUCCESS]: (state, action) => {
    return {
      ...state,
      fetchingTransactionTypes: false,
      fetchTransactionTypesErrors: [],
      transactionTypes: action.payload,
    }
  },
  [GET_TXN_TYPES_FAIL]: (state, action) => ({
    ...state,
    fetchingTransactionTypes: false,
    fetchTransactionTypesErrors: action.payload.response.errors
  }),
  [GET_TXNS]: (state) => ({
    ...state,
    fetchingTransactions: true,
    fetchTransactionsErrors: [],
    createSuccess: false,
  }),
  [GET_TXNS_SUCCESS]: (state, action) => {
    return {
      ...state,
      fetchingTransactions: false,
      fetchTransactionsErrors: [],
      list: action.payload,
    }
  },
  [GET_TXNS_FAIL]: (state, action) => ({
    ...state,
    fetchingTransactions: false,
    fetchTransactionsErrors: action.payload.response.errors
  }),
  [CREATE_TXN]: (state) => ({
    ...state,
    creating: true,
    createErrors: [],
    createSuccess: false,
  }),
  [CREATE_TXN_SUCCESS]: (state, action) => {
    return {
      ...state,
      creating: false,
      createErrors: [],
      createSuccess: true,
      createdTransaction: action.payload,
    }
  },
  [CREATE_TXN_FAIL]: (state, action) => ({
    ...state,
    creating: false,
    createErrors: action.payload.response.errors,
    createSuccess: false,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  transactionTypes: [],
  fetchTransactionTypesErrors: [],
  createdTransaction: null,
  createErrors: [],
  list: null,
  fetchTransactionsErrors: [],
};
export default function authReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
