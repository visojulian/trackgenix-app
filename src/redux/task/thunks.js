import {
  getTasksPending,
  getTasksSuccess,
  getTasksError,
  deleteTaskPending,
  deleteTaskSuccess,
  deleteTaskError
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

export const deleteTask = (taskId) => {
  return (dispatch) => {
    dispatch(deleteTaskPending());
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
        dispatch(deleteTaskSuccess(taskId));
      })
      .catch((err) => {
        dispatch(deleteTaskError(err.toString()));
      });
  };
};
