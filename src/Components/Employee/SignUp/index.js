import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postEmployee } from 'redux/employees/thunks';
import { POST_EMPLOYEE_SUCCESS } from 'redux/employees/constants';
import styles from 'Components/Employee/SignUp/sing-up.module.css';
import { Button, Modal, Spinner, TextInput } from 'Components/Shared';
// import { joiResolver } from '@hookform/resolvers/joi';
// import { useForm } from 'react-hook-form';
// import { schema } from '../validations/employees';

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [isOk, setIsOk] = useState(false);

  const { isLoading: loading, error: employeeError } = useSelector((state) => state.employees);

  const [employeeInput, setEmployeeInput] = useState({
    name: '',
    lastName: '',
    email: '',
    repeatEmail: '',
    repeatPassword: '',
    phone: ''
  });

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    if (
      employeeInput.name &&
      employeeInput.lastName &&
      employeeInput.phone &&
      employeeInput.email &&
      employeeInput.password &&
      isOk
    ) {
      setIsActionModal(true);
    }
  };

  const getModalContent = () => {
    if (employeeError) {
      return (
        <div>
          <h4>Server error</h4>
          <p>{employeeError}</p>
        </div>
      );
    }
    if (
      employeeInput.name &&
      employeeInput.lastName &&
      employeeInput.phone &&
      employeeInput.email &&
      employeeInput.password &&
      isOk
    ) {
      return (
        <div>
          <h4>Create a New Account</h4>
          <p>
            Are you sure you want to add {employeeInput.name} {employeeInput.lastName}?
          </p>
        </div>
      );
    }
    if (!isOk) {
      return (
        <div>
          <h4>Email or Password don`t match</h4>
          <p>Correct these fields before sending.</p>
        </div>
      );
    }
    return (
      <div>
        <h4>Form incomplete</h4>
        <p>Please complete all fields before submit.</p>
      </div>
    );
  };

  const onChange = (e) => {
    setEmployeeInput({ ...employeeInput, [e.target.name]: e.target.value });
    if (
      employeeInput.repeatEmail === employeeInput.email &&
      employeeInput.repeatPassword === employeeInput.password
    ) {
      setIsOk(true);
    } else {
      setIsOk(false);
    }
  };

  const onSubmit = async () => {
    if (isOk) {
      const res = await dispatch(postEmployee(employeeInput));
      if (res.type === POST_EMPLOYEE_SUCCESS) {
        history.goBack();
      } else {
        setShowModal(true);
      }
    }
  };

  if (loading) {
    return <Spinner isLoading={loading} />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create a New Account</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <div>
          <div>
            <TextInput
              label="Name"
              id="name"
              name="name"
              value={employeeInput.name}
              onChange={onChange}
              type="text"
              placeholder="Name"
            />
            <TextInput
              label="Last Name"
              id="lastName"
              name="lastName"
              value={employeeInput.lastName}
              onChange={onChange}
              type="text"
              placeholder="Last Name"
            />
            <TextInput
              label="Phone"
              id="phone"
              name="phone"
              value={employeeInput.phone}
              onChange={onChange}
              type="text"
              placeholder="Phone"
            />
          </div>
          <div>
            <TextInput
              label="Email"
              id="email"
              name="email"
              value={employeeInput.email}
              onChange={onChange}
              type="text"
              placeholder="Email"
            />
            <TextInput
              label="Repeat Email"
              id="repeatEmail"
              name="repeatEmail"
              value={employeeInput.repeatEmail}
              onChange={onChange}
              type="text"
              placeholder="Repeat Email"
            />
            <TextInput
              label="Password"
              id="password"
              name="password"
              value={employeeInput.password}
              onChange={onChange}
              type="password"
              placeholder="Password"
            />
            <TextInput
              label="Repeat Password"
              id="repeatPassword"
              name="repeatPassword"
              value={employeeInput.repeatPassword}
              onChange={onChange}
              type="password"
              placeholder="Repeat Password"
            />
          </div>
        </div>
        <div className={styles.butCont}>
          <Button
            text="Cancel"
            type="reset"
            variant="secondary"
            onClick={() => {
              history.goBack();
            }}
          />
          <Button text="Submit" type="submit" variant="primary" onClick={handleConfirmModal} />
        </div>
      </form>
      <Modal
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={isActionModal}
        action={onSubmit}
        actionButton="Submit"
      >
        {getModalContent()}
      </Modal>
    </div>
  );
};

export default SignUp;
