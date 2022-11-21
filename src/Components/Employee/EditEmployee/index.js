import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { putEmployee, getEmployees } from '../../../redux/employees/thunks';
import { PUT_EMPLOYEE_SUCCESS } from '../../../redux/employees/constants';
import styles from './employee.module.css';
import { Button, Modal, Spinner, TextInput } from 'Components/Shared';
// import { joiResolver } from '@hookform/resolvers/joi';
// import { useForm } from 'react-hook-form';
// import { schema } from '../../../validations/employees';

const EditEmployee = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [employeeInput, setEmployeeInput] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });

  const {
    list: employees,
    isLoading: employeeIsLoading,
    error: employeeError
  } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  useEffect(() => {
    if (employees.length > 0 && id) {
      const currentEmployee = employees.find((employee) => employee._id === id);
      setEmployeeInput({
        name: currentEmployee.name,
        lastName: currentEmployee.lastName,
        phone: currentEmployee.phone,
        email: currentEmployee.email,
        password: currentEmployee.password
      });
    }
  }, [employees.length, id]);

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    if (
      employeeInput.name &&
      employeeInput.lastName &&
      employeeInput.phone &&
      employeeInput.email &&
      employeeInput.password
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
      employeeInput.password
    ) {
      return (
        <div>
          <h4>Edit Employee</h4>
          <p>
            Are you sure you want to edit {employeeInput.name} {employeeInput.lastName}?
          </p>
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
  };

  const onSubmit = async () => {
    const res = await dispatch(putEmployee(employeeInput, id));
    if (res.type === PUT_EMPLOYEE_SUCCESS) {
      history.push(`/employees/employee-profile/${id}`);
    } else {
      setShowModal(true);
    }
  };

  if (employeeIsLoading) {
    return <Spinner isLoading={true} />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit employee</h1>
      <form className={styles.form} onSubmit={onSubmit}>
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
          label="Password"
          id="password"
          name="password"
          value={employeeInput.password}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
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

export default EditEmployee;
