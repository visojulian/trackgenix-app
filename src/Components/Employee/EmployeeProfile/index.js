import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, getEmployees } from 'redux/employees/thunks';
import styles from './profile.module.css';
import { Button, Modal, Spinner } from 'Components/Shared';

const EmployeeProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
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
    history.push(`profile/edit`);
  };

  const goBack = () => {
    history.push('/home');
  };

  return (
    <div className={styles.container}>
      <h2>Profile information</h2>
      <div className={styles.info}>
        <div className={styles.box1}>
          <div className={styles.fields}>
            <h5>Name</h5>
            <p>{employeeAccount.name}</p>
          </div>
          <div className={styles.fields}>
            <h5>Last Name</h5>
            <p>{employeeAccount.lastName}</p>
          </div>
        </div>
        <div className={styles.box2}>
          <div className={styles.fields}>
            <h5>Email</h5>
            <p>{employeeAccount.email}</p>
          </div>
          <div className={styles.fields}>
            <h5>Phone</h5>
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
          <h4>Delete account</h4>
          <p>Are you sure you want to delete your account?</p>
          <p>Changes cannot be undone.</p>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeProfile;
