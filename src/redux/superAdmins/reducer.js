import {
  GET_SUPER_ADMINS_PENDING,
  GET_SUPER_ADMINS_SUCCESS,
  GET_SUPER_ADMINS_ERROR,
  DELETE_SUPER_ADMIN_PENDING,
  DELETE_SUPER_ADMIN_SUCCESS,
  DELETE_SUPER_ADMIN_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUPER_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_SUPER_ADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload
      };
    case GET_SUPER_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case DELETE_SUPER_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [...state.list.filter((superAdmin) => superAdmin._id !== action.payload)]
      };
    case DELETE_SUPER_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;
