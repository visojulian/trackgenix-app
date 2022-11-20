import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postEmployee, putEmployee } from '../../../redux/employees/thunks';
import { POST_EMPLOYEE_SUCCESS, PUT_EMPLOYEE_SUCCESS } from '../../../redux/employees/constants';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import TextInput from '../../Shared/TextInput/index';
import Spinner from '../../Shared/Spinner/spinner';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { schema } from '../../../validations/employees';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
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
    resolver: joiResolver(schema)
  });

  const {
    list: employees,
    isLoading: loading,
    error: employeeError
  } = useSelector((state) => state.employees);

  const check =
    errors &&
    Object.keys(errors).length === 0 &&
    Object.getPrototypeOf(errors) === Object.prototype;

  useEffect(() => {
    if (employees.length > 0 && id) {
      const currentEmployee = employees.find((employee) => employee._id === id);
      setIsEditing(true);
      reset({
        name: currentEmployee.name,
        lastName: currentEmployee.lastName,
        phone: currentEmployee.phone,
        email: currentEmployee.email,
        password: currentEmployee.password
      });
    }
  }, [employees.length, id]);

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    if (
      getValues('name') &&
      getValues('lastName') &&
      getValues('phone') &&
      getValues('email') &&
      getValues('password') &&
      check
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
      check
    ) {
      return (
        <div>
          <h4>{isEditing ? 'Edit' : 'Add'} New Employee</h4>
          <p>
            Are you sure you want to {isEditing ? 'save' : 'add'} {getValues('name')}{' '}
            {getValues('lastName')} {isEditing ? 'changes' : ''}?
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
    if (!isEditing) {
      const res = await dispatch(postEmployee(data));
      if (res.type === POST_EMPLOYEE_SUCCESS) {
        history.goBack();
      } else {
        setShowModal(true);
      }
    } else {
      const res = await dispatch(putEmployee(data, id));
      if (res.type === PUT_EMPLOYEE_SUCCESS) {
        history.goBack();
      } else {
        setShowModal(true);
      }
    }
  };

  if (loading) {
    return <Spinner isLoading={loading} />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{isEditing ? 'Edit employee' : 'Add employee'}</h1>
      <form className={styles.form} onSubmit={onSubmit}>
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
          label="Last Name"
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Last Name"
          register={register}
          error={errors.lastName?.message}
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

export default Form;
