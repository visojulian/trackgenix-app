import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Spinner, TextInput } from 'Components/Shared';
import styles from './form.module.css';
import { postSuperAdmin, putSuperAdmin } from 'redux/superAdmins/thunks';
import { POST_SUPER_ADMIN_SUCCESS, PUT_SUPER_ADMIN_SUCCESS } from 'redux/superAdmins/constants';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { editSchema, schema } from 'validations/super-admins';
import React, { useState, useEffect } from 'react';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { list: superAdmins, error, isLoading } = useSelector((state) => state.superAdmins);
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
  } = !isEditing
    ? useForm({
        mode: 'onChange',
        resolver: joiResolver(schema)
      })
    : useForm({
        mode: 'onChange',
        resolver: joiResolver(editSchema)
      });

  useEffect(async () => {
    try {
      if (id && foundSuperAdmin) {
        setIsEditing(true);
        reset({
          name: foundSuperAdmin.name,
          lastName: foundSuperAdmin.lastName,
          email: foundSuperAdmin.email,
          repeatEmail: foundSuperAdmin.email
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, foundSuperAdmin]);

  const handleConfirmModal = (e) => {
    e.preventDefault();
    trigger();
    setShowModal(true);
    setIsActionModal(false);
    if (isEditing) {
      if (
        getValues('name') &&
        getValues('lastName') &&
        getValues('email') &&
        getValues('repeatEmail') &&
        !Object.values(errors).length
      ) {
        setIsActionModal(true);
      }
    } else {
      if (
        getValues('name') &&
        getValues('lastName') &&
        getValues('email') &&
        getValues('repeatEmail') &&
        getValues('password') &&
        getValues('repeatPassword') &&
        !Object.values(errors).length
      ) {
        setIsActionModal(false);
      }
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
          <h4>Add New Super Admin</h4>
          <p>
            Are you sure you want to add {getValues('name')} {getValues('lastName')} as Super Admin?
          </p>
        </div>
      );
    }
    if (
      getValues('name') &&
      getValues('lastName') &&
      getValues('email') &&
      getValues('repeatEmail') &&
      isEditing &&
      !Object.values(errors).length
    ) {
      return (
        <div>
          <h4>Edit Super Admin</h4>
          <p>
            Are you sure you want to save {getValues('name')} {getValues('lastName')} changes?
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
    const createData = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    };
    const editData = {
      name: data.name,
      lastName: data.lastName,
      email: data.email
    };
    if (!isEditing) {
      const res = await dispatch(postSuperAdmin(createData));
      if (res.type === POST_SUPER_ADMIN_SUCCESS) {
        history.goBack();
      } else {
        setIsActionModal(false);
        setShowModal(true);
      }
    } else {
      const res = await dispatch(putSuperAdmin(editData, id));
      if (res.type === PUT_SUPER_ADMIN_SUCCESS) {
        history.goBack();
      } else {
        setIsActionModal(false);
        setShowModal(true);
      }
    }
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
      <h2>{isEditing ? 'Edit super admin' : 'Create super admin'}</h2>
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
        {!isEditing && (
          <>
            <div>
              <TextInput
                label="Password"
                id="password"
                name="password"
                register={register}
                type="password"
                placeholder="Password"
                error={errors.password?.message}
              />
            </div>
            <TextInput
              label="Repeat Password"
              id="repeatPassword"
              name="repeatPassword"
              register={register}
              type="password"
              placeholder="Repeat Password"
              error={errors.repeatPassword?.message}
            />
          </>
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
