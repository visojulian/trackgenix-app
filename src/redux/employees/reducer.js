import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  DELETE_EMPLOYEE_PENDING,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR,
  POST_EMPLOYEE_PENDING,
  POST_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE_ERROR,
  PUT_EMPLOYEE_PENDING,
  PUT_EMPLOYEE_SUCCESS,
  PUT_EMPLOYEE_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        error: ''
      };
    case GET_EMPLOYEES_ERROR:
      return {
        ...state,
        list: [],
        isLoading: false,
        error: action.payload
      };
    case DELETE_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: [...state.list.filter((employee) => employee._id !== action.payload)],
        isLoading: false,
        error: ''
      };
    case DELETE_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case POST_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        error: ''
      };
    case POST_EMPLOYEE_ERROR:
      return {
        ...state,
        list: [],
        isLoading: false,
        error: action.payload
      };
    case PUT_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: [...state.list].map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        error: ''
      };
    case PUT_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        list: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
