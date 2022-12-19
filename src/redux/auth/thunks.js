import { loginPending, loginError, logoutPending, logoutError, setLoggedOut } from './actions';

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

      sessionStorage.setItem('token', token);
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
        sessionStorage.clear();
        dispatch(setLoggedOut());
      })
      .catch((error) => {
        return dispatch(logoutError(error.toString()));
      });
  };
};
