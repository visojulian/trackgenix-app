import {
  getEmployeesPending,
  getEmployeesSuccess,
  getEmployeesError,
  deleteEmployeesPending,
  deleteEmployeesSuccess,
  deleteEmployeesError
} from './actions';

const getEmployees = () => {
  return (dispatch) => {
    dispatch(getEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(getEmployeesSuccess(response.data));
        }
      })
      .catch((error) => {
        dispatch(getEmployeesError(error.toString()));
      });
  };
};

const deleteEmployees = (employeeId) => {
  return (dispatch) => {
    dispatch(deleteEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees/${employeeId}`, {
      method: 'DELETE'
    })
      .then(async (response) => {
        const json = response.headers.get('content-type')?.includes('application/json');
        const data = json && (await response.json());
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          throw new Error(error);
        }
        dispatch(deleteEmployeesSuccess(employeeId));
      })
      .catch((error) => {
        dispatch(deleteEmployeesError(error.toString()));
      });
  };
};

export { getEmployees, deleteEmployees };
