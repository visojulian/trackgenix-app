import {
  deleteProjectPending,
  deleteProjectError,
  deleteProjectSuccess,
  getProjectPending,
  getProjectError,
  getProjectSuccess
} from './actions';

const getProjects = () => {
  return (dispatch) => {
    dispatch(getProjectPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.message);
        } else {
          dispatch(getProjectSuccess(res.data));
        }
      })
      .catch((err) => {
        dispatch(getProjectError(err.toString()));
      });
  };
};

const deleteProject = (projectId) => {
  return (dispatch) => {
    dispatch(deleteProjectPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        const isJson = res.headers.get('content-type')?.includes('application/json');
        const data = isJson && (await res.json());
        if (!res.ok) {
          const error = (data && data.message) || res.status;
          throw new Error(error);
        }
        dispatch(deleteProjectSuccess(projectId));
      })
      .catch((err) => {
        dispatch(deleteProjectError(err.toString()));
      });
  };
};

export { getProjects, deleteProject };
