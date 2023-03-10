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
    case DELETE_PROJECT_PENDING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case DELETE_PROJECT_SUCCESS: {
      return {
        ...state,
        list: [...state.list.filter((project) => project._id !== action.payload)],
        isLoading: false,
        error: ''
      };
    }
    case DELETE_PROJECT_ERROR: {
      return {
        ...state,
        isLoading: false,
        list: [],
        error: action.payload
      };
    }
    case POST_PROJECT_PENDING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case POST_PROJECT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [...state.list, action.payload]
      };
    }
    case POST_PROJECT_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    }
    case PUT_PROJECT_PENDING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case PUT_PROJECT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [
          ...state.list.map((item) => (item.id === action.payload._id ? action.payload : item))
        ]
      };
    }
    case PUT_PROJECT_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    }
    default:
      return state;
  }
};

export default reducer;
