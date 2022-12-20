import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../Form/form.module.css';
import { Button, Modal, Spinner, TextInput } from 'Components/Shared';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { editSchema } from 'validations/super-admins';
import { PUT_SUPER_ADMIN_SUCCESS } from 'redux/superAdmins/constants';
import { putSuperAdmin } from 'redux/superAdmins/thunks';

const EditSuperAdmin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(editSchema)
  });

  const { user, isLoading: userIsLoading } = useSelector((state) => state.user);
  const id = user._id;

  const {
    list: superAdmins,
    isLoading: superAdminsIsLoading,
    error: superAdminsError
  } = useSelector((state) => state.superAdmins);

  useEffect(() => {
    if (superAdmins.length > 0 && id) {
      const currentSuperAdmins = superAdmins.find((superAdmin) => superAdmin._id === id);
      reset({
        name: currentSuperAdmins.name,
        lastName: currentSuperAdmins.lastName,
        email: currentSuperAdmins.email,
        repeatEmail: currentSuperAdmins.email
      });
    }
  }, [superAdmins.length, id]);

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    if (
      getValues('name') &&
      getValues('lastName') &&
      getValues('email') &&
      getValues('repeatEmail')
    ) {
      setIsActionModal(true);
    }
  };

  const getModalContent = () => {
    if (superAdminsError) {
      return (
        <div>
          <h4>An error occurred</h4>
          <p>{superAdminsError}</p>
        </div>
      );
    }
    if (
      getValues('name') &&
      getValues('lastName') &&
      getValues('email') &&
      getValues('repeatEmail')
    ) {
      return (
        <div>
          <h4>Edit User</h4>
          <p>
            Are you sure you want to edit {getValues('name')} {getValues('lastName')}?
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

  const onSubmit = async (data) => {
    const correctData = {
      name: data.name,
      lastName: data.lastName,
      email: data.email
    };
    const res = await dispatch(putSuperAdmin(correctData, id));
    if (res.type === PUT_SUPER_ADMIN_SUCCESS) {
      history.goBack();
    } else {
      setIsActionModal(false);
      setShowModal(true);
    }
  };

  if (superAdminsIsLoading || userIsLoading) {
    return <Spinner isLoading={true} />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit User</h1>
      <form className={styles.form} onSubmit={onSubmit}>
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

export default EditSuperAdmin;
