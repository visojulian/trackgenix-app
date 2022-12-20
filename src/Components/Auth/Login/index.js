import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { loginSchema } from 'validations/login';
import { login } from 'redux/auth/thunks';
import { ButtonAdd, Modal, TextInput } from 'Components/Shared';
import styles from './login.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state) => state.auth.error);
  const [errorMessage, setErrorMessage] = useState();
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(loginSchema),
    mode: 'onBlur'
  });

  const onSubmit = (inputData) => {
    dispatch(login(inputData)).then((data) => {
      switch (data) {
        case 'SUPER_ADMIN':
          history.push('/super-admin');
          break;
        case 'ADMIN':
          history.push('/admin');
          break;
        case 'EMPLOYEE':
          history.push(`/employee`);
          break;
        default:
          history.push('/auth/login');
          break;
      }
    });
  };

  useEffect(() => {
    if (error && getValues('email') && getValues('password')) {
      setShowModal(true);
      if (error === 'auth/user-not-found') {
        setErrorMessage('The entered email is not registered');
      } else if (error === 'auth/wrong-password') {
        setErrorMessage('The entered password is incorrect');
      } else if (error === 'auth/too-many-requests') {
        setErrorMessage('Too many failed attempts. He tries again later');
      } else {
        setErrorMessage('An error has occurred. Please try again');
      }
    }
  }, [error]);
  console.log(error, getValues('email'), getValues('password'));
  return (
    <div>
      <Modal isOpen={showModal} handleClose={setShowModal} isActionModal={false}>
        <div className={styles.container}>{errorMessage}</div>
      </Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Email"
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          register={register}
          error={errors.email?.message}
        />
        <TextInput
          label="Password"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          register={register}
          error={errors.password?.message}
        />
        <div className={styles.butCont}>
          <ButtonAdd
            text="Cancel"
            type="reset"
            variant="second"
            onClick={() => {
              history.push('/home');
            }}
          />
          <ButtonAdd text="Sign In" type="submit" variant="main" />
        </div>
      </form>
    </div>
  );
};

export default Login;
