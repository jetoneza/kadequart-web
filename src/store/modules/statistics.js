import { CALL_API } from 'redux-api-middleware';

// ------------------------------------
// Constants
// ------------------------------------
export const GET_STATISTICS = 'kdq:auth:get_statistics';
export const GET_STATISTICS_SUCCESS = 'kdq:auth:get_statistics_success';
export const GET_STATISTICS_FAIL = 'kdq:auth:get_statistics_fail';

// ------------------------------------
// Actions
// ------------------------------------
export function getStatistics() {
  return(dispatch, getState) => {
    const { auth: { token } } = getState();

    return dispatch({
      [CALL_API]: {
        endpoint: '/api/user/statistics',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        types: [ GET_STATISTICS, GET_STATISTICS_SUCCESS, GET_STATISTICS_FAIL],
      },
    });
  }
}

export const actions = {
  getStatistics,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_STATISTICS]: (state) => ({
    ...state,
    fetchingStatistics: true,
    fetchStatisticsErrors: [],
  }),
  [GET_STATISTICS_SUCCESS]: (state, action) => {
    return {
      ...state,
      fetchingStatistics: false,
      fetchStatisticsErrors: [],
      data: action.payload,
    }
  },
  [GET_STATISTICS_FAIL]: (state, action) => ({
    ...state,
    fetchingStatistics: false,
    fetchStatisticsErrors: action.payload.response.errors
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: null,
  fetchStatisticsErrors: [],
};
export default function authReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
