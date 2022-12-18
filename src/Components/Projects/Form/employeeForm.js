import React, { useEffect, useState } from 'react';
import styles from '../projects.module.css';
import { joiResolver } from '@hookform/resolvers/joi';
import { ButtonAdd, Modal, Select, TextInput } from 'Components/Shared';
import { schema } from 'validations/projectEmployees';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const employeeForm = (props) => {
  const { employees, setEmployees, selectedEmployee } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const { list: employeesList } = useSelector((state) => state.employees);
  const roles = ['PM', 'QA', 'DEV', 'TL'];
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    reset,
    trigger,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    if (selectedEmployee) {
      setIsEditing(true);
      setValue('employee', selectedEmployee._id);
      setValue('role', selectedEmployee.role);
      setValue('rate', selectedEmployee.rate.toString());
    }
  }, [selectedEmployee]);

  const addEmployee = () => {
    const addedEmployee = {
      employee: getValues('employee'),
      rate: getValues('rate'),
      role: getValues('role')
    };
    if (!isEditing) {
      setEmployees([...employees, addedEmployee]);
    } else {
      const employeesFiltered = employees.filter(
        (employee) => employee.employee !== selectedEmployee._id
      );
      setEmployees([...employeesFiltered, addedEmployee]);
    }
  };

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    trigger();
    if (!Object.values(errors).length) {
      setIsActionModal(true);
    } else {
      setIsActionModal(false);
    }
  };

  const getModalContent = () => {
    if (!Object.values(errors).length) {
      return (
        <div>
          <h4>{isEditing ? 'Edit' : 'Add'} employee in this project</h4>
          <p>Are you sure you want to save changes in this project?</p>
        </div>
      );
    }
    return (
      <div>
        <h4>Form fields have errors</h4>
        <p>Please make sure to amend all errors before submit.</p>
      </div>
    );
  };
  return (
    <div>
      <div className={styles.newEmployeeInputs}>
        {isEditing && (
          <div className={styles.editingEmployee}>
            <h5>You are editing employee: {selectedEmployee.name}</h5>
            <button
              className={styles.button}
              onClick={() => {
                setIsEditing(false);
                reset({
                  employee: '',
                  rate: '',
                  role: ''
                });
              }}
            >
              x
            </button>
          </div>
        )}
        <Select
          name="employee"
          placeholder="Select an employee"
          register={register}
          error={errors.employee?.message}
          data={employeesList.map((employee) => ({
            id: employee._id,
            value: employee.name
          }))}
        />
        <Select
          name="role"
          placeholder="Select Role"
          register={register}
          error={errors.role?.message}
          data={roles.map((role) => ({
            value: role
          }))}
        />
        <TextInput
          id="rate"
          name="rate"
          register={register}
          error={errors.rate?.message}
          type="text"
          placeholder="Rate"
        />
      </div>
      <div className={styles.buttonAssign}>
        <ButtonAdd
          text={isEditing ? 'Save changes' : 'Assign new employee'}
          variant="main"
          onClick={handleConfirmModal}
        />
      </div>
      <Modal
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={isActionModal}
        action={handleSubmit(addEmployee)}
        actionButton="Submit"
      >
        {getModalContent()}
      </Modal>
    </div>
  );
};

export default employeeForm;
