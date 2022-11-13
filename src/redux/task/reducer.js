import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  DELETE_TASKS_PENDING,
  DELETE_TASKS_SUCCESS,
  DELETE_TASKS_ERROR
} from './constants';

const INITAL_STATE = {
  list: [{ id: 'test', description: 'placeholder' }],
  isLoading: false,
  error: ''
};

const reducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload
      };
    case GET_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case DELETE_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TASKS_SUCCESS:
      return {
        ...state,
        list: [...state.list.filter((task) => task._id !== action.payload)],
        isLoading: false,
        error: ''
      };
    case DELETE_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
