import { useState, useEffect } from 'react';
import Modal from './FormModal/index';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import Select from '../../Shared/Select';

function Form() {
  const [inputTimeSheetValue, setInputTimeSheetValue] = useState({
    description: '',
    date: '',
    hours: '',
    task: '',
    employee: '',
    project: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeesTotal, setEmployeesTotal] = useState([]);

  const onChangeInputValue = (e) => {
    setInputTimeSheetValue({ ...inputTimeSheetValue, [e.target.name]: e.target.value });

    if (e.target.name === 'project') {
      const selectedProject = projects.find((project) => project._id === e.target.value);
      const projectEmployees = selectedProject.employees.map((employee) => employee.employee);
      setEmployees(projectEmployees);
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
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
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
      console.error(error);
      alert(error);
    }
  }, []);

  const correctDate = (date) => {
    let dateFormated = date.substr(0, 10);
    return dateFormated;
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
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
        window.location.assign('/time-sheets');
      } else {
        setShowModal(true);
        setServerError(content.message);
      }
    } else {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
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
        window.location.assign('/time-sheets');
      } else {
        setShowModal(true);
        setServerError(content.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Modal show={showModal} title={serverError} closeModal={closeModal} />
      <form onSubmit={onSubmit}>
        <div>
          <div className={styles.cardTitle}>
            <h3 className={styles.title}>{isEditing ? 'Edit time sheet' : 'Create timesheet'}</h3>
          </div>
          <div className={styles.box}>
            <label>Description</label>
            <input
              type="text"
              name="description"
              required
              onChange={onChangeInputValue}
              value={inputTimeSheetValue.description}
            />
          </div>
          <div className={styles.box}>
            <label>Date</label>
            <input
              type="date"
              name="date"
              required
              onChange={onChangeInputValue}
              value={inputTimeSheetValue.date}
            />
          </div>
          <div className={styles.box}>
            <label>Hours</label>
            <input
              type="number"
              name="hours"
              required
              onChange={onChangeInputValue}
              value={inputTimeSheetValue.hours}
            />
          </div>
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
                inputTimeSheetValue.task !== ''
                  ? tasks.find((task) => task._id === inputTimeSheetValue.task)._id
                  : undefined
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
                inputTimeSheetValue.project !== ''
                  ? projects.find((project) => project._id === inputTimeSheetValue.project)._id
                  : undefined
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
                inputTimeSheetValue.employee !== ''
                  ? employees.map(
                      (employee) => employeesTotal.find((item) => item._id === employee)._id
                    )
                  : undefined
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
                  window.location.assign('/time-sheets');
                }}
              />
            </div>
            <div>
              <Button text="Submit" type="submit" variant="primary" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
