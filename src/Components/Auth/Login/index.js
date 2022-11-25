import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { loginSchema } from 'validations/login';
import { login } from 'redux/login/thunks';
import { LOGIN_SUCCESS } from 'redux/login/constants';
import { Button, TextInput } from 'Components/Shared';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state) => state.auth.error);
  const [reveal, setReveal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(loginSchema),
    mode: 'onBlur'
  });

  const onSubmit = (data) => {
    if (Object.values(errors).length === 0) {
      dispatch(login(data)).then((data) => {
        if (data.type === LOGIN_SUCCESS) {
          if (data.payload.role === 'SUPER_ADMIN') {
            history.push('/super-admin');
          } else if (data.payload.role === 'ADMIN') {
            history.push('/admin');
          } else {
            history.push('/employee');
          }
        }
      });
    }
  };

  const revealFunc = () => {
    setReveal(reveal ? false : true);
  };

  return (
    <div>
      {error && <div>{error}</div>}
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
