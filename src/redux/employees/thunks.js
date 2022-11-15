import { getEmployeesError, getEmployeesPending, getEmployeesSuccess } from './actions';

const getEmployees = () => {
  return (dispatch) => {
    dispatch(getEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.message);
        } else {
          dispatch(getEmployeesSuccess(res.data));
        }
      })
      .catch((err) => {
        dispatch(getEmployeesError(err.toString()));
      });
  };
};

export default getEmployees;
