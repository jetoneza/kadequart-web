import { CALL_API } from 'redux-api-middleware';
import { REHYDRATE } from 'redux-persist/constants';

// ------------------------------------
// Constants
// ------------------------------------
export const SIGNUP = 'kdq:auth:signup';
export const SIGNUP_SUCCESS = 'kdq:auth:signup_success';
export const SIGNUP_FAIL = 'kdq:auth:signup_fail';

// ------------------------------------
// Actions
// ------------------------------------
export function signup(data) {
  return {
    [CALL_API]: {
      endpoint: '/api/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      types: [
        SIGNUP,
        {
          type: SIGNUP_SUCCESS,
          meta: {
            done: true,
            transition: {
              success: (prevState) => {
                console.log(prevState)
                return {
                pathname: prevState.router.locationBeforeTransitions.query.redirect || '/dashboard',
                }
              },
            },
          },
        },
        SIGNUP_FAIL,
      ],
    },
  };
}

export const actions = {
  signup,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REHYDRATE]: (state, action) => {
    const incoming = action.payload.auth;

    let token = null;
    let user = null;

    if(incoming) {
      token = incoming.token;
      user = incoming.user;
    }

    return {
      ...state,
      token,
      user,
    };
  },
  [SIGNUP]: (state) => ({
    ...state,
    signingUp: true,
    signUpErrors: [],
  }),
  [SIGNUP_SUCCESS]: (state, action) => {
    return {
      ...state,
      signingUp: false,
      signUpErrors: [],
      token: action.payload.token,
      user: action.payload.user,
    }
  },
  [SIGNUP_FAIL]: (state, action) => ({
    ...state,
    signingUp: false,
    signUpErrors: action.payload.response.errors
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  signUpErrors: [],
  token: null,
  user: null,
};
export default function authReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
