import { loginPending, loginError, logoutPending, logoutError } from './actions';

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../helpers/firebase';

export const login = (data) => {
  return async (dispatch) => {
    dispatch(loginPending());
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, data.email, data.password);

      const {
        token,
        claims: { role }
      } = await userCredentials.user.getIdTokenResult();

      sessionStorage.setItem(('token', token));
      return role;
    } catch (error) {
      return dispatch(loginError());
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutPending());
    return signOut(auth)
      .then(() => {
        sessionStorage.clear();
      })
      .catch((error) => {
        return dispatch(logoutError(error.toString()));
      });
  };
};