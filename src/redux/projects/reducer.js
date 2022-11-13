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
    case GET_ENTITY_ERROR: {
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
    case DELETE_ENTITY_ERROR: {
      return {
        ...state,
        isLoading: false,
        list: [],
        error: action.payload
      };
    }
    case ADD_ENTITY_PENDING: {
      console.log('ADD_ENTITY_PENDING');
      return {
        list: []
      };
    }
    case ADD_ENTITY_SUCCESS: {
      console.log('ADD_ENTITY_SUCCESS');
      return {
        list: []
      };
    }
    case ADD_ENTITY_ERROR: {
      console.log('ADD_ENTITY_ERROR');
      return {
        list: []
      };
    }
    case UPDATE_ENTITY_PENDING: {
      console.log('UPDATE_ENTITY_PENDING');
      return {
        list: []
      };
    }
    case UPDATE_ENTITY_SUCCESS: {
      console.log('UPDATE_ENTITY_SUCCESS');
      return {
        list: []
      };
    }
    case UPDATE_ENTITY_ERROR: {
      console.log('UPDATE_ENTITY_ERROR');
      return {
        list: []
      };
    }
    default:
      return state;
  }
};

export default reducer;
