import {
  addTimesheetPending,
  addTimesheetSuccess,
  addTimesheetError,
  editTimesheetPending,
  editTimesheetSuccess,
  editTimesheetError
} from './actions';

export const addTimesheet = (timesheet) => {
  return (dispatch) => {
    dispatch(addTimesheetPending());
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets`, {
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
        dispatch(addTimesheetSuccess(response.data));
      })
      .catch((error) => {
        dispatch(addTimesheetError(error.toString()));
      });
  };
};

export const editTimesheet = (timesheet, id) => {
  return (dispatch) => {
    dispatch(editTimesheetPending());
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
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
        dispatch(editTimesheetSuccess(response.data));
      })
      .catch((error) => {
        dispatch(editTimesheetError(error.toString()));
      });
  };
};
