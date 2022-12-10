import {
  getTasksPending,
  getTasksSuccess,
  getTasksError,
  deleteTaskPending,
  deleteTaskSuccess,
  deleteTaskError,
  postTaskPending,
  postTaskSuccess,
  postTaskError,
  putTaskPending,
  putTaskSuccess,
  putTaskError
} from './actions';

export const getTasks = () => {
  return (dispatch) => {
    dispatch(getTasksPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      headers: {
        token: sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(getTasksSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(getTasksError(err.toString()));
      });
  };
};

export const deleteTask = (taskId) => {
  return (dispatch) => {
    dispatch(deleteTaskPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        token: sessionStorage.getItem('token')
      }
    })
      .then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && (await response.json());
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          throw new Error(error);
        }
        dispatch(deleteTaskSuccess(taskId));
      })
      .catch((err) => {
        dispatch(deleteTaskError(err.toString()));
      });
  };
};

export const postTask = (description) => {
  return (dispatch) => {
    dispatch(postTaskPending());
    return fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        token: sessionStorage.getItem('token'),
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ description: description })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          return dispatch(postTaskSuccess(response.data));
        }
      })
      .catch((err) => {
        return dispatch(postTaskError(err.toString()));
      });
  };
};

export const putTask = (description, taskId) => {
  return (dispatch) => {
    dispatch(putTaskPending());
    return fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        token: sessionStorage.getItem('token'),
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ description: description })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          return dispatch(putTaskSuccess(response.data));
        }
      })
      .catch((err) => {
        return dispatch(putTaskError(err.toString()));
      });
  };
};
