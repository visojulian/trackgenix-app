import {
  GET_ENTITY_PENDING,
  GET_ENTITY_SUCCESS,
  GET_ENTITY_REJECTED,
  DELETE_ENTITY_PENDING,
  DELETE_ENTITY_SUCCESS,
  DELETE_ENTITY_REJECTED
} from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ENTITY_PENDING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_ENTITY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        list: action.payload,
        error: ''
      };
    }
    case GET_ENTITY_REJECTED: {
      return {
        ...state,
        isLoading: false,
        list: [],
        error: action.payload
      };
    }
    case DELETE_ENTITY_PENDING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case DELETE_ENTITY_SUCCESS: {
      return {
        ...state,
        list: [...state.list.filter((project) => project._id !== action.payload)],
        isLoading: false,
        error: ''
      };
    }
    case DELETE_ENTITY_REJECTED: {
      return {
        ...state,
        isLoading: false,
        list: [],
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default reducer;
