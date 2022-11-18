import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  DELETE_EMPLOYEE_PENDING,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR
} from './constants';

export const getEmployeesPending = () => {
  return {
    type: GET_EMPLOYEES_PENDING
  };
};

export const getEmployeesSuccess = (payload) => {
  return {
    type: GET_EMPLOYEES_SUCCESS,
    payload
  };
};

export const getEmployeesError = (error) => {
  return {
    type: GET_EMPLOYEES_ERROR,
    payload: error
  };
};

export const deleteEmployeePending = () => {
  return {
    type: DELETE_EMPLOYEE_PENDING
  };
};

export const deleteEmployeeSuccess = (payload) => {
  return {
    type: DELETE_EMPLOYEE_SUCCESS,
    payload
  };
};

export const deleteEmployeeError = (error) => {
  return {
    type: DELETE_EMPLOYEE_ERROR,
    payload: error
  };
};
