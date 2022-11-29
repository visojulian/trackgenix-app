import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { loginSchema } from 'validations/login';
import { login } from 'redux/auth/thunks';
import { Button, Spinner, TextInput } from 'Components/Shared';
import { getEmployees } from 'redux/employees/thunks';
import { getAdmins } from 'redux/admins/thunks';
import { getSuperAdmins } from 'redux/superAdmins/thunks';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state) => state.auth.error);
  const [reveal, setReveal] = useState(false);
  const [entity, setEntity] = useState();
  const { list: employees, isLoading: employeesIsLoading } = useSelector(
    (state) => state.employees
  );
  const { list: superAdmins, isLoading: superAdminsIsLoading } = useSelector(
    (state) => state.superAdmins
  );
  const { list: admins, isLoading: adminsIsLoading } = useSelector((state) => state.admins);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(loginSchema),
    mode: 'onBlur'
  });
  const token = sessionStorage.getItem('token');
  const email = getValues('email');

  useEffect(() => {
    dispatch(getEmployees(token));
    dispatch(getAdmins(token));
    dispatch(getSuperAdmins(token));
  }, []);

  useEffect(() => {
    if (email) {
      if (employees) {
        if (employees.length > 0) {
          const currentEmployee = employees.find((employee) => employee.email === email);
          setEntity(currentEmployee);
          console.log(currentEmployee);
          console.log(currentEmployee.email === email);
        }
      }
      if (admins) {
        if (admins.length > 0) {
          const currentAdmin = admins.find((admin) => admin.email === email);
          setEntity(currentAdmin);
        }
      }
      if (superAdmins) {
        if (superAdmins.length > 0) {
          const currentSuperAdmin = superAdmins.find((superAdmin) => superAdmin.email === email);
          setEntity(currentSuperAdmin);
        }
      }
    }
  }, [email]);

  const onSubmit = (inputData) => {
    if (Object.values(errors).length === 0 && entity) {
      console.log(entity);
      dispatch(login(inputData)).then((data) => {
        switch (data) {
          case 'SUPER_ADMIN':
            history.push('/super-admin');
            break;
          case 'ADMIN':
            history.push('/admin');
            break;
          case 'EMPLOYEE':
            // history.push('/employee');
            history.push(`/employee/${entity._id}`);
            break;
          default:
            history.push('/');
            break;
        }
      });
    }
  };

  const revealFunc = () => {
    setReveal(reveal ? false : true);
  };

  if (adminsIsLoading || superAdminsIsLoading || employeesIsLoading) {
    return <Spinner isLoading={true} />;
  }

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
