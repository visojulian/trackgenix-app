import styles from './form.module.css';
import React, { useState, useEffect } from 'react';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import TextInput from '../../Shared/TextInput/index';
import Spinner from '../../Shared/Spinner';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postSuperAdmin, putSuperAdmin } from '../../../redux/superAdmins/thunks';
import {
  POST_SUPER_ADMIN_SUCCESS,
  PUT_SUPER_ADMIN_SUCCESS
} from '../../../redux/superAdmins/constants';
// import { joiResolver } from '@hookform/resolvers/joi';
// import { useForm } from 'react-hook-form';
// import { schema } from '../../../validations/super-admins';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { list: superAdmins, error, isLoading } = useSelector((state) => state.superAdmins);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [superAdmin, setSuperAdmin] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  const foundSuperAdmin = superAdmins.find((superAdmin) => superAdmin._id === id);

  useEffect(async () => {
    try {
      if (id && foundSuperAdmin) {
        setIsEditing(true);
        setSuperAdmin({
          name: foundSuperAdmin.name,
          lastName: foundSuperAdmin.lastName,
          email: foundSuperAdmin.email,
          password: foundSuperAdmin.password
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, foundSuperAdmin]);

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    if (superAdmin.name && superAdmin.lastName && superAdmin.email && superAdmin.password) {
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
    if (superAdmin.name && superAdmin.lastName && superAdmin.email && superAdmin.password) {
      return (
        <div>
          <h4>{isEditing ? 'Edit' : 'Add'} New Superadmin</h4>
          <p>
            Are you sure you want to {isEditing ? 'save' : 'add'} {superAdmin.name}{' '}
            {superAdmin.lastName} {isEditing ? 'changes' : 'as Superadmin'}?
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
    setSuperAdmin({ ...superAdmin, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (!isEditing) {
      const res = await dispatch(postSuperAdmin(superAdmin));
      if (res.type === POST_SUPER_ADMIN_SUCCESS) {
        history.goBack();
      } else {
        setShowModal(true);
      }
    } else {
      const res = await dispatch(putSuperAdmin(superAdmin, id));
      if (res.type === PUT_SUPER_ADMIN_SUCCESS) {
        history.goBack();
      } else {
        setShowModal(true);
      }
    }
  };

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  return (
    <div className={styles.container}>
      <h1>{isEditing ? 'Edit super admin' : 'Create super admin'}</h1>
      <form className={styles.form}>
        <TextInput
          label="Name"
          id="name"
          name="name"
          value={superAdmin.name}
          onChange={onChange}
          type="text"
          placeholder="Name"
        />
        <TextInput
          label="Last Name"
          id="lastName"
          name="lastName"
          value={superAdmin.lastName}
          onChange={onChange}
          type="text"
          placeholder="Last Name"
        />
        <TextInput
          label="Email"
          id="email"
          name="email"
          value={superAdmin.email}
          onChange={onChange}
          type="text"
          placeholder="Email"
        />
        <TextInput
          label="Password"
          id="password"
          name="password"
          value={superAdmin.password}
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
              history.push('/super-admins');
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
