import { CALL_API } from 'redux-api-middleware';
import { SIGNUP_SUCCESS, LOGIN_SUCCESS } from './auth';
import { CREATE_TXN_SUCCESS, CREATE_TXN_FAIL, UPDATE_TXN_SUCCESS, UPDATE_TXN_FAIL, CONFIRM_TXN_SUCCESS, CONFIRM_TXN_FAIL, DELETE_TXN_SUCCESS, DELETE_TXN_FAIL } from './transactions';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_FLASH_MESSAGE = 'hp:add_flash_message';
export const DELETE_FLASH_MESSAGE = 'hp:delete_flash_message';

export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  }
}

export function deleteFlashMessage() {
  return {
    type: DELETE_FLASH_MESSAGE
  }
}

export const actions = {
  addFlashMessage,
  deleteFlashMessage
};

const failMessage = (options) =>  {
  return (state, action) => {
    const text = action.payload.response.errors.map((error) => error.message);
    return {
      ...state,
      flashMessage: {
        type: 'error',
        text,
        ...options,
      }
    }
  }
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_SUCCESS]: (state) => ({
    ...state,
    flashMessage: {
      type: 'success',
      text: 'Welcome!',
    }
  }),
  [SIGNUP_SUCCESS]: (state) => ({
    ...state,
    flashMessage: {
      type: 'success',
      text: 'You signed up successfully!',
    }
  }),
  [CREATE_TXN_SUCCESS]: (state) => ({
    ...state,
    flashMessage: {
      type: 'success',
      text: 'Transaction was successfully created!',
    }
  }),
  [UPDATE_TXN_SUCCESS]: (state) => ({
    ...state,
    flashMessage: {
      type: 'success',
      text: 'Transaction was successfully updated!',
    }
  }),
  [CONFIRM_TXN_SUCCESS]: (state) => ({
    ...state,
    flashMessage: {
      type: 'success',
      text: 'Transaction was successfully confirmed!',
    }
  }),
  [DELETE_TXN_SUCCESS]: (state) => ({
    ...state,
    flashMessage: {
      type: 'success',
      text: 'Transaction was successfully deleted!',
    }
  }),
  [DELETE_TXN_FAIL]: failMessage({}),
  [CONFIRM_TXN_FAIL]: failMessage({}),
  [UPDATE_TXN_FAIL]: failMessage({}),
  [CREATE_TXN_FAIL]: failMessage({}),
  [ADD_FLASH_MESSAGE]: (state, action) => {
    return {
      ...state,
      flashMessage: action.message,
    }
  },
  [DELETE_FLASH_MESSAGE]: (state, action) => ({
    ...state,
    flashMessage: null
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  flashMessage: null
};

export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

