import { useState } from 'react';
import styles from './form.module.css';

const Form = () => {
  const [inputTimeSheetValue, setInputTimeSheetValue] = useState({
    description: '',
    date: '',
    hours: '',
    task: '',
    employee: '',
    project: ''
  });

  const onChangeInputValue = (e) => {
    setInputTimeSheetValue({ ...inputTimeSheetValue, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event) => {
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
    }
    console.log(rawResponse);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div>
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
            <input
              type="text"
              name="task"
              required
              onChange={onChangeInputValue}
              value={inputTimeSheetValue.task}
            />
          </div>
          <div className={styles.box}>
            <label>Employee</label>
            <input
              type="text"
              name="employee"
              required
              onChange={onChangeInputValue}
              value={inputTimeSheetValue.employee}
            />
          </div>
          <div className={styles.box}>
            <label>Project</label>
            <input
              type="text"
              name="project"
              required
              onChange={onChangeInputValue}
              value={inputTimeSheetValue.project}
            />
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
};

export default Form;
