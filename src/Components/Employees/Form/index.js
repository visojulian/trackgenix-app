import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import Modal from '../../Shared/Modal';

const Form = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [modalChildren, setModalChildren] = useState();
  const [employeeInput, setEmployeeInput] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });

  useEffect(async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
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
    if (
      employeeInput.name !== '' &&
      employeeInput.lastName !== '' &&
      employeeInput.email !== '' &&
      employeeInput.password !== ''
    ) {
      setIsActionModal(true);
      setModalChildren(
        <div>
          <h4>{isEditing ? 'Edit' : 'Add'} New Employee</h4>
          <p>
            Are you sure you want to {isEditing ? 'save' : 'add'} {employeeInput.name}{' '}
            {employeeInput.lastName} {isEditing ? 'changes' : ''}?
          </p>
        </div>
      );
    } else {
      setIsActionModal(false);
      setModalChildren(
        <div>
          <h4>Form incomplete</h4>
          <p>Please complete all fields before submit.</p>
        </div>
      );
    }
    setShowModal(true);
  };

  const handleErrorModal = (error) => {
    setIsActionModal(false);
    setModalChildren(
      <div>
        <h4>Server error</h4>
        <p>{error}</p>
      </div>
    );
    setShowModal(true);
  };

  const onSubmit = async () => {
    if (!isEditing) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: employeeInput.name,
          lastName: employeeInput.lastName,
          phone: employeeInput.phone,
          email: employeeInput.email,
          password: employeeInput.password
        })
      });

      const result = await response.json();
      if (!result.error) {
        window.location.assign('/employees');
      } else {
        handleErrorModal(result.message);
      }
    } else {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: employeeInput.name,
          lastName: employeeInput.lastName,
          phone: employeeInput.phone,
          email: employeeInput.email,
          password: employeeInput.password
        })
      });
      const result = await response.json();
      if (!result.error) {
        window.location.assign('/employees');
      } else {
        handleErrorModal(result.message);
      }
    }
  };

  const onChange = (e) => {
    setEmployeeInput({ ...employeeInput, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h3 className={styles.title}>{isEditing ? 'Edit employee' : 'Add employee'}</h3>
        <form className={styles.form}>
          <div className={styles.input}>
            <label>Name</label>
            <input type="text" name="name" value={employeeInput.name} onChange={onChange} />
          </div>
          <div className={styles.input}>
            <label>Last name</label>
            <input type="text" name="lastName" value={employeeInput.lastName} onChange={onChange} />
          </div>
          <div className={styles.input}>
            <label>Phone</label>
            <input type="text" name="phone" value={employeeInput.phone} onChange={onChange} />
          </div>
          <div className={styles.input}>
            <label>Email</label>
            <input type="text" name="email" value={employeeInput.email} onChange={onChange} />
          </div>
          <div className={styles.input}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={employeeInput.password}
              onChange={onChange}
            />
          </div>
          <div className={styles.divButton}>
            <button
              className={styles.firstButton}
              onClick={() => {
                window.location.assign('/employees');
              }}
              type="reset"
            >
              Cancel
            </button>
            <button className={styles.secondButton} onClick={handleConfirmModal}>
              Submit
            </button>
          </div>
        </form>
        <Modal
          isOpen={showModal}
          handleClose={setShowModal}
          isActionModal={isActionModal}
          action={onSubmit}
          actionButton="Submit"
        >
          {modalChildren}
        </Modal>
      </div>
    </div>
  );
};

export default Form;
