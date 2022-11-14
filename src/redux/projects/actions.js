import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  DELETE_PROJECTS_PENDING,
  DELETE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_ERROR,
  POST_PROJECTS_PENDING,
  POST_PROJECTS_SUCCESS,
  POST_PROJECTS_ERROR,
  PUT_PROJECTS_PENDING,
  PUT_PROJECTS_SUCCESS,
  PUT_PROJECTS_ERROR
} from './constants';

const getProjectPending = () => {
  return {
    type: GET_PROJECTS_PENDING
  };
};

const getProjectSuccess = (payload) => {
  return {
    type: GET_PROJECTS_SUCCESS,
    payload
  };
};

const getProjectError = (err) => {
  return {
    type: GET_PROJECTS_ERROR,
    payload: err
  };
};

const deleteProjectPending = () => {
  return {
    type: DELETE_PROJECTS_PENDING
  };
};

const deleteProjectSuccess = (id) => {
  return {
    type: DELETE_PROJECTS_SUCCESS,
    payload: id
  };
};

const deleteProjectError = (err) => {
  return {
    type: DELETE_PROJECTS_ERROR,
    payload: err
  };
};

const postProjectPending = () => {
  return {
    type: POST_PROJECTS_PENDING
  };
};

const postProjectSuccess = () => {
  return {
    type: POST_PROJECTS_SUCCESS
  };
};

const postProjectError = () => {
  return {
    type: POST_PROJECTS_ERROR
  };
};

const putProjectPending = () => {
  return {
    type: PUT_PROJECTS_PENDING
  };
};

const putProjectSuccess = () => {
  return {
    type: PUT_PROJECTS_SUCCESS
  };
};

const putProjectError = () => {
  return {
    type: PUT_PROJECTS_ERROR
  };
};

export {
  getProjectPending,
  getProjectSuccess,
  getProjectError,
  deleteProjectPending,
  deleteProjectSuccess,
  deleteProjectError,
  postProjectPending,
  postProjectSuccess,
  postProjectError,
  putProjectPending,
  putProjectSuccess,
  putProjectError
};
