import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './form.module.css';
import Table from '../../Shared/Table';
import Modal from '../../Shared/Modal';
import Button from '../../Shared/Button';
import Select from '../../Shared/Select';
import TextInput from '../../Shared/TextInput/index';
import Spinner from '../../Shared/Spinner/spinner';
import { getProjects, postProject, putProject } from '../../../redux/projects/thunks';
import { POST_PROJECT_SUCCESS, PUT_PROJECT_SUCCESS } from '../../../redux/projects/constants';
import { getEmployees } from '../../../redux/employees/thunks';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { schema } from '../../../validations/projects';

const ProjectForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [projectEmployees, setProjectEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState();
  // const [nameValue, setNameValue] = useState();
  // const [descriptionValue, setDescriptionValue] = useState();
  // const [clientValue, setClientValue] = useState();
  // const [startDateValue, setStartDateValue] = useState();
  // const [endDateValue, setEndDateValue] = useState();
  const [roleValue, setRoleValue] = useState();
  const [rateValue, setRateValue] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const roles = ['PM', 'QA', 'DEV', 'TL'];

  const isEditing = Boolean(id);
  const dispatch = useDispatch();

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
      reset({
        name: currentProject.name,
        description: currentProject.description,
        startDate: currentProject.startDate,
        endDate: currentProject.endDate,
        clientName: currentProject.clientName,
        setProjectEmployees: employeeList
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

  // const onChangeNameInput = (event) => {
  //   setNameValue(event.target.value);
  // };
  // const onChangeDescriptionInput = (event) => {
  //   setDescriptionValue(event.target.value);
  // };
  // const onChangeClientInput = (event) => {
  //   setClientValue(event.target.value);
  // };
  // const onChangeStartDateInput = (event) => {
  //   setStartDateValue(event.target.value);
  // };
  // const onChangeEndDateInput = (event) => {
  //   setEndDateValue(event.target.value);
  // };
  const onChangeRateInput = (event) => {
    setRateValue(event.target.value);
  };
  const handleRoleChange = (event) => {
    setRoleValue(event.target.value);
  };
  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const addEmployee = (e) => {
    e.preventDefault();
    setProjectEmployees([
      ...projectEmployees,
      {
        employee: selectedEmployee,
        rate: rateValue,
        role: roleValue
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
                  name="employees"
                  placeholder="Select an employee"
                  required
                  onSelect={handleEmployeeChange}
                  data={employees.map((employee) => ({
                    id: employee._id,
                    value: employee.name
                  }))}
                />
                <Select
                  name="role"
                  placeholder="Select Role"
                  required
                  onSelect={handleRoleChange}
                  data={roles.map((role) => ({
                    value: role
                  }))}
                />
                <input
                  id="rate"
                  name="rate"
                  value={rateValue}
                  onChange={onChangeRateInput}
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
