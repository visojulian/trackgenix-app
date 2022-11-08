import { useState, useEffect } from 'react';
import Modal from '../../Shared/Modal';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import Select from '../../Shared/Select';
import TextInput from '../../Shared/TextInput/index';
import { useHistory, useParams } from 'react-router-dom';

function Form() {
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
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeesTotal, setEmployeesTotal] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [serverError, setServerError] = useState();

  const onChangeInputValue = (e) => {
    setInputTimeSheetValue({ ...inputTimeSheetValue, [e.target.name]: e.target.value });

    if (e.target.name === 'project') {
      const selectedProject = projects.find((project) => project._id === e.target.value);
      const projectEmployees = selectedProject.employees.map((employee) => employee.employee);
      setEmployees(projectEmployees);
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
      const tasksResponse = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'GET'
      });
      const tasks = await tasksResponse.json();
      setTasks(tasks.data);
      const employeesResponse = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'GET'
      });
      const employees = await employeesResponse.json();
      setEmployeesTotal(employees.data);
      const projectsResponse = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: 'GET'
      });
      const projects = await projectsResponse.json();
      setProjects(projects.data);
      if (id) {
        const timeSheetResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/time-sheets/${id}`,
          {
            method: 'GET'
          }
        );
        const timeSheet = await timeSheetResponse.json();
        const selectedProject = projects.data.find(
          (project) => project._id === timeSheet.data.project._id
        );
        const projectEmployees = selectedProject.employees.map((employee) => employee.employee);
        setEmployees(projectEmployees);
        setIsEditing(true);
        setInputTimeSheetValue({
          description: timeSheet.data.description,
          date: correctDate(timeSheet.data.date),
          hours: timeSheet.data.hours,
          task: timeSheet.data.task['_id'],
          employee: timeSheet.data.employee['_id'],
          project: timeSheet.data.project['_id']
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
    if (!isEditing) {
      const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: inputTimeSheetValue.description,
          date: inputTimeSheetValue.date,
          hours: inputTimeSheetValue.hours,
          task: inputTimeSheetValue.task,
          employee: inputTimeSheetValue.employee,
          project: inputTimeSheetValue.project
        })
      });
      const content = await rawResponse.json();
      if (!content.error) {
        history.goBack();
      } else {
        setServerError(content.message);
        setShowModal(true);
      }
    } else {
      const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: inputTimeSheetValue.description,
          date: inputTimeSheetValue.date,
          hours: inputTimeSheetValue.hours,
          task: inputTimeSheetValue.task,
          employee: inputTimeSheetValue.employee,
          project: inputTimeSheetValue.project
        })
      });
      const content = await rawResponse.json();
      if (!content.error) {
        history.goBack();
      } else {
        setServerError(content.message);
        setShowModal(true);
      }
    }
  };

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
              data={employees.map((employee) => ({
                id: employeesTotal.find((item) => item._id === employee)._id,
                value: employeesTotal.find((item) => item._id === employee).name
              }))}
              value={
                inputTimeSheetValue.employee !== '' &&
                employees.map(
                  (employee) => employeesTotal.find((item) => item._id === employee)._id
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
