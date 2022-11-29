import {
  loginPending,
  loginError,
  logoutPending,
  logoutError,
  setLoggedIn,
  setLoggedOut
} from './actions';

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../helpers/firebase';

export const login = (data) => {
  return async (dispatch) => {
    dispatch(loginPending());
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, data.email, data.password);

      const {
        token,
        claims: { role, email }
      } = await userCredentials.user.getIdTokenResult();

      sessionStorage.setItem('token', token);
      dispatch(setLoggedIn(email, role));
      return role;
    } catch (error) {
      return dispatch(loginError(error.toString()));
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutPending());
    return signOut(auth)
      .then(() => {
        dispatch(setLoggedOut());
      })
      .then(() => {
        sessionStorage.clear();
      })
      .catch((error) => {
        return dispatch(logoutError(error.toString()));
      });
  };
};
