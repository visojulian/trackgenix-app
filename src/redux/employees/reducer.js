import { GET_EMPLOYEES_PENDING, GET_EMPLOYEES_SUCCESS, GET_EMPLOYEES_ERROR } from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_PENDING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_EMPLOYEES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        list: action.payload,
        error: ''
      };
    }
    case GET_EMPLOYEES_ERROR: {
      return {
        ...state,
        isLoading: false,
        list: [],
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default reducer;
