import {
  GET_ENTITY_PENDING,
  GET_ENTITY_SUCCESS,
  GET_ENTITY_REJECTED,
  DELETE_ENTITY_PENDING,
  DELETE_ENTITY_SUCCESS,
  DELETE_ENTITY_REJECTED
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

const deleteProjectRejected = (err) => {
  return {
    type: DELETE_ENTITY_REJECTED,
    payload: err
  };
};

export {
  getProjectPending,
  getProjectSuccess,
  getProjectRejected,
  deleteProjectPending,
  deleteProjectSuccess,
  deleteProjectRejected
};
