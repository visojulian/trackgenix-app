import {
  deleteProjectPending,
  deleteProjectError,
  deleteProjectSuccess,
  getProjectPending,
  getProjectError,
  getProjectSuccess,
  postProjectPending,
  postProjectError,
  postProjectSuccess,
  putProjectPending,
  putProjectError,
  putProjectSuccess
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
        const isJson = res.headers.get('res-type')?.includes('application/json');
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

const postProject = (body) => {
  return (dispatch) => {
    dispatch(postProjectPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          return dispatch(postProjectSuccess(res.data));
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        return dispatch(postProjectError(err.toString()));
      });
  };
};

const putProject = (body, id) => {
  return (dispatch) => {
    dispatch(putProjectPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects/${id}/update`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          return dispatch(putProjectSuccess(res.data));
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        return dispatch(putProjectError(err.toString()));
      });
  };
};

export { getProjects, deleteProject, postProject, putProject };
