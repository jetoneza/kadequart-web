import { CALL_API } from 'redux-api-middleware';
import { REHYDRATE } from 'redux-persist/constants';

// ------------------------------------
// Constants
// ------------------------------------
export const SIGNUP = 'kdq:auth:signup';
export const SIGNUP_SUCCESS = 'kdq:auth:signup_success';
export const SIGNUP_FAIL = 'kdq:auth:signup_fail';
export const LOGIN = 'hp:auth:login';
export const LOGIN_SUCCESS = 'hp:auth:login_success';
export const LOGIN_FAIL = 'hp:auth:login_fail';
export const LOGOUT = 'hp:auth:logout';
export const LOGOUT_SUCCESS = 'hp:auth:logout_success';

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

export function login(data) {
  return {
    [CALL_API]: {
      endpoint: '/api/auth/access-token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      types: [
        LOGIN,
        {
          type: LOGIN_SUCCESS,
          meta: {
            done: true,
            transition: {
              success: (prevState) => ({
                pathname: prevState.router.locationBeforeTransitions.query.redirect || '/dashboard',
              }),
            },
          },
        },
        LOGIN_FAIL,
      ],
    },
  };
}

export function logout() {
  return async (dispatch) => {
    await dispatch({
      type: LOGOUT,
    });
    await dispatch({
      type: LOGOUT_SUCCESS,
    });
    localStorage.removeItem('reduxPersist:auth');
  };
}

export const actions = {
  signup,
  login,
  logout,
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
  [LOGIN]: (state) => ({
    ...state,
    loggingIn: true,
    loginErrors: [],
  }),
  [LOGIN_SUCCESS]: (state, action) => {
    const { token, user } = action.payload;
    return {
      ...state,
      loggingIn: false,
      token,
      user,
      loginErrors: [],
    }
  },
  [LOGIN_FAIL]: (state, action) => ({
    ...state,
    loggingIn: false,
    token: null,
    user: null,
    loginErrors: action.payload.response.errors
  }),
  [LOGOUT]: state => ({
    ...state,
    loggingOut: true,
  }),
  [LOGOUT_SUCCESS]: state => ({
    ...state,
    loggingOut: false,
    token: null,
    user: null,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  signUpErrors: [],
  token: null,
  user: null,
  loginErrors: [],
};
export default function authReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
