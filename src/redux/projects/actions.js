import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  POST_PROJECT_PENDING,
  POST_PROJECT_SUCCESS,
  POST_PROJECT_ERROR,
  PUT_PROJECT_PENDING,
  PUT_PROJECT_SUCCESS,
  PUT_PROJECT_ERROR
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
    type: DELETE_PROJECT_PENDING
  };
};

const deleteProjectSuccess = (id) => {
  return {
    type: DELETE_PROJECT_SUCCESS,
    payload: id
  };
};

const deleteProjectError = (err) => {
  return {
    type: DELETE_PROJECT_ERROR,
    payload: err
  };
};

const postProjectPending = () => {
  return {
    type: POST_PROJECT_PENDING
  };
};

const postProjectSuccess = (body) => {
  return {
    type: POST_PROJECT_SUCCESS,
    payload: body
  };
};

const postProjectError = (err) => {
  return {
    type: POST_PROJECT_ERROR,
    payload: err
  };
};

const putProjectPending = () => {
  return {
    type: PUT_PROJECT_PENDING
  };
};

const putProjectSuccess = (body) => {
  return {
    type: PUT_PROJECT_SUCCESS,
    payload: body
  };
};

const putProjectError = (err) => {
  return {
    type: PUT_PROJECT_ERROR,
    payload: err
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
