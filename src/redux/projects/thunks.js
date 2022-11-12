import {
  deleteProjectPending,
  deleteProjectRejected,
  deleteProjectSuccess,
  getProjectPending,
  getProjectRejected,
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
        dispatch(getProjectRejected(err.toString()));
      });
  };
};

const deleteProject = (projectId) => {
  return (dispatch) => {
    dispatch(deleteProjectPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.message);
        } else {
          dispatch(deleteProjectSuccess(projectId));
        }
      })
      .catch((err) => {
        dispatch(deleteProjectRejected(err.toString()));
      });
  };
};

export { getProjects, deleteProject };
