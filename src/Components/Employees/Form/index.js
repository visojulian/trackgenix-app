import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postEmployee, putEmployee } from '../../../redux/employees/thunks';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import TextInput from '../../Shared/TextInput/index';
import Spinner from '../../Shared/Spinner/spinner';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.employees);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [employeeInput, setEmployeeInput] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });

  useEffect(async () => {
    try {
      if (id) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
          method: 'GET'
        });
        const data = await response.json();
        setIsEditing(true);
        setEmployeeInput({
          name: data.data.name,
          lastName: data.data.lastName,
          phone: data.data.phone,
          email: data.data.email,
          password: data.data.password
        });
      }
    } catch (error) {
      alert(error);
    }
  }, []);

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    if (
      employeeInput.name !== '' &&
      employeeInput.lastName !== '' &&
      employeeInput.email !== '' &&
      employeeInput.password !== ''
    ) {
      setIsActionModal(true);
    }
  };

  const getModalContent = () => {
    if (error) {
      return (
        <div>
          <h4>Server error</h4>
          <p>{error}</p>
        </div>
      );
    }
    if (
      employeeInput.name !== '' &&
      employeeInput.lastName !== '' &&
      employeeInput.email !== '' &&
      employeeInput.password !== ''
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
      dispatch(postEmployee(employeeInput));
      if (!error) {
        history.goBack();
      } else {
        setShowModal(true);
      }
    } else {
      dispatch(putEmployee(employeeInput, id));
      if (!error) {
        history.goBack();
      } else {
        setShowModal(true);
      }
    }
  };

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  if (error) {
    return (
      <div className={styles.errorDiv}>
        <h4>There was an error!</h4>
        <p>{error}</p>
      </div>
    );
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
