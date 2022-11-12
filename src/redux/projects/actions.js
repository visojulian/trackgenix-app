import {
  GET_ENTITY_PENDING,
  GET_ENTITY_SUCCESS,
  GET_ENTITY_REJECTED,
  DELETE_ENTITY_SUCCESS
} from './constants';

const getProjectPending = () => {
  return {
    type: GET_ENTITY_PENDING
  };
};

const getProjectSuccess = (payload) => {
  return {
    type: GET_ENTITY_SUCCESS,
    payload
  };
};

const getProjectRejected = (err) => {
  return {
    type: GET_ENTITY_REJECTED,
    payload: err
  };
};

const getProjects = () => {
  return (dispatch) => {
    dispatch(getProjectPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(getProjectSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getProjectRejected(err.toString()));
      });
  };
};

const deleteProject = (description) => {
  return {
    type: DELETE_ENTITY_SUCCESS,
    payload: description
  };
};

export { getProjects, deleteProject };
