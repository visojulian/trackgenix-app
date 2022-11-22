import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Spinner, TextInput } from 'Components/Shared';
import { postSuperAdmin, putSuperAdmin } from '../../../redux/superAdmins/thunks';
import {
  POST_SUPER_ADMIN_SUCCESS,
  PUT_SUPER_ADMIN_SUCCESS
} from '../../../redux/superAdmins/constants';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { schema } from '../../../validations/super-admins';
import React, { useState, useEffect } from 'react';
import styles from './form.module.css';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { list: superAdmins, error, isLoading } = useSelector((state) => state.superAdmins);
  const [reveal, setReveal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);

  const foundSuperAdmin = superAdmins.find((superAdmin) => superAdmin._id === id);
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

  useEffect(async () => {
    try {
      if (id && foundSuperAdmin) {
        setIsEditing(true);
        reset({
          name: foundSuperAdmin.name,
          lastName: foundSuperAdmin.lastName,
          email: foundSuperAdmin.email,
          password: foundSuperAdmin.password,
          repeatPassword: foundSuperAdmin.password
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, foundSuperAdmin]);

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
          <h4>{isEditing ? 'Edit' : 'Add'} New Superadmin</h4>
          <p>
            Are you sure you want to {isEditing ? 'save' : 'add'} {getValues('name')}{' '}
            {getValues('lastName')} {isEditing ? 'changes' : 'as Superadmin'}?
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

  const onSubmit = async (data) => {
    if (!isEditing) {
      const res = await dispatch(postSuperAdmin(data));
      if (res.type === POST_SUPER_ADMIN_SUCCESS) {
        history.goBack();
      } else {
        setShowModal(true);
      }
    } else {
      const res = await dispatch(putSuperAdmin(data, id));
      if (res.type === PUT_SUPER_ADMIN_SUCCESS) {
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
      <h1>{isEditing ? 'Edit super admin' : 'Create super admin'}</h1>
      <form className={styles.form}>
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
              history.push('/super-admins');
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

export default Form;
