import { getEmployeesPending, getEmployeesSuccess, getEmployeesError } from './actions';

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
      .catch((err) => {
        dispatch(getEmployeesError(err.toString()));
      });
  };
};

export default getEmployees;
