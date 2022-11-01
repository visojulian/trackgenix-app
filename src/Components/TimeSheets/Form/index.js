import { useState, useEffect } from 'react';
import Modal from './Form Modal/index';
import FormText from './Form Title/index';
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
  const [formText, setFormText] = useState('Add timeSheet');

  const onChangeInputValue = (e) => {
    setInputTimeSheetValue({ ...inputTimeSheetValue, [e.target.name]: e.target.value });
  };

  useEffect(async () => {
    if (window.location.href.includes('id=')) {
      try {
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('=') + 1);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
          method: 'GET'
        });
        const json = await response.json();
        setFormMode(false);
        setFormText('Update TimeSheet');
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
            <FormText title={formText} />
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
}

export default Form;
