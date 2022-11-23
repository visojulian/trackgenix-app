import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, postProject, putProject } from 'redux/projects/thunks';
import { POST_PROJECT_SUCCESS, PUT_PROJECT_SUCCESS } from 'redux/projects/constants';
import { getEmployees } from 'redux/employees/thunks';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { schema } from 'validations/projects';
import { Button, Modal, Select, Spinner, Table, TextInput } from 'Components/Shared';
import styles from './form.module.css';

const ProjectForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [projectEmployees, setProjectEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const roles = ['PM', 'QA', 'DEV', 'TL'];

  const isEditing = Boolean(id);
  const dispatch = useDispatch();

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

  const {
    list: projects,
    isLoading: projectsIsLoading,
    error: errorProjects
  } = useSelector((state) => state.projects);
  const {
    list: employees,
    isLoading: employeesIsLoading,
    error: errorEmployees
  } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getEmployees());
  }, []);

  useEffect(() => {
    if (projects.length > 0 && isEditing) {
      const currentProject = projects.find((project) => project._id === id);
      const employeeList = currentProject.employees.map((item) => {
        return {
          employee: item.employee,
          role: item.role,
          rate: item.rate
        };
      });
      setProjectEmployees(employeeList);
      reset({
        name: currentProject.name,
        description: currentProject.description,
        startDate: currentProject.startDate,
        endDate: currentProject.endDate,
        clientName: currentProject.clientName
      });
    }
  }, [id, isEditing, projects]);

  const newArr = () => {
    const headers = [];
    projectEmployees.map((employee) => {
      const selectedEmployee = employees.find((item) => item._id === employee.employee);
      if (selectedEmployee) {
        headers.push({
          name: selectedEmployee.name,
          role: employee.role,
          rate: employee.rate,
          _id: employee.employee
        });
      }
    });
    return headers;
  };

  const onRowClick = () => {};

  const addEmployee = (e) => {
    e.preventDefault();
    setProjectEmployees([
      ...projectEmployees,
      {
        employee: getValues('employee'),
        rate: getValues('rate'),
        role: getValues('role')
      }
    ]);
  };

  const handleDelete = (index) => {
    const newProjectEmployees = [...projectEmployees];
    newProjectEmployees.splice(index, 1);
    setProjectEmployees(newProjectEmployees);
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
    if (errorProjects || errorEmployees) {
      return (
        <div>
          <h4>Server error</h4>
          <p>{errorProjects || errorEmployees}</p>
        </div>
      );
    }
    if (!Object.values(errors).length) {
      return (
        <div>
          <h4>{isEditing ? 'Edit' : 'Add'} New Project</h4>
          <p>
            Are you sure you want to {isEditing ? 'save' : 'add'} {getValues('name')}{' '}
            {isEditing ? 'changes' : ''}?
          </p>
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

  const onSubmit = async () => {
    const body = {
      employees: projectEmployees,
      name: getValues('name'),
      description: getValues('description'),
      startDate: getValues('startDate'),
      endDate: getValues('endDate'),
      clientName: getValues('clientName')
    };
    if (!isEditing) {
      const result = await dispatch(postProject(body));
      if (result.type === POST_PROJECT_SUCCESS) {
        history.goBack();
      } else {
        setShowModal(true);
      }
    } else {
      const result = await dispatch(putProject(body, id));
      if (result.type === PUT_PROJECT_SUCCESS) {
        history.goBack();
      } else {
        setShowModal(true);
      }
    }
  };

  if (projectsIsLoading || employeesIsLoading) {
    return <Spinner isLoading={true} />;
  }
  return (
    <>
      <h1>{isEditing ? 'Edit' : 'Add'} Project</h1>
      <form className={styles.container}>
        <TextInput
          label="Project Name"
          id="name"
          name="name"
          type="text"
          placeholder="Project Name"
          register={register}
          error={errors.name?.message}
        />
        <TextInput
          label="Client Name"
          id="clientName"
          name="clientName"
          type="text"
          placeholder="Client Name"
          register={register}
          error={errors.clientName?.message}
        />
        <TextInput
          label="Description"
          id="description"
          name="description"
          type="text"
          placeholder="Description"
          register={register}
          error={errors.description?.message}
        />
        <TextInput
          label="Start date"
          id="startDate"
          name="startDate"
          type="date"
          placeholder="Start date"
          register={register}
          error={errors.startDate?.message}
        />
        <TextInput
          label="End date"
          id="endDate"
          name="endDate"
          type="date"
          placeholder="End date"
          register={register}
          error={errors.endDate?.message}
        />
        <div className={styles.listContainer}>
          <div>
            <h4>Employees</h4>
            <div>
              <div className={styles.newEmployeeInputs}>
                <Select
                  name="employee"
                  placeholder="Select an employee"
                  register={register}
                  error={errors.employee?.message}
                  data={employees.map((employee) => ({
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
                <Button text="Assign new employee" variant="secondary" onClick={addEmployee} />
              </div>
            </div>
            <Table
              className={styles.employeeList}
              data={newArr()}
              headers={['name', 'role', 'rate']}
              onDelete={handleDelete}
              onRowClick={onRowClick}
              values={['name', 'role', 'rate']}
            />
          </div>
          <Modal
            isOpen={showModal}
            handleClose={setShowModal}
            isActionModal={isActionModal}
            action={handleSubmit(onSubmit)}
            actionButton="Submit"
          >
            {getModalContent()}
          </Modal>
          <div className={styles.formButtons}>
            <Button
              text="Cancel"
              type="button"
              variant="secondary"
              onClick={() => {
                history.goBack();
              }}
            />
            <Button text="Reset fields" type="button" variant="secondary" onClick={() => reset()} />
            <Button text="Submit" variant="primary" onClick={handleConfirmModal} />
          </div>
        </div>
      </form>
    </>
  );
};

export default ProjectForm;
