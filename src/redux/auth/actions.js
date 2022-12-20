import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from './constants';

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const setLoggedIn = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error.code
  };
};

export const logoutPending = () => {
  return {
    type: LOGOUT_PENDING
  };
};

export const setLoggedOut = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const logoutError = (error) => {
  return {
    type: LOGOUT_ERROR,
    payload: error
  };
};
