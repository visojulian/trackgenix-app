import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { loginSchema } from 'validations/login';
import { login } from 'redux/auth/thunks';
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
  // const token = sessionStorage.getItem('token');

  // useEffect(() => {
  //   dispatch(getEmployees(token));
  //   dispatch(getAdmins(token));
  //   dispatch(getSuperAdmins(token));
  // }, []);

  // useEffect(() => {
  //   if (email) {
  //     if (employees?.length > 0) {
  //       const currentEmployee = employees.find((employee) => employee.email === email);
  //       setEntity(currentEmployee);
  //     }
  //     if (admins?.length > 0) {
  //       const currentAdmin = admins.find((admin) => admin.email === email);
  //       setEntity(currentAdmin);
  //     }
  //     if (superAdmins?.length > 0) {
  //       const currentSuperAdmin = superAdmins.find((superAdmin) => superAdmin.email === email);
  //       setEntity(currentSuperAdmin);
  //     }
  //   }
  // }, [email]);

  const onSubmit = (inputData) => {
    dispatch(login(inputData)).then((data) => {
      console.log(data);
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
          history.push('/');
          break;
      }
    });
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
