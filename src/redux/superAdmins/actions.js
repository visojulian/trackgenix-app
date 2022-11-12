import {
  GET_SUPER_ADMINS_PENDING,
  GET_SUPER_ADMINS_SUCCESS,
  GET_SUPER_ADMINS_ERROR
} from './constants';

const getSuperAdminsPending = () => {
  return {
    type: GET_SUPER_ADMINS_PENDING
  };
};

const getSuperAdminsSuccess = (payload) => {
  return {
    type: GET_SUPER_ADMINS_SUCCESS,
    payload
  };
};

const getSuperAdminsError = (error) => {
  return {
    type: GET_SUPER_ADMINS_ERROR,
    payload: error
  };
};

export default { getSuperAdminsPending, getSuperAdminsSuccess, getSuperAdminsError };
