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
      method: 'DELETE',
      headers: {
        token: sessionStorage.getItem('token')
      }
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

export const putAdmin = (admin, adminId) => {
  return (dispatch) => {
    dispatch(putAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`, {
      method: 'PUT',
      headers: {
        token: sessionStorage.getItem('token'),
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(admin)
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

export const postAdmin = (admin) => {
  return (dispatch) => {
    dispatch(postAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/admins`, {
      method: 'POST',
      headers: {
        token: sessionStorage.getItem('token'),
        'Content-type': 'application/json'
      },
      body: JSON.stringify(admin)
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
