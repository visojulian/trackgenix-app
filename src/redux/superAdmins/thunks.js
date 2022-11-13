import {
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  getSuperAdminsError,
  deleteSuperAdminsPending,
  deleteSuperAdminsSuccess,
  deleteSuperAdminsError
} from './actions';

const getSuperAdmins = () => {
  return (dispatch) => {
    dispatch(getSuperAdminsPending());
    fetch(`${process.env.REACT_APP_API_URL}/super-admins`)
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

const deleteSuperAdmins = (superAdminId) => {
  return (dispatch) => {
    dispatch(deleteSuperAdminsPending());
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
        dispatch(deleteSuperAdminsSuccess(superAdminId));
      })
      .catch((error) => {
        dispatch(deleteSuperAdminsError(error.toString()));
      });
  };
};

export { getSuperAdmins, deleteSuperAdmins };
