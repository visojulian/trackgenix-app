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

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROJECTS_PENDING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_PROJECTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        list: action.payload,
        error: ''
      };
    }
    case GET_PROJECTS_ERROR: {
      return {
        ...state,
        isLoading: false,
        list: [],
        error: action.payload
      };
    }
    case DELETE_PROJECTS_PENDING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case DELETE_PROJECTS_SUCCESS: {
      return {
        ...state,
        list: [...state.list.filter((project) => project._id !== action.payload)],
        isLoading: false,
        error: ''
      };
    }
    case DELETE_PROJECTS_ERROR: {
      return {
        ...state,
        isLoading: false,
        list: [],
        error: action.payload
      };
    }
    case POST_PROJECTS_PENDING: {
      console.log(state);
      return {
        ...state,
        isLoading: true
      };
    }
    case POST_PROJECTS_SUCCESS: {
      console.log(state);
      return {
        ...state,
        isLoading: true
      };
    }
    case POST_PROJECTS_ERROR: {
      console.log(state);
      return {
        ...state,
        isLoading: true
      };
    }
    case PUT_PROJECTS_PENDING: {
      console.log(state);
      return {
        ...state,
        isLoading: true
      };
    }
    case PUT_PROJECTS_SUCCESS: {
      console.log(state);
      return {
        ...state,
        isLoading: true
      };
    }
    case PUT_PROJECTS_ERROR: {
      console.log(state);
      return {
        ...state,
        isLoading: true
      };
    }
    default:
      return state;
  }
};

export default reducer;
