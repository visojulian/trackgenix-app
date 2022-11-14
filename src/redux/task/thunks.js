import {
  getTasksPending,
  getTasksSuccess,
  getTasksError,
  deleteTasksPending,
  deleteTasksSuccess,
  deleteTasksError,
  postTasksPending,
  postTasksSuccess,
  postTasksError,
  putTasksPending,
  putTasksSuccess,
  putTasksError
} from './actions';

export const getTasks = () => {
  return (dispatch) => {
    dispatch(getTasksPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
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

export const deleteTasks = (taskId) => {
  return (dispatch) => {
    dispatch(deleteTasksPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
      method: 'DELETE'
    })
      .then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && (await response.json());
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          throw new Error(error);
        }
        dispatch(deleteTasksSuccess(taskId));
      })
      .catch((err) => {
        dispatch(deleteTasksError(err.toString()));
      });
  };
};

export const postTasks = (description) => {
  return (dispatch) => {
    dispatch(postTasksPending());
    return fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ description: description })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          return dispatch(postTasksSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(postTasksError(err.toString()));
      });
  };
};

export const putTasks = (description, taskId) => {
  return (dispatch) => {
    console.log(description);
    dispatch(putTasksPending());
    return fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
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
          return dispatch(putTasksSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(putTasksError(err.toString()));
      });
  };
};
