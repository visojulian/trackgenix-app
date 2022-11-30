import { getUserPending, getUserSuccess, getUserError } from './actions';

export const getUserProfile = () => {
  return (dispatch) => {
    dispatch(getUserPending());
    fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        token: sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(getUserSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(getUserError(err.toString()));
      });
  };
};
