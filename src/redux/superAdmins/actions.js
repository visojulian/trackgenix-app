import {
  GET_SUPER_ADMINS_PENDING,
  GET_SUPER_ADMINS_SUCCESS,
  GET_SUPER_ADMINS_ERROR,
  DELETE_SUPER_ADMINS_PENDING,
  DELETE_SUPER_ADMINS_SUCCESS,
  DELETE_SUPER_ADMINS_ERROR
} from './constants';

export const getSuperAdminsPending = () => {
  return {
    type: GET_SUPER_ADMINS_PENDING
  };
};

export const getSuperAdminsSuccess = (payload) => {
  return {
    type: GET_SUPER_ADMINS_SUCCESS,
    payload
  };
};

export const getSuperAdminsError = (error) => {
  return {
    type: GET_SUPER_ADMINS_ERROR,
    payload: error
  };
};

export const deleteSuperAdminsPending = () => {
  return {
    type: DELETE_SUPER_ADMINS_PENDING
  };
};

export const deleteSuperAdminsSuccess = (payload) => {
  return {
    type: DELETE_SUPER_ADMINS_SUCCESS,
    payload
  };
};

export const deleteSuperAdminsError = (error) => {
  return {
    type: DELETE_SUPER_ADMINS_ERROR,
    payload: error
  };
};
