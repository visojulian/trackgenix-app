import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './adminForm.module.css';
import { Button, Modal, Spinner, TextInput } from 'Components/Shared';
import { useSelector, useDispatch } from 'react-redux';
import { postAdmin, putAdmin } from 'redux/admins/thunks';
import { POST_ADMIN_SUCCESS, PUT_ADMIN_SUCCESS } from 'redux/admins/constants';
// import { joiResolver } from '@hookform/resolvers/joi';
// import { useForm } from 'react-hook-form';
// import { schema } from '../../../validations/admins';

const AdminForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const { list: admins, isLoading, error } = useSelector((state) => state.admins);
  const dispatch = useDispatch();

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
    if (error) {
      return (
        <div>
          <h4>Server error</h4>
          <p>{error}</p>
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
    try {
      if (id) {
        setEdit(true);
        const currentAdmin = admins.find((item) => item._id === id);
        setName(currentAdmin.name);
        setLastName(currentAdmin.lastName);
        setEmail(currentAdmin.email);
        setPassword(currentAdmin.password);
      } else {
        setEdit(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSubmit = async () => {
    if (!edit) {
      const reponse = await dispatch(postAdmin(name, lastName, email, password));
      if (reponse.type === POST_ADMIN_SUCCESS) {
        history.goBack();
      } else {
        setShowModal(true);
      }
    } else {
      const reponse = await dispatch(putAdmin(name, lastName, email, password, id));
      if (reponse.type === PUT_ADMIN_SUCCESS) {
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
      <div className={styles.container}>
        <h1>{error}</h1>
      </div>
    );
  }

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
