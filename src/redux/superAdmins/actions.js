import {
  GET_SUPER_ADMINS_PENDING,
  GET_SUPER_ADMINS_SUCCESS,
  GET_SUPER_ADMINS_ERROR,
  DELETE_SUPER_ADMIN_PENDING,
  DELETE_SUPER_ADMIN_SUCCESS,
  DELETE_SUPER_ADMIN_ERROR,
  POST_SUPER_ADMIN_PENDING,
  POST_SUPER_ADMIN_SUCCESS,
  POST_SUPER_ADMIN_ERROR,
  PUT_SUPER_ADMIN_PENDING,
  PUT_SUPER_ADMIN_SUCCESS,
  PUT_SUPER_ADMIN_ERROR
} from './constants';

export const getSuperAdminsPending = () => {
  return {
    type: GET_SUPER_ADMINS_PENDING
  };
};

export const getSuperAdminsSuccess = (data) => {
  return {
    type: GET_SUPER_ADMINS_SUCCESS,
    payload: data
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

export const postSuperAdminPending = () => {
  return {
    type: POST_SUPER_ADMIN_PENDING
  };
};

export const postSuperAdminSuccess = (data) => {
  return {
    type: POST_SUPER_ADMIN_SUCCESS,
    payload: data
  };
};

export const postSuperAdminError = (error) => {
  return {
    type: POST_SUPER_ADMIN_ERROR,
    payload: error
  };
};

export const putSuperAdminPending = () => {
  return {
    type: PUT_SUPER_ADMIN_PENDING
  };
};

export const putSuperAdminSuccess = (data) => {
  return {
    type: PUT_SUPER_ADMIN_SUCCESS,
    payload: data
  };
};

export const putSuperAdminError = (error) => {
  return {
    type: PUT_SUPER_ADMIN_ERROR,
    payload: error
  };
};
