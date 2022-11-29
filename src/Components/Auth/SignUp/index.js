import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postEmployee } from 'redux/employees/thunks';
import { POST_EMPLOYEE_SUCCESS } from 'redux/employees/constants';
import styles from 'Components/Employee/SignUp/sing-up.module.css';
import { Button, Modal, Spinner, TextInput } from 'Components/Shared';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { schema } from 'validations/employees';

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const { isLoading: loading, error: employeeError } = useSelector((state) => state.employees);
  const [reveal, setReveal] = useState(false);

  const {
    handleSubmit,
    register,
    getValues,
    trigger,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    trigger();
    if (
      getValues('name') &&
      getValues('lastName') &&
      getValues('phone') &&
      getValues('email') &&
      getValues('password') &&
      !Object.values(errors).length
    ) {
      setIsActionModal(true);
    }
  };

  const getModalContent = () => {
    if (employeeError) {
      return (
        <div>
          <h4>Server error</h4>
          <p>{employeeError}</p>
        </div>
      );
    }
    if (
      getValues('name') &&
      getValues('lastName') &&
      getValues('phone') &&
      getValues('email') &&
      getValues('password') &&
      !Object.values(errors).length
    ) {
      return (
        <div>
          <h4>Create a New Account</h4>
          <p>
            Are you sure you want to add {getValues('name')} {getValues('lastName')}?
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
        <p>Please complete all fields before submit.</p>
      </div>
    );
  };

  const onSubmit = async (data) => {
    const res = await dispatch(
      postEmployee(data.name, data.lastName, data.phone, data.email, data.password)
    );
    if (res.type === POST_EMPLOYEE_SUCCESS) {
      history.goBack();
    } else {
      setShowModal(true);
    }
  };

  const revealFunc = () => {
    setReveal(reveal ? false : true);
  };

  if (loading) {
    return <Spinner isLoading={loading} />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create a New Account</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <div>
          <div>
            <TextInput
              label="Name"
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              register={register}
              error={errors.name?.message}
            />
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
          </div>
          <div>
            <TextInput
              label="Last Name"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              register={register}
              error={errors.lastName?.message}
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
            <TextInput
              label="Repeat Password"
              id="repeatPassword"
              name="repeatPassword"
              register={register}
              type={reveal ? 'text' : 'password'}
              placeholder="Repeat Password"
              error={errors.repeatPassword?.message}
            />
            <TextInput
              label="Phone"
              id="phone"
              name="phone"
              type="text"
              placeholder="Phone"
              register={register}
              error={errors.phone?.message}
            />
          </div>
        </div>
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
            text={reveal ? 'Hide password' : 'Reveal password'}
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

export default SignUp;
