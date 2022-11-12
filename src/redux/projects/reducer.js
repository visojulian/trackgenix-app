import { GET_ENTITY_PENDING, GET_ENTITY_SUCCESS, GET_ENTITY_REJECTED } from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ENTITY_PENDING: {
      console.log(action);
      console.log('Get pending');
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_ENTITY_SUCCESS: {
      console.log(action);
      console.log('Get pending');
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    }
    case GET_ENTITY_REJECTED: {
      console.log(action);
      console.log('Get pending');
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
