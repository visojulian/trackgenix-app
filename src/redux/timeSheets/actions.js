import {
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_ERROR,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_ERROR
} from './constants';

export const getTimesheetsPending = () => {
  return {
    type: GET_TIMESHEETS_PENDING
  };
};

export const getTimesheetsSuccess = (data) => {
  return {
    type: GET_TIMESHEETS_SUCCESS,
    payload: data
  };
};

export const getTimesheetsError = (error) => {
  return {
    type: GET_TIMESHEETS_ERROR,
    payload: error
  };
};

export const deleteTimesheetPending = () => {
  return {
    type: DELETE_TIMESHEET_PENDING
  };
};

export const deleteTimesheetSuccess = (id) => {
  return {
    type: DELETE_TIMESHEET_SUCCESS,
    payload: id
  };
};

export const deleteTimesheetError = (error) => {
  return {
    type: DELETE_TIMESHEET_ERROR,
    payload: error
  };
};
