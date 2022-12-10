import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postAdmin, putAdmin } from 'redux/admins/thunks';
import { POST_ADMIN_SUCCESS, PUT_ADMIN_SUCCESS } from 'redux/admins/constants';
import { Button, Modal, Spinner, TextInput } from 'Components/Shared';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { schema, editSchema } from 'validations/admins';
import styles from './adminForm.module.css';

const AdminForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const { list: admins, isLoading, error } = useSelector((state) => state.admins);
  const dispatch = useDispatch();
  const currentAdmin = admins.find((item) => item._id === id);

  const {
    handleSubmit,
    register,
    getValues,
    reset,
    trigger,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(isEditing ? editSchema : schema)
  });

  useEffect(() => {
    if (id && currentAdmin) {
      setIsEditing(true);
      reset({
        name: currentAdmin.name,
        lastName: currentAdmin.lastName,
        email: currentAdmin.email,
        repeatEmail: currentAdmin.email
      });
    }
  }, [id, currentAdmin]);

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    trigger();
    if (
      getValues('name') &&
      getValues('lastName') &&
      getValues('email') &&
      getValues('repeatEmail') &&
      !Object.values(errors).length
    ) {
      setIsActionModal(true);
    }
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
          <h4>An error occurred</h4>
          <p>{error}</p>
        </div>
      );
    }
    if (
      getValues('name') &&
      getValues('lastName') &&
      getValues('email') &&
      getValues('password') &&
      !isEditing &&
      !Object.values(errors).length
    ) {
      return (
        <div>
          <h4>Add New Admin</h4>
          <p>
            Are you sure you want to add {getValues('name')} {getValues('lastName')} as Admin?
          </p>
        </div>
      );
    }
    if (
      getValues('name') &&
      getValues('lastName') &&
      getValues('email') &&
      isEditing &&
      !Object.values(errors).length
    ) {
      return (
        <div>
          <h4>Edit Admin</h4>
          <p>
            Are you sure you want to save {getValues('name')} {getValues('lastName')} changes?
          </p>
        </div>
      );
    }
    return (
      <div>
        <h4>Form fields have errors</h4>
        <p>Please make sure to amend all errors before submit.</p>
      </div>
    );
  };

  const onSubmit = async (data) => {
    const editData = {
      name: data.name,
      lastName: data.lastName,
      email: data.email
    };

    const createData = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    };
    if (!isEditing) {
      const response = await dispatch(postAdmin(createData));
      if (response.type === POST_ADMIN_SUCCESS) {
        history.goBack();
      } else {
        setIsActionModal(false);
        setShowModal(true);
      }
    } else {
      const response = await dispatch(putAdmin(editData, id));
      if (response.type === PUT_ADMIN_SUCCESS) {
        history.goBack();
      } else {
        setIsActionModal(false);
        setShowModal(true);
      }
    }
  };

  const showPassword = () => {
    setReveal(!reveal);
  };

  useEffect(() => {
    if (error) {
      setShowModal(true);
    }
  }, [error]);

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
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
        {!isEditing ? (
          <>
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
          </>
        ) : (
          ''
        )}
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
