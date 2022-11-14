import {
  GET_SUPER_ADMINS_PENDING,
  GET_SUPER_ADMINS_SUCCESS,
  GET_SUPER_ADMINS_ERROR,
  DELETE_SUPER_ADMIN_PENDING,
  DELETE_SUPER_ADMIN_SUCCESS,
  DELETE_SUPER_ADMIN_ERROR
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

export const deleteSuperAdminPending = () => {
  return {
    type: DELETE_SUPER_ADMIN_PENDING
  };
};

export const deleteSuperAdminSuccess = (payload) => {
  return {
    type: DELETE_SUPER_ADMIN_SUCCESS,
    payload
  };
};

export const deleteSuperAdminError = (error) => {
  return {
    type: DELETE_SUPER_ADMIN_ERROR,
    payload: error
  };
};
