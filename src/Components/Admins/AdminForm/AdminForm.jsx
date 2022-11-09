import React, { useEffect, useState } from 'react';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import { useHistory, useParams } from 'react-router-dom';
import styles from './adminForm.module.css';
import TextInput from '../../Shared/TextInput/index';

const AdminForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [adminId, setAdminId] = useState();
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [serverError, setServerError] = useState();

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    if (name && lastName && email && password) {
      setIsActionModal(true);
    }
  };

  const getModalContent = () => {
    if (serverError) {
      return (
        <div>
          <h4>Server error</h4>
          <p>{serverError}</p>
        </div>
      );
    }
    if (name && lastName && email && password) {
      return (
        <div>
          <h4>{edit ? 'Edit' : 'Add'} New Admin</h4>
          <p>
            Are you sure you want to {edit ? 'save' : 'add'} {name} {lastName}{' '}
            {edit ? 'changes' : 'as Admin'}?
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

  useEffect(async () => {
    if (id) {
      setAdminId(id);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'GET'
      });
      const data = await response.json();
      setEdit(true);
      setName(data.data.name);
      setLastName(data.data.lastName);
      setEmail(data.data.email);
      setPassword(data.data.password);
    } else {
      setEdit(false);
    }
  }, []);

  const onSubmit = async () => {
    if (!edit) {
      const newAdmin = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, lastName: lastName, email: email, password: password })
      });
      const content = await newAdmin.json();
      if (!content.error) {
        history.goBack();
      } else {
        setServerError(content.message);
        setShowModal(true);
      }
    } else {
      const editAdmin = await fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, lastName: lastName, email: email, password: password })
      });
      const content = await editAdmin.json();
      if (!content.error) {
        history.goBack();
      } else {
        setServerError(content.message);
        setShowModal(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>{edit ? 'Edit Admin' : 'Create new Admin'}</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <TextInput
          label="Name"
          id="name"
          name="name"
          value={name}
          onChange={onChangeName}
          type="text"
          placeholder="Name"
        />
        <TextInput
          label="Last Name"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={onChangeLastName}
          type="text"
          placeholder="Last Name"
        />
        <TextInput
          label="Email"
          id="email"
          name="email"
          value={email}
          onChange={onChangeEmail}
          type="text"
          placeholder="Email"
        />
        <TextInput
          label="Password"
          id="password"
          name="password"
          value={password}
          onChange={onChangePassword}
          type="text"
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

export default AdminForm;
