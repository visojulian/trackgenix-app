import { GET_USER_PENDING, GET_USER_SUCCESS, GET_USER_ERROR } from './constants';

const INITIAL_STATE = {
  user: null,
  isLoading: false,
  error: ''
};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        user: action.payload
      };
    case GET_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        user: {}
      };
    default:
      return state;
  }
};

export default reducer;
