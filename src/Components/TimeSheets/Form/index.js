import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './form.module.css';
import { addTimesheet, editTimesheet, getTimesheets } from '../../../redux/timeSheets/thunks';
import { getEmployees } from '../../../redux/employees/thunks';
import { getProjects } from '../../../redux/projects/thunks';
import { getTasks } from '../../../redux/task/thunks';
import Modal from '../../Shared/Modal';
import Button from '../../Shared/Button';
import Select from '../../Shared/Select';
import Spinner from '../../Shared/Spinner/spinner';
import TextInput from '../../Shared/TextInput/index';
import { POST_TIMESHEET_SUCCESS, PUT_TIMESHEET_SUCCESS } from '../../../redux/timeSheets/constants';

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
    list: employees,
    isLoading: loadingEmployees,
    error: employeeError
  } = useSelector((state) => state.employees);
  const {
    list: projects,
    isLoading: loadingProjects,
    error: projectError
  } = useSelector((state) => state.projects);
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [projectEmployees, setProjectEmployees] = useState();
  const [inputTimeSheetValue, setInputTimeSheetValue] = useState({
    description: '',
    date: '',
    hours: '',
    task: '',
    employee: '',
    project: ''
  });

  const isEditing = Boolean(id);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getEmployees());
    dispatch(getProjects());
    dispatch(getTimesheets());
  }, []);

  useEffect(() => {
    if (timesheets.length > 0 && isEditing && projects.length > 0) {
      const currentTimeSheet = timesheets.find((timesheet) => timesheet._id === id);
      const selectedProject = projects.find(
        (project) => project._id === currentTimeSheet.project._id
      );
      if (selectedProject) {
        const projectEmployees = selectedProject.employees.map((employee) => employee.employee);
        setProjectEmployees(projectEmployees);
      }
      setInputTimeSheetValue({
        description: currentTimeSheet.description,
        date: correctDate(currentTimeSheet.date),
        hours: currentTimeSheet.hours,
        task: currentTimeSheet.task['_id'],
        employee: currentTimeSheet.employee['_id'],
        project: currentTimeSheet.project['_id']
      });
    }
  }, [id, isEditing, timesheets]);

  const onChangeInputValue = (e) => {
    setInputTimeSheetValue({ ...inputTimeSheetValue, [e.target.name]: e.target.value });
    if (e.target.name === 'project') {
      const selectedProject = projects.find((project) => project._id === e.target.value);
      const projectEmployees = selectedProject.employees.map((employee) => employee.employee);
      setProjectEmployees(projectEmployees);
    }
  };

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
      inputTimeSheetValue.description &&
      inputTimeSheetValue.date &&
      inputTimeSheetValue.hours &&
      inputTimeSheetValue.task &&
      inputTimeSheetValue.employee &&
      inputTimeSheetValue.project
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
        <h4>Form incomplete</h4>
        <p>Please complete all fields before submit.</p>
      </div>
    );
  };

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    if (
      inputTimeSheetValue.description &&
      inputTimeSheetValue.date &&
      inputTimeSheetValue.hours &&
      inputTimeSheetValue.task &&
      inputTimeSheetValue.employee &&
      inputTimeSheetValue.project
    ) {
      setIsActionModal(true);
    }
  };

  const correctDate = (date) => {
    const dateFormated = date.substr(0, 10);
    return dateFormated;
  };

  const onSubmit = async () => {
    const newTimesheet = {
      description: inputTimeSheetValue.description,
      date: inputTimeSheetValue.date,
      hours: inputTimeSheetValue.hours,
      task: inputTimeSheetValue.task,
      employee: inputTimeSheetValue.employee,
      project: inputTimeSheetValue.project
    };
    if (!isEditing) {
      const result = await dispatch(addTimesheet(newTimesheet));
      if (result.type === POST_TIMESHEET_SUCCESS) {
        history.goBack();
      }
    } else {
      const result = await dispatch(editTimesheet(newTimesheet, id));
      if (result.type === PUT_TIMESHEET_SUCCESS) {
        history.goBack();
      }
    }
  };

  if (loadingTimesheet || loadingEmployees || loadingTasks || loadingProjects) {
    return <Spinner isLoading={true} />;
  }

  if (timesheetError || taskError || projectError || employeeError) {
    <Modal isOpen={true} handleClose={setShowModal} isActionModal={false}>
      <div>
        <h4>There was an error</h4>
        <p>{timesheetError || taskError || projectError || employeeError}</p>
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
        action={onSubmit}
        actionButton="Submit"
      >
        {getModalContent()}
      </Modal>
      <form>
        <div>
          <TextInput
            label="Time Sheet description"
            id="description"
            name="description"
            value={inputTimeSheetValue.description}
            onChange={onChangeInputValue}
            type="text"
            placeholder="Time Sheet Description"
          />
          <TextInput
            label="Date"
            id="date"
            name="date"
            value={inputTimeSheetValue.date}
            onChange={onChangeInputValue}
            type="date"
            placeholder="Date"
          />
          <TextInput
            label="Hours"
            id="hours"
            name="hours"
            value={inputTimeSheetValue.hours}
            onChange={onChangeInputValue}
            type="number"
            placeholder="Hours spend in the taks"
          />
          <div className={styles.box}>
            <label>Task</label>
            <Select
              name="task"
              placeholder="Select a task"
              required
              onSelect={onChangeInputValue}
              data={tasks.map((task) => ({
                id: task._id,
                value: task.description
              }))}
              value={
                inputTimeSheetValue.task !== '' &&
                tasks.find((task) => task._id === inputTimeSheetValue.task)?._id
              }
            />
          </div>
          <div className={styles.box}>
            <label>Project</label>
            <Select
              name="project"
              placeholder="Select a project"
              required
              onSelect={onChangeInputValue}
              data={projects.map((project) => ({
                id: project._id,
                value: project.name
              }))}
              value={
                inputTimeSheetValue.project !== '' &&
                projects.find((project) => project._id === inputTimeSheetValue.project)?._id
              }
            />
          </div>
          <div className={styles.box}>
            <label>Employee</label>
            {projectEmployees ? (
              <Select
                name="employee"
                placeholder="Select an employee"
                required
                onSelect={onChangeInputValue}
                data={projectEmployees.map((employee) => ({
                  id: employees.find((item) => item._id === employee)._id,
                  value: employees.find((item) => item._id === employee).name
                }))}
                value={inputTimeSheetValue.employee}
              />
            ) : (
              <Select
                name="employee"
                placeholder="Select a project first"
                required
                onSelect={onChangeInputValue}
                data={['']}
                value={inputTimeSheetValue.employee}
              />
            )}
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
              <Button text="Submit" type="submit" variant="primary" onClick={handleConfirmModal} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Form;
