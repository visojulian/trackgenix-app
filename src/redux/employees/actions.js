import { GET_EMPLOYEES_PENDING, GET_EMPLOYEES_SUCCESS, GET_EMPLOYEES_ERROR } from './constants';

const getEmployeesPending = () => {
  return {
    type: GET_EMPLOYEES_PENDING
  };
};

const getEmployeesSuccess = (payload) => {
  return {
    type: GET_EMPLOYEES_SUCCESS,
    payload
  };
};

const getEmployeesError = (err) => {
  return {
    type: GET_EMPLOYEES_ERROR,
    payload: err
  };
};

export { getEmployeesPending, getEmployeesSuccess, getEmployeesError };
