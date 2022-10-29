import { useState, useEffect } from 'react';
//import Employee from './Employee';
import styles from './form.module.css';

function Form() {
  const [taskName, setTaskName] = useState('');
  const [estimatedHours, setEstimatedHours] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      console.log(data.data);
      setEmployees(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onChangeTaskNameInput = (event) => {
    setTaskName(event.target.value);
  };

  const onChangeHoursInput = (event) => {
    setEstimatedHours(event.target.value);
  };

  //   const onChangeEmployeeInput = (event) => {
  //     setEmployee(event.target.value);
  //   };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(taskName);
    console.log(estimatedHours);
  };
  console.log(employees.map());

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div>
          <h3>Placeholder</h3>
        </div>
        <div className={styles.container}>
          <div>
            <label>Task Name</label>
            <input
              id="taskName"
              name="taskName"
              required
              value={taskName}
              onChange={onChangeTaskNameInput}
            />
          </div>
          <div>
            <label>Estimated Hours</label>
            <input
              id="estimatedHours"
              name="estimatedHours"
              required
              value={estimatedHours}
              onChange={onChangeHoursInput}
            />
          </div>
          <div>
            <label>Assign Employee</label>
            <select>
              <option></option>
              {/* {employees.map((employee) => {
                return <Employee key={employee._id} employee={employee} />;
              })} */}
            </select>
          </div>
        </div>
        <div>
          <div>
            <button>Cancel</button>
          </div>
          <div>
            <button type="submit">Confirm</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
