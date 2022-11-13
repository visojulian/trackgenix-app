import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  DELETE_TASKS_PENDING,
  DELETE_TASKS_SUCCESS,
  DELETE_TASKS_ERROR,
  POST_TASKS_PENDING,
  POST_TASKS_SUCCESS,
  POST_TASKS_ERROR,
  PUT_TASKS_PENDING,
  PUT_TASKS_SUCCESS,
  PUT_TASKS_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [{ id: 'test', description: 'placeholder' }],
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
    case POST_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_TASKS_SUCCESS:
      return {
        ...state,
        list: [...state.list],
        isLoading: false,
        error: ''
      };
    case POST_TASKS_ERROR:
      return {
        ...state,
        list: [],
        isLoading: false,
        error: action.payload
      };
    case PUT_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_TASKS_SUCCESS:
      //const test = {...something, list: [...something.list.map(item => item.id === 'test' ?
      //{...item, description: 'algo3'} : item)]};
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
    case PUT_TASKS_ERROR:
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
