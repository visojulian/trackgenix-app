import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { loginSchema } from 'validations/login';
import { login } from 'redux/auth/thunks';
import { Button, Modal, TextInput } from 'Components/Shared';
import styles from 'Components/Employee/SignUp/sing-up.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state) => state.auth.error);
  const [reveal, setReveal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
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

  const revealFunc = () => {
    setReveal(reveal ? false : true);
  };

  useEffect(() => {
    if (error) {
      setShowModal(true);
    }
  }, [error]);

  return (
    <div>
      <Modal isOpen={showModal} handleClose={setShowModal} isActionModal={false}>
        <div className={styles.container}>{error}</div>
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
          type={reveal ? 'text' : 'password'}
          placeholder="Password"
          register={register}
          error={errors.password?.message}
        />
        <Button
          text={reveal ? 'Hide password' : 'Reveal password'}
          type="button"
          variant="secondary"
          onClick={revealFunc}
        />
        <Button text="Sign In" type="submit" variant="primary" />
      </form>
    </div>
  );
};

export default Login;
