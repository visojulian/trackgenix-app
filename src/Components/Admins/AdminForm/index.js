import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postAdmin, putAdmin } from '../../../redux/admins/thunks';
import { POST_ADMIN_SUCCESS, PUT_ADMIN_SUCCESS } from '../../../redux/admins/constants';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { schema } from '../../../validations/admins';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import styles from './adminForm.module.css';
import TextInput from '../../Shared/TextInput/index';
import Spinner from '../../Shared/Spinner/spinner';

const AdminForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const { list: admins, isLoading, error } = useSelector((state) => state.admins);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    getValues,
    reset,
    trigger,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    trigger();
    if (
      getValues('name') &&
      getValues('lastName') &&
      getValues('email') &&
      getValues('password') &&
      !Object.values(errors).length
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
      getValues('name') &&
      getValues('lastName') &&
      getValues('email') &&
      getValues('password') &&
      !Object.values(errors).length
    ) {
      return (
        <div>
          <h4>{isEditing ? 'Edit' : 'Add'} New Admin</h4>
          <p>
            Are you sure you want to {isEditing ? 'save' : 'add'} {getValues('name')}{' '}
            {getValues('lastName')} {isEditing ? 'changes' : 'as Admin'}?
          </p>
        </div>
      );
    }
    if (Object.values(errors).length) {
      return (
        <div>
          <h4>Form fields have errors</h4>
          <p>Please make sure to amend all errors before submit.</p>
        </div>
      );
    }
    return (
      <div>
        <h4>Form incomplete</h4>
        <p>Please make sure to fill all fields before submit.</p>
      </div>
    );
  };

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const currentAdmin = admins.find((item) => item._id === id);
      reset({
        name: currentAdmin.name,
        lastName: currentAdmin.lastName,
        email: currentAdmin.email,
        repeatEmail: currentAdmin.email,
        password: currentAdmin.password,
        repeatPassword: currentAdmin.password
      });
    }
  }, []);

  const onSubmit = async (data) => {
    if (!isEditing) {
      const reponse = await dispatch(
        postAdmin(data.name, data.lastName, data.email, data.password)
      );
      if (reponse.type === POST_ADMIN_SUCCESS) {
        history.goBack();
      } else {
        setShowModal(true);
      }
    } else {
      const reponse = await dispatch(
        putAdmin(data.name, data.lastName, data.email, data.password, id)
      );
      if (reponse.type === PUT_ADMIN_SUCCESS) {
        history.goBack();
      } else {
        setShowModal(true);
      }
    }
  };

  const showPassword = () => {
    setReveal(reveal ? false : true);
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
      <h1>{isEditing ? 'Edit Admin' : 'Create new Admin'}</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <TextInput
          label="Name"
          id="name"
          name="name"
          register={register}
          type="text"
          placeholder="Name"
          error={errors.name?.message}
        />
        <TextInput
          label="Last Name"
          id="lastName"
          name="lastName"
          register={register}
          type="text"
          placeholder="Last Name"
          error={errors.lastName?.message}
        />
        <TextInput
          label="Email"
          id="email"
          name="email"
          register={register}
          type="text"
          placeholder="Email"
          error={errors.email?.message}
        />
        <TextInput
          label="Repeat Email"
          id="repeatEmail"
          name="repeatEmail"
          register={register}
          type="text"
          placeholder="Repeat Email"
          error={errors.repeatEmail?.message}
        />
        <div className={styles.passwordDiv}>
          <TextInput
            label="Password"
            id="password"
            name="password"
            register={register}
            type={reveal ? 'text' : 'password'}
            placeholder="Password"
            error={errors.password?.message}
          />
          <div className={styles.revealButton}>
            <Button
              text={reveal ? 'Hide password' : 'Reveal password'}
              type="button"
              variant="secondary"
              onClick={showPassword}
            />
          </div>
        </div>
        <TextInput
          label="Repeat Password"
          id="repeatPassword"
          name="repeatPassword"
          register={register}
          type={reveal ? 'text' : 'password'}
          placeholder="Repeat Password"
          error={errors.repeatPassword?.message}
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
          <Button text="Reset fields" type="button" variant="secondary" onClick={() => reset()} />
          <Button text="Submit" type="submit" variant="primary" onClick={handleConfirmModal} />
        </div>
      </form>
      <Modal
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={isActionModal}
        action={handleSubmit(onSubmit)}
        actionButton="Submit"
      >
        {getModalContent()}
      </Modal>
    </div>
  );
};

export default AdminForm;
