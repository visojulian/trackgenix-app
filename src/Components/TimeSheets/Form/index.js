import { useState, useEffect } from 'react';
import Modal from './FormModal/index';
import styles from './form.module.css';

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
            <select
              name="task"
              required
              value={inputTimeSheetValue.task}
              onChange={onChangeInputValue}
            >
              <option value="" disabled hidden>
                Select a task
              </option>
              {tasks.map((task) => {
                return (
                  <option placeholder="taskhere" key={task._id} value={task._id}>
                    {task.description}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.box}>
            <label>Employee</label>
            <select
              name="employee"
              value={inputTimeSheetValue.employee}
              onChange={onChangeInputValue}
              required
            >
              <option value="" disabled hidden>
                Select an employee
              </option>
              {employees.map((employee, index) => {
                const selectedEmployee = employeesTotal.find((item) => item._id === employee);
                return (
                  <option key={index} value={selectedEmployee._id}>
                    {selectedEmployee.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.box}>
            <label>Project</label>
            <select
              name="project"
              required
              value={inputTimeSheetValue.project}
              onChange={onChangeInputValue}
            >
              <option value="" disabled hidden>
                Select a project
              </option>
              {projects.map((project) => {
                return (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.buttons}>
            <div>
              <button
                className={styles.confirmButton}
                onClick={() => window.location.assign('/time-sheets')}
              >
                Cancel
              </button>
            </div>
            <div>
              <button className={styles.cancelButton} type="submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
