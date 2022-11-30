import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, getEmployees } from 'redux/employees/thunks';
import styles from './profile.module.css';
import { Button, Modal, Spinner } from 'Components/Shared';
import { logout } from '../../../redux/auth/thunks';
import { getUserProfile } from 'redux/user/thunks';

const EmployeeProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutUser = () => dispatch(logout());
  const [showModal, setShowModal] = useState(false);
  const [employeeId, setEmployeeId] = useState();
  const { list: employees, isLoading: employeeIsLoading } = useSelector((state) => state.employees);
  const { user, isLoading: userIsLoading } = useSelector((state) => state.user);
  const [employeeAccount, setEmployeeAccount] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });
  const currentEmployee = employees.find((employee) => employee._id === user._id);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getEmployees());
  }, []);

  useEffect(() => {
    if (currentEmployee && user) {
      setEmployeeId(user._id);
      setEmployeeAccount({
        name: currentEmployee.name,
        lastName: currentEmployee.lastName,
        phone: currentEmployee.phone,
        email: currentEmployee.email,
        password: currentEmployee.password
      });
    }
  }, [currentEmployee, user]);

  if (employeeIsLoading || userIsLoading) {
    return <Spinner isLoading={true} />;
  }

  const editAccount = () => {
    history.push(`/employee/edit-profile`);
  };

  const goBack = () => {
    history.push('/home');
  };

  return (
    <div className={styles.container}>
      <div className={styles.logout}>
        <Button variant="secondary" text="Logout" onClick={logoutUser} />
      </div>
      <h1>Profile information</h1>
      <div className={styles.info}>
        <div className={styles.box1}>
          <div className={styles.fields}>
            <h4>Name</h4>
            <p>{employeeAccount.name}</p>
          </div>
          <div className={styles.fields}>
            <h4>Last Name</h4>
            <p>{employeeAccount.lastName}</p>
          </div>
        </div>
        <div className={styles.box2}>
          <div className={styles.fields}>
            <h4>Email</h4>
            <p>{employeeAccount.email}</p>
          </div>
          <div className={styles.fields}>
            <h4>Phone</h4>
            <p>{employeeAccount.phone}</p>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          text="Edit"
          type="submit"
          variant="primary"
          onClick={() => {
            editAccount();
          }}
        />
        <Button
          text="Delete"
          type="submit"
          variant="secondary"
          onClick={() => setShowModal(true)}
        />
      </div>
      <Modal
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={true}
        action={() => {
          employeeId && dispatch(deleteEmployee(employeeId));
          goBack();
        }}
        actionButton="Delete"
      >
        <div>
          <h4>Delete employee</h4>
          <p>Are you sure you want to delete this employee?</p>
          <p>Changes cannot be undone.</p>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeProfile;
