import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  deleteAdminPending,
  deleteAdminSuccess,
  deleteAdminError,
  putAdminPending,
  putAdminSuccess,
  putAdminError,
  postAdminPending,
  postAdminSuccess,
  postAdminError
} from './actions';

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminsPending());
    fetch(`${process.env.REACT_APP_API_URL}/admins`, {
      headers: {
        token: sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(getAdminsSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(getAdminsError(err.toString()));
      });
  };
};

export const deleteAdmin = (adminId) => {
  return (dispatch) => {
    dispatch(deleteAdminPending());
    fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`, {
      method: 'DELETE'
    })
      .then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && (await response.json());
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          throw new Error(error);
        }
        dispatch(deleteAdminSuccess(adminId));
      })
      .catch((err) => {
        dispatch(deleteAdminError(err.toString()));
      });
  };
};

export const putAdmin = (name, lastName, email, password, adminId) => {
  return (dispatch) => {
    dispatch(putAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name: name, lastName: lastName, email: email, password: password })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          return dispatch(putAdminSuccess(response.data));
        }
      })
      .catch((err) => {
        return dispatch(putAdminError(err.toString()));
      });
  };
};

export const postAdmin = (name, lastName, email, password) => {
  return (dispatch) => {
    dispatch(postAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/admins`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name: name, lastName: lastName, email: email, password: password })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          return dispatch(postAdminSuccess(response.data));
        }
      })
      .catch((err) => {
        return dispatch(postAdminError(err.toString()));
      });
  };
};
