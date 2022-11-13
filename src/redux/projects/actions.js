import {
  GET_ENTITY_PENDING,
  GET_ENTITY_SUCCESS,
  GET_ENTITY_ERROR,
  DELETE_ENTITY_PENDING,
  DELETE_ENTITY_SUCCESS,
  DELETE_ENTITY_ERROR,
  ADD_ENTITY_PENDING,
  ADD_ENTITY_SUCCESS,
  ADD_ENTITY_ERROR,
  UPDATE_ENTITY_PENDING,
  UPDATE_ENTITY_SUCCESS,
  UPDATE_ENTITY_ERROR
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

const getProjectError = (err) => {
  return {
    type: GET_ENTITY_ERROR,
    payload: err
  };
};

const deleteProjectPending = () => {
  return {
    type: DELETE_ENTITY_PENDING
  };
};

const deleteProjectSuccess = (id) => {
  return {
    type: DELETE_ENTITY_SUCCESS,
    payload: id
  };
};

const deleteProjectError = (err) => {
  return {
    type: DELETE_ENTITY_ERROR,
    payload: err
  };
};

const addProjectPending = () => {
  return {
    type: ADD_ENTITY_PENDING
  };
};
const addProjectSuccess = (body) => {
  return {
    type: ADD_ENTITY_SUCCESS,
    payload: body
  };
};
const addProjectError = (error) => {
  return {
    type: ADD_ENTITY_ERROR,
    payload: error
  };
};
const updateProjectPending = () => {
  return {
    type: UPDATE_ENTITY_PENDING
  };
};
const updateProjectSuccess = (id) => {
  return {
    type: UPDATE_ENTITY_SUCCESS,
    payload: id
  };
};
const updateProjectError = (error) => {
  return {
    type: UPDATE_ENTITY_ERROR,
    payload: error
  };
};

export {
  getProjectPending,
  getProjectSuccess,
  getProjectError,
  deleteProjectPending,
  deleteProjectSuccess,
  deleteProjectError,
  addProjectPending,
  addProjectSuccess,
  addProjectError,
  updateProjectPending,
  updateProjectSuccess,
  updateProjectError
};
