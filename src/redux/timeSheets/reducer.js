import {
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_ERROR,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_ERROR,
  POST_TIMESHEET_PENDING,
  POST_TIMESHEET_SUCCESS,
  POST_TIMESHEET_ERROR,
  PUT_TIMESHEET_SUCCESS,
  PUT_TIMESHEET_PENDING,
  PUT_TIMESHEET_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TIMESHEETS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload
      };
    case GET_TIMESHEETS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case DELETE_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TIMESHEET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [
          ...state.list.filter((timesheet) => {
            timesheet._id !== action.payload;
          })
        ]
      };
    case DELETE_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case POST_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_TIMESHEET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [...state.list, action.payload]
      };
    case POST_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case PUT_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_TIMESHEET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [...state.list].map((item) =>
          item._id === action.payload._id ? action.payload : item
        )
      };
    case PUT_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    default:
      return state;
  }
};

export default reducer;
