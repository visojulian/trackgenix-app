import {
  POST_TIMESHEET_PENDING,
  POST_TIMESHEET_SUCCESS,
  POST_TIMESHEET_ERROR,
  PUT_TIMESHEET_SUCCESS,
  PUT_TIMESHEET_PENDING,
  PUT_TIMESHEET_ERROR,
  GET_TIMESHEETBYID_PENDING,
  GET_TIMESHEETBYID_SUCCESS,
  GET_TIMESHEETBYID_ERROR
} from './constants';

export const addTimesheetPending = () => {
  return {
    type: POST_TIMESHEET_PENDING
  };
};

export const addTimesheetSuccess = (data) => {
  return {
    type: POST_TIMESHEET_SUCCESS,
    payload: data
  };
};

export const addTimesheetError = (error) => {
  return {
    type: POST_TIMESHEET_ERROR,
    payload: error
  };
};

export const editTimesheetPending = () => {
  return {
    type: PUT_TIMESHEET_PENDING
  };
};

export const editTimesheetSuccess = (data) => {
  return {
    type: PUT_TIMESHEET_SUCCESS,
    payload: data
  };
};

export const editTimesheetError = (error) => {
  return {
    type: PUT_TIMESHEET_ERROR,
    payload: error
  };
};

export const getTimesheetByIdPending = () => {
  return {
    type: GET_TIMESHEETBYID_PENDING
  };
};

export const getTimesheetByIdSuccess = (data) => {
  return {
    type: GET_TIMESHEETBYID_SUCCESS,
    payload: data
  };
};

export const getTimesheetByIdError = (error) => {
  return {
    type: GET_TIMESHEETBYID_ERROR,
    payload: error
  };
};
