import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  DELETE_EMPLOYEE_PENDING,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR,
  POST_EMPLOYEE_PENDING,
  POST_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE_ERROR,
  PUT_EMPLOYEE_PENDING,
  PUT_EMPLOYEE_SUCCESS,
  PUT_EMPLOYEE_ERROR
} from './constants';

export const getEmployeesPending = () => {
  return {
    type: GET_EMPLOYEES_PENDING
  };
};

export const getEmployeesSuccess = (data) => {
  return {
    type: GET_EMPLOYEES_SUCCESS,
    payload: data
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

export const deleteEmployeeSuccess = (data) => {
  return {
    type: DELETE_EMPLOYEE_SUCCESS,
    payload: data
  };
};

export const deleteEmployeeError = (error) => {
  return {
    type: DELETE_EMPLOYEE_ERROR,
    payload: error
  };
};

export const postEmployeePending = () => {
  return {
    type: POST_EMPLOYEE_PENDING
  };
};

export const postEmployeeSuccess = (data) => {
  return {
    type: POST_EMPLOYEE_SUCCESS,
    payload: data
  };
};

export const postEmployeeError = (error) => {
  return {
    type: POST_EMPLOYEE_ERROR,
    payload: error
  };
};

export const putEmployeePending = () => {
  return {
    type: PUT_EMPLOYEE_PENDING
  };
};

export const putEmployeeSuccess = (data) => {
  return {
    type: PUT_EMPLOYEE_SUCCESS,
    payload: data
  };
};

export const putEmployeeError = (error) => {
  return {
    type: PUT_EMPLOYEE_ERROR,
    payload: error
  };
};
