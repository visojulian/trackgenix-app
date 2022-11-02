import { useState, useEffect } from 'react';
import Modal from './Form Modal/index';
import FormTitle from './Form Title/index';
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
  const [formMode, setFormMode] = useState(true);
  const [formTitle, setFormTitle] = useState('Add timeSheet');
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeesTotal, setEmployeesTotal] = useState([]);

  const onChangeInputValue = (e) => {
    setInputTimeSheetValue({ ...inputTimeSheetValue, [e.target.name]: e.target.value });

    if (e.target.name === 'project') {
      const selectedProject = projects.find((project) => project._id === e.target.value);
      console.log(selectedProject);
      const projectEmployees = selectedProject.employees.map((employee) => employee.employee);
      console.log(projectEmployees);
      setEmployees(projectEmployees);
    }
  };

  useEffect(async () => {
    try {
      const response2 = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'GET'
      });
      const json = await response2.json();
      setTasks(json.data);
    } catch (error) {
      console.error(error);
    }

    try {
      const response4 = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'GET'
      });
      const json = await response4.json();
      setEmployeesTotal(json.data);
    } catch (error) {
      console.error(error);
    }

    try {
      const response3 = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: 'GET'
      });
      const json = await response3.json();
      setProjects(json.data);
    } catch (error) {
      console.error(error);
    }

    if (window.location.href.includes('id=')) {
      try {
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('=') + 1);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
          method: 'GET'
        });
        const json = await response.json();
        setFormMode(false);
        setFormTitle('Update TimeSheet');
        setInputTimeSheetValue({
          description: json.data.description,
          date: correctDate(json.data.date),
          hours: json.data.hours,
          task: json.data.task['_id'],
          employee: json.data.employee['_id'],
          project: json.data.project['_id']
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      return null;
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
    if (formMode) {
      event.preventDefault();
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
      event.preventDefault();
      const url = window.location.href;
      const id = url.substring(url.lastIndexOf('=') + 1);
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
            <FormTitle title={formTitle} />
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
                console.log(employees);
                console.log(employeesTotal);
                console.log(index);
                console.log(employee);
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
