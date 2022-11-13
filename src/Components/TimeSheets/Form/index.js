import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addTimesheet, editTimesheet, getTimesheetById } from '../../../redux/timeSheets/thunks';
import { getEmployees } from '../../../redux/employees/thunks';
import { getProjects, getProjectsById } from '../../../redux/projects/thunks';
import { getTasks } from '../../../redux/tasks/thunks';
import Modal from '../../Shared/Modal';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import Select from '../../Shared/Select';
import Spinner from '../../Shared/Spinner';
import TextInput from '../../Shared/TextInput/index';

function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [inputTimeSheetValue, setInputTimeSheetValue] = useState({
    description: '',
    date: '',
    hours: '',
    task: '',
    employee: '',
    project: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [serverError, setServerError] = useState();
  const { timesheet, isLoading, error } = useSelector((state) => state.timeSheets);
  const { tasks } = useSelector((state) => state.tasks);
  const { employees } = useSelector((state) => state.employees);
  const { projects, project } = useSelector((state) => state.projects);

  const onChangeInputValue = (e) => {
    setInputTimeSheetValue({ ...inputTimeSheetValue, [e.target.name]: e.target.value });

    if (e.target.name === 'project') {
      const selectedProject = projects.find((project) => project._id === e.target.value);
      dispatch(getProjectsById(selectedProject._id));
    }
  };

  const getModalContent = () => {
    if (serverError) {
      return (
        <div>
          <h4>Server error</h4>
          <p>{serverError}</p>
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

  useEffect(async () => {
    try {
      dispatch(getTasks());
      dispatch(getEmployees());
      dispatch(getProjects());
      if (id) {
        dispatch(getTimesheetById(id));
        const selectedProject = projects.data.find(
          (project) => project._id === timesheet.data.project._id
        );
        dispatch(getProjectsById(selectedProject._id));
        setIsEditing(true);
        setInputTimeSheetValue({
          description: timesheet.data.description,
          date: correctDate(timesheet.data.date),
          hours: timesheet.data.hours,
          task: timesheet.data.task['_id'],
          employee: timesheet.data.employee['_id'],
          project: timesheet.data.project['_id']
        });
      }
    } catch (error) {
      setServerError(error);
      setShowModal(true);
    }
  }, []);

  const correctDate = (date) => {
    let dateFormated = date.substr(0, 10);
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
      dispatch(addTimesheet(newTimesheet));
      if (!error) {
        history.goBack();
      } else {
        setServerError(error);
        setShowModal(true);
      }
    } else {
      dispatch(editTimesheet(newTimesheet, id));
      if (!error) {
        history.goBack();
      } else {
        setServerError(error);
        setShowModal(true);
      }
    }
  };

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  if (error) {
    <Modal isOpen={showModal} handleClose={setShowModal} isActionModal={false}>
      <div>
        <h4>There was an error</h4>
        <p>{error}</p>
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
          setServerError();
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
                tasks.find((task) => task._id === inputTimeSheetValue.task)._id
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
                projects.find((project) => project._id === inputTimeSheetValue.project)._id
              }
            />
          </div>
          <div className={styles.box}>
            <label>Employee</label>
            <Select
              name="employee"
              placeholder="Select an employee"
              required
              onSelect={onChangeInputValue}
              data={project.employees.map((employee) => ({
                id: employees.find((item) => item._id === employee)._id,
                value: employees.find((item) => item._id === employee).name
              }))}
              value={
                inputTimeSheetValue.employee !== '' &&
                project.employees.map(
                  (employee) => employees.find((item) => item._id === employee)._id
                )
              }
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
              <Button text="Submit" type="submit" variant="primary" onClick={handleConfirmModal} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
