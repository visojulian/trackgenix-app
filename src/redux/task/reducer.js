import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  POST_TASK_PENDING,
  POST_TASK_SUCCESS,
  POST_TASK_ERROR,
  PUT_TASK_PENDING,
  PUT_TASK_SUCCESS,
  PUT_TASK_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        error: ''
      };
    case GET_TASKS_ERROR:
      return {
        ...state,
        list: [],
        isLoading: false,
        error: action.payload
      };
    case DELETE_TASK_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        list: [...state.list.filter((task) => task._id !== action.payload)],
        isLoading: false,
        error: ''
      };
    case DELETE_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case POST_TASK_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_TASK_SUCCESS:
      return {
        ...state,
        list: [...state.list],
        isLoading: false,
        error: ''
      };
    case POST_TASK_ERROR:
      return {
        ...state,
        list: [],
        isLoading: false,
        error: action.payload
      };
    case PUT_TASK_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_TASK_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        list: [
          ...state.list.map((item) =>
            item.id === action.payload._id
              ? { ...item, description: action.payload.description }
              : item
          )
        ],
        isLoading: false,
        error: ''
      };
    case PUT_TASK_ERROR:
      return {
        ...state,
        list: [],
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
