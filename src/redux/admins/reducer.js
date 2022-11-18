import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR,
  PUT_ADMIN_PENDING,
  PUT_ADMIN_SUCCESS,
  PUT_ADMIN_ERROR,
  POST_ADMIN_PENDING,
  POST_ADMIN_SUCCESS,
  POST_ADMIN_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload
      };
    case GET_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case DELETE_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        list: [...state.list.filter((admin) => admin._id !== action.payload)],
        isLoading: false,
        error: ''
      };
    case DELETE_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case PUT_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_ADMIN_SUCCESS:
      return {
        ...state,
        list: [
          ...state.list.map((item) =>
            item.id === action.payload._id
              ? {
                  ...item,
                  name: action.payload.name,
                  lastName: action.payload.lastName,
                  email: action.payload.email,
                  password: action.payload.password
                }
              : item
          )
        ],
        isLoading: false,
        error: ''
      };
    case PUT_ADMIN_ERROR:
      return {
        ...state,
        list: [],
        isLoading: false,
        error: action.payload
      };
    case POST_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_ADMIN_SUCCESS:
      return {
        ...state,
        list: [...state.list],
        isLoading: false,
        error: ''
      };
    case POST_ADMIN_ERROR:
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
