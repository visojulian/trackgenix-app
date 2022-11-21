import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../../redux/employees/thunks';
import styles from './profile.module.css';
import { Button, Spinner } from 'Components/Shared';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
// import {} from '../../../redux/employees/constants';
// import { getProjects } from 'redux/projects/thunks';

const EmployeeProfile = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { list: employees, isLoading: employeeIsLoading } = useSelector((state) => state.employees);
  const [employeeInput, setEmployeeInput] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });
  const currentEmployee = employees.find((employee) => employee._id === id);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  useEffect(() => {
    if (currentEmployee && id) {
      setEmployeeInput({
        name: currentEmployee.name,
        lastName: currentEmployee.lastName,
        phone: currentEmployee.phone,
        email: currentEmployee.email,
        password: currentEmployee.password
      });
    }
  }, [currentEmployee, id]);

  if (employeeIsLoading) {
    return <Spinner isLoading={true} />;
  }

  const editAccount = (id) => {
    history.push(`/employees/edit-employee/${id}`);
  };

  return (
    <div className={styles.container}>
      <h1>Profile information</h1>
      <div className={styles.info}>
        <div className={styles.box1}>
          <div className={styles.fields}>
            <h4>Name</h4>
            <p>{employeeInput.name}</p>
          </div>
          <div className={styles.fields}>
            <h4>Last Name</h4>
            <p>{employeeInput.lastName}</p>
          </div>
        </div>
        <div className={styles.box2}>
          <div className={styles.fields}>
            <h4>Email</h4>
            <p>{employeeInput.email}</p>
          </div>
          <div className={styles.fields}>
            <h4>Phone</h4>
            <p>{employeeInput.phone}</p>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          text="Edit"
          type="submit"
          variant="primary"
          onClick={() => {
            editAccount(id);
          }}
        />
        <Button text="Delete" type="submit" variant="secondary" onClick={() => editAccount(id)} />
      </div>
    </div>
  );
};

export default EmployeeProfile;
