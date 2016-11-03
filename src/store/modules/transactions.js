import { CALL_API } from 'redux-api-middleware';

// ------------------------------------
// Constants
// ------------------------------------
export const GET_TXN_TYPES = 'kdq:auth:get_txn_types';
export const GET_TXN_TYPES_SUCCESS = 'kdq:auth:get_txn_types_success';
export const GET_TXN_TYPES_FAIL = 'kdq:auth:get_txn_types_fail';

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

export const actions = {
  getTransactionTypes,
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
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  transactionTypes: [],
  fetchTransactionTypesErrors: [],
};
export default function authReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
