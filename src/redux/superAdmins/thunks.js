import {
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  getSuperAdminsError,
  deleteSuperAdminPending,
  deleteSuperAdminSuccess,
  deleteSuperAdminError,
  postSuperAdminPending,
  postSuperAdminSuccess,
  postSuperAdminError,
  putSuperAdminPending,
  putSuperAdminSuccess,
  putSuperAdminError
} from './actions';

const getSuperAdmins = (token) => {
  return (dispatch) => {
    dispatch(getSuperAdminsPending());
    fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
      headers: {
        token
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(getSuperAdminsSuccess(response.data));
        }
      })
      .catch((error) => {
        dispatch(getSuperAdminsError(error.toString()));
      });
  };
};

const deleteSuperAdmin = (superAdminId) => {
  return (dispatch) => {
    dispatch(deleteSuperAdminPending());
    fetch(`${process.env.REACT_APP_API_URL}/super-admins/${superAdminId}`, {
      method: 'DELETE'
    })
      .then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && (await response.json());
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          throw new Error(error);
        }
        dispatch(deleteSuperAdminSuccess(superAdminId));
      })
      .catch((error) => {
        dispatch(deleteSuperAdminError(error.toString()));
      });
  };
};

const postSuperAdmin = (superAdmin) => {
  return (dispatch) => {
    dispatch(postSuperAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(superAdmin)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          return dispatch(postSuperAdminSuccess(superAdmin));
        }
      })
      .catch((error) => {
        return dispatch(postSuperAdminError(error.toString()));
      });
  };
};

const putSuperAdmin = (superAdmin, superAdminId) => {
  return (dispatch) => {
    dispatch(putSuperAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/super-admins/${superAdminId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(superAdmin)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          return dispatch(putSuperAdminSuccess(superAdmin));
        }
      })
      .catch((error) => {
        return dispatch(putSuperAdminError(error.toString()));
      });
  };
};
export { getSuperAdmins, deleteSuperAdmin, postSuperAdmin, putSuperAdmin };
