import React, { useEffect, useState } from 'react';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import { useHistory, useParams } from 'react-router-dom';
import styles from './adminForm.module.css';
import TextInput from '../../Shared/TextInput/index';
import { useSelector, useDispatch } from 'react-redux';
import { postAdmin, putAdmin } from '../../../redux/admins/thunks';
import { POST_ADMIN_SUCCESS, PUT_ADMIN_SUCCESS } from '../../../redux/admins/constants';
import Spinner from '../../Shared/Spinner/spinner';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { schema } from '../../../validations/admins';

const AdminForm = () => {
  const { id } = useParams();
  const history = useHistory();
  //const [name, setName] = useState('');
  //const [lastName, setLastName] = useState('');
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  const [edit, setEdit] = useState(false);
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
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  // const onChangeName = (e) => {
  //   setName(e.target.value);
  // };
  // const onChangeLastName = (e) => {
  //   setLastName(e.target.value);
  // };
  // const onChangeEmail = (e) => {
  //   setEmail(e.target.value);
  // };
  // const onChangePassword = (e) => {
  //   setPassword(e.target.value);
  // };

  const check =
    errors &&
    Object.keys(errors).length === 0 &&
    Object.getPrototypeOf(errors) === Object.prototype;

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    //if (name && lastName && email && password) {
    if (
      getValues('name') &&
      getValues('lastName') &&
      getValues('email') &&
      getValues('password') &&
      check
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
    //if (name && lastName && email && password) {
    if (
      getValues('name') &&
      getValues('lastName') &&
      getValues('email') &&
      getValues('password') &&
      check
    ) {
      return (
        <div>
          <h4>{edit ? 'Edit' : 'Add'} New Admin</h4>
          <p>
            Are you sure you want to {edit ? 'save' : 'add'} {getValues('name')}{' '}
            {getValues('lastName')} {edit ? 'changes' : 'as Admin'}?
          </p>
        </div>
      );
    }
    if (!check) {
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
        <p>Please complete all fields before submit.</p>
      </div>
    );
  };

  useEffect(async () => {
    try {
      if (id) {
        setEdit(true);
        const currentAdmin = admins.find((item) => item._id === id);
        // setName(currentAdmin.name);
        // setLastName(currentAdmin.lastName);
        // setEmail(currentAdmin.email);
        // setPassword(currentAdmin.password);
        reset({
          name: currentAdmin.name,
          lastName: currentAdmin.lastName,
          email: currentAdmin.email,
          repeatEmail: currentAdmin.email,
          password: currentAdmin.password,
          repeatPassword: currentAdmin.password
        });
      } else {
        setEdit(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    if (!edit) {
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

  const revealFunc = () => {
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
      <h1>{edit ? 'Edit Admin' : 'Create new Admin'}</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <TextInput
          label="Name"
          id="name"
          name="name"
          register={register}
          //value={name}
          //onChange={onChangeName}
          type="text"
          placeholder="Name"
          error={errors.name?.message}
        />
        <TextInput
          label="Last Name"
          id="lastName"
          name="lastName"
          register={register}
          //value={lastName}
          //onChange={onChangeLastName}
          type="text"
          placeholder="Last Name"
          error={errors.lastName?.message}
        />
        <TextInput
          label="Email"
          id="email"
          name="email"
          register={register}
          //value={email}
          //onChange={onChangeEmail}
          type="text"
          placeholder="Email"
          error={errors.email?.message}
        />
        <TextInput
          label="Repeat Email"
          id="repeatEmail"
          name="repeatEmail"
          register={register}
          //value={email}
          //onChange={onChangeEmail}
          type="text"
          placeholder="Repeat Email"
          error={errors.repeatEmail?.message}
        />
        <TextInput
          label="Password"
          id="password"
          name="password"
          register={register}
          //value={password}
          //onChange={onChangePassword}
          //type="password"
          type={reveal ? 'text' : 'password'}
          placeholder="Password"
          error={errors.password?.message}
        />
        <TextInput
          label="Repeat Password"
          id="repeatPassword"
          name="repeatPassword"
          register={register}
          //value={superAdmin.password}
          //onChange={onChange}
          //type="password"
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
          <Button
            text={reveal ? 'Hide' : 'Reveal'}
            type="button"
            variant="secondary"
            onClick={revealFunc}
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

export default AdminForm;
