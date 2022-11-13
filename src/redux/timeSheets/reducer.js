import {
  POST_TIMESHEET_PENDING,
  POST_TIMESHEET_SUCCESS,
  POST_TIMESHEET_ERROR,
  PUT_TIMESHEET_SUCCESS,
  PUT_TIMESHEET_PENDING,
  PUT_TIMESHEET_ERROR,
  GET_TIMESHEETBYID_PENDING,
  GET_TIMESHEETBYID_SUCCESS,
  GET_TIMESHEETBYID_ERROR
} from './constants';

const INITIAL_STATE = {
  timesheet: {
    description: '',
    date: '',
    hours: '',
    task: '',
    employee: '',
    project: ''
  },
  isLoading: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
        timesheet: action.payload
      };
    case POST_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        timesheet: {}
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
        timesheet: action.payload
      };
    case PUT_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        timesheet: {}
      };
    case GET_TIMESHEETBYID_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TIMESHEETBYID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        timesheet: action.payload
      };
    case GET_TIMESHEETBYID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        timesheet: {}
      };
    default:
      return state;
  }
};

export default reducer;
