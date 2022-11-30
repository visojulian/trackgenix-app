import {
  getTimesheetsPending,
  getTimesheetsSuccess,
  getTimesheetsError,
  deleteTimesheetPending,
  deleteTimesheetSuccess,
  deleteTimesheetError,
  addTimesheetPending,
  addTimesheetSuccess,
  addTimesheetError,
  editTimesheetPending,
  editTimesheetSuccess,
  editTimesheetError
} from './actions';

export const getTimesheets = () => {
  return (dispatch) => {
    dispatch(getTimesheetsPending());
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets`, {
      headers: {
        token: sessionStorage.getItem('token')
      }
    })
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
      .then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && (await response.json());
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          throw new Error(error);
        }
        dispatch(deleteTimesheetSuccess(timesheetId));
      })
      .catch((error) => {
        dispatch(deleteTimesheetError(error.toString()));
      });
  };
};

export const addTimesheet = (timesheet) => {
  return (dispatch) => {
    dispatch(addTimesheetPending());
    return fetch(`${process.env.REACT_APP_API_URL}/time-sheets`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(timesheet)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        }
        return dispatch(addTimesheetSuccess(response.data));
      })
      .catch((error) => {
        return dispatch(addTimesheetError(error.toString()));
      });
  };
};

export const editTimesheet = (timesheet, id) => {
  return (dispatch) => {
    dispatch(editTimesheetPending());
    return fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(timesheet)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        }
        return dispatch(editTimesheetSuccess(response.data));
      })
      .catch((error) => {
        return dispatch(editTimesheetError(error.toString()));
      });
  };
};
