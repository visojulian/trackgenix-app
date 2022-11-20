import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postEmployee, putEmployee } from '../../../redux/employees/thunks';
import { POST_EMPLOYEE_SUCCESS, PUT_EMPLOYEE_SUCCESS } from '../../../redux/employees/constants';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import TextInput from '../../Shared/TextInput/index';
import Spinner from '../../Shared/Spinner';
// import { joiResolver } from '@hookform/resolvers/joi';
// import { useForm } from 'react-hook-form';
// import { schema } from '../../../validations/employees';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);

  const {
    list: employees,
    isLoading: loading,
    error: employeeError
  } = useSelector((state) => state.employees);

  const [employeeInput, setEmployeeInput] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });

  useEffect(() => {
    if (employees.length > 0 && id) {
      const currentEmployee = employees.find((employee) => employee._id === id);
      setIsEditing(true);
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
          <h4>{isEditing ? 'Edit' : 'Add'} New Employee</h4>
          <p>
            Are you sure you want to {isEditing ? 'save' : 'add'} {employeeInput.name}{' '}
            {employeeInput.lastName} {isEditing ? 'changes' : ''}?
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
    if (!isEditing) {
      const res = await dispatch(postEmployee(employeeInput));
      if (res.type === POST_EMPLOYEE_SUCCESS) {
        history.goBack();
      } else {
        setShowModal(true);
      }
    } else {
      const res = await dispatch(putEmployee(employeeInput, id));
      if (res.type === PUT_EMPLOYEE_SUCCESS) {
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
      <h1 className={styles.title}>{isEditing ? 'Edit employee' : 'Add employee'}</h1>
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

export default Form;
