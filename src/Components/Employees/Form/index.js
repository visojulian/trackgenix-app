import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postEmployee, putEmployee } from 'redux/employees/thunks';
import { POST_EMPLOYEE_SUCCESS, PUT_EMPLOYEE_SUCCESS } from 'redux/employees/constants';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { editSchema } from 'validations/employees';
import { Button, Modal, Spinner, TextInput } from 'Components/Shared';
import styles from './form.module.css';

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
    trigger,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(editSchema)
  });

  const {
    list: employees,
    isLoading: loading,
    error: employeeError
  } = useSelector((state) => state.employees);

  useEffect(() => {
    if (employees.length > 0 && id) {
      const currentEmployee = employees.find((employee) => employee._id === id);
      setIsEditing(true);
      reset({
        name: currentEmployee.name,
        lastName: currentEmployee.lastName,
        phone: currentEmployee.phone.toString(),
        email: currentEmployee.email,
        repeatEmail: currentEmployee.email
      });
    }
  }, [employees.length, id]);

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    trigger();
    if (
      getValues('name') &&
      getValues('lastName') &&
      getValues('phone') &&
      getValues('email') &&
      getValues('repeatEmail') &&
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
      getValues('repeatEmail') &&
      !Object.values(errors).length
    ) {
      return (
        <div>
          <h4>Edit Employee</h4>
          <p>
            Are you sure you want to edit {getValues('name')} {getValues('lastName')}?
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
    if (!isEditing) {
      const res = await dispatch(
        postEmployee(data.name, data.lastName, data.phone.toString(), data.email, data.password)
      );
      if (res.type === POST_EMPLOYEE_SUCCESS) {
        history.goBack();
      } else {
        setShowModal(true);
      }
    } else {
      const res = await dispatch(
        putEmployee(data.name, data.lastName, data.phone.toString(), data.email, id)
      );
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

export default Form;
