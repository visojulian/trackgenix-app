import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './form.module.css';
import { addTimesheet, editTimesheet, getTimesheets } from 'redux/timeSheets/thunks';
import { getEmployees } from 'redux/employees/thunks';
import { getProjects } from 'redux/projects/thunks';
import { getTasks } from 'redux/task/thunks';
import { Button, Modal, Spinner, TextInput, Select } from 'Components/Shared';
import { POST_TIMESHEET_SUCCESS, PUT_TIMESHEET_SUCCESS } from 'redux/timeSheets/constants';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { schema } from 'validations/time-sheets';

function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const {
    list: timesheets,
    isLoading: loadingTimesheet,
    error: timesheetError
  } = useSelector((state) => state.timeSheets);
  const {
    list: tasks,
    isLoading: loadingTasks,
    error: taskError
  } = useSelector((state) => state.tasks);
  const {
    list: projects,
    isLoading: loadingProjects,
    error: projectError
  } = useSelector((state) => state.projects);
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const { user, isLoading: userIsLoading, error: userError } = useSelector((state) => state.user);
  const {
    handleSubmit,
    register,
    watch,
    reset,
    trigger,
    getValues,
    resetField,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });
  const selectedProjectId = watch('project');
  const currentTimeSheet = timesheets.find((timesheet) => timesheet._id === id);
  const isEditing = Boolean(id);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getEmployees());
    dispatch(getProjects());
    dispatch(getTimesheets());
  }, []);

  useEffect(() => {
    if (currentTimeSheet) {
      reset({
        description: currentTimeSheet.description,
        date: currentTimeSheet.date,
        hours: currentTimeSheet.hours,
        task: currentTimeSheet.task._id,
        employee: currentTimeSheet.employee._id,
        project: currentTimeSheet.project._id
      });
    }
  }, [currentTimeSheet]);

  const newArr = () => {
    const newArr = [];
    projects.map((project) => {
      const employeeProjects = project.employees.find((employee) => employee.employee === user._id);
      if (employeeProjects) {
        newArr.push({ ...project, employees: employeeProjects });
      }
    });
    return newArr;
  };

  const employeeProjects = newArr();

  useEffect(() => {
    if (currentTimeSheet?.project !== selectedProjectId) {
      resetField('employee');
    }
  }, [currentTimeSheet, selectedProjectId]);

  const getModalContent = () => {
    if (timesheetError) {
      return (
        <div>
          <h4>Server error</h4>
          <p>{timesheetError}</p>
        </div>
      );
    }
    if (
      !Object.values(errors).length &&
      getValues('description') &&
      getValues('date') &&
      getValues('hours') &&
      getValues('task') &&
      getValues('employee') &&
      getValues('project')
    ) {
      return (
        <div>
          <h4>{isEditing ? 'Edit' : 'Add'} New Timesheet</h4>
          <p>
            Are you sure you want to {isEditing ? 'save' : 'add'} {isEditing ? 'changes in' : ''}{' '}
            this timesheet?
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

  const handleConfirmModal = (e) => {
    e.preventDefault();
    trigger();
    setShowModal(true);
    if (
      !Object.values(errors).length &&
      getValues('description') &&
      getValues('date') &&
      getValues('hours') &&
      getValues('task') &&
      getValues('employee') &&
      getValues('project')
    ) {
      setIsActionModal(true);
    } else {
      setIsActionModal(false);
    }
  };

  const onSubmit = async (data) => {
    if (!isEditing) {
      const result = await dispatch(addTimesheet(data));
      if (result.type === POST_TIMESHEET_SUCCESS) {
        history.goBack();
      }
    } else {
      const result = await dispatch(editTimesheet(data, id));
      if (result.type === PUT_TIMESHEET_SUCCESS) {
        history.goBack();
      }
    }
  };

  if (loadingTimesheet || loadingTasks || loadingProjects || userIsLoading) {
    return <Spinner isLoading={true} />;
  }

  if (timesheetError || taskError || projectError || userError) {
    <Modal isOpen={true} handleClose={setShowModal} isActionModal={false}>
      <div>
        <h4>There was an error</h4>
        <p>{timesheetError || taskError || projectError || userError}</p>
      </div>
    </Modal>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{isEditing ? 'Edit time sheet' : 'Create timesheet'}</h1>
      <Modal
        isOpen={showModal}
        handleClose={() => {
          setShowModal();
        }}
        isActionModal={isActionModal}
        action={handleSubmit(onSubmit)}
        actionButton="Submit"
      >
        {getModalContent()}
      </Modal>
      <form className={styles.form}>
        <div>
          <TextInput
            label="Timesheet"
            id="description"
            name="description"
            register={register}
            error={errors.description?.message}
            type="text"
            placeholder="Time Sheet Description"
          />
          <TextInput
            label="Date"
            id="date"
            name="date"
            register={register}
            error={errors.date?.message}
            type="date"
            placeholder="Date"
          />
          <TextInput
            label="Hours"
            id="hours"
            name="hours"
            register={register}
            error={errors.hours?.message}
            type="number"
            placeholder="Hours spend in the task"
          />
          <div className={styles.box}>
            <label>Project</label>
            <Select
              name="project"
              placeholder="Select a project"
              register={register}
              error={errors.project?.message}
              data={employeeProjects.map((project) => ({
                id: project._id,
                value: project.name
              }))}
            />
          </div>
          <div className={styles.box}>
            <label>Task</label>
            <Select
              name="task"
              placeholder="Select a task"
              register={register}
              error={errors.task?.message}
              data={tasks.map((task) => ({
                id: task._id,
                value: task.description
              }))}
            />
          </div>
          <div className={styles.box}>
            <label>Employee</label>
            <Select
              name="employee"
              placeholder="Select an employee"
              register={register}
              error={errors.employee?.message}
              data={[{ id: user._id, value: `${user.name} ${user.lastName}` }]}
            />
          </div>
          <div className={styles.buttons}>
            <div>
              <Button
                text="Cancel"
                type="button"
                variant="secondary"
                onClick={() => {
                  history.goBack();
                }}
              />
            </div>
            <div>
              <Button text="Submit" variant="primary" onClick={handleConfirmModal} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Form;
