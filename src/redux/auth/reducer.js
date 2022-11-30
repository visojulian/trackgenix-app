import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from './constants';

const INITIAL_STATE = {
  email: null,
  role: null,
  isLoading: true,
  error: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
    case LOGOUT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_ERROR:
    case LOGOUT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        role: action.payload.role,
        email: action.payload.email,
        error: null
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        role: null,
        email: null,
        error: null
      };
    default:
      return state;
  }
};

export default reducer;
