import {
  getTimesheetsPending,
  getTimesheetsSuccess,
  getTimesheetsError,
  deleteTimesheetPending,
  deleteTimesheetSuccess,
  deleteTimesheetError
} from './actions';

export const getTimesheets = () => {
  return (dispatch) => {
    dispatch(getTimesheetsPending());
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets`)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        }
        dispatch(getTimesheetsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getTimesheetsError(error.toString()));
      });
  };
};

export const deleteTimesheet = (timesheetId) => {
  return (dispatch) => {
    dispatch(deleteTimesheetPending());
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${timesheetId}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        }
        dispatch(getTimesheets());
        dispatch(deleteTimesheetSuccess(timesheetId));
      })
      .catch((error) => {
        dispatch(deleteTimesheetError(error.toString()));
      });
  };
};
