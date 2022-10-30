import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Modal from './Form Modal/index';
import FormText from './Form Title';

function Form() {
  const [taskName, setTaskName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [serverError, setServerError] = useState('');
  const [formMode, setFormMode] = useState(false);
  const [formText, setFormText] = useState('Add task');

  const onChangeTaskNameInput = (event) => {
    setTaskName(event.target.value);
  };

  useEffect(async () => {
    if (window.location.href !== `http://localhost:3001/tasks/form`) {
      try {
        const fullUrl = window.location.href; //fullUrl.slice(36)
        const id = fullUrl.substring(fullUrl.lastIndexOf('=') + 1);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
          method: 'GET'
        });
        const data = await response.json();
        setFormMode(true);
        setFormText('Edit task');
        setTaskName(data.data.description);
      } catch (error) {
        console.error(error);
      }
    } else {
      return null;
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = async (event) => {
    if (!formMode) {
      event.preventDefault();
      const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: taskName })
      });
      const content = await rawResponse.json();
      if (!content.error) {
        window.location.assign('/tasks');
      } else {
        setShowModal(true);
        setServerError(content.message);
      }
    } else {
      event.preventDefault();
      const fullUrl = window.location.href; //fullUrl.slice(36)
      const id = fullUrl.substring(fullUrl.lastIndexOf('=') + 1);
      const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: taskName })
      });
      const content = await rawResponse.json();
      if (!content.error) {
        window.location.assign('/tasks');
      } else {
        setShowModal(true);
        setServerError(content.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Modal show={showModal} title={serverError} closeModal={closeModal} />
      <form onSubmit={onSubmit} className={styles.formFlexBox}>
        <div>
          <FormText title={formText} />
        </div>
        <div>
          <div>
            <label style={{ marginRight: '10px' }}>Task Description</label>
            <input
              id="taskName"
              name="taskName"
              required
              value={taskName}
              onChange={onChangeTaskNameInput}
            />
          </div>
        </div>
        <div className={styles.buttonsFlexBox}>
          <div>
            <button
              onClick={() => window.location.assign('/tasks')}
              className={styles.buttonCancel}
            >
              Cancel
            </button>
          </div>
          <div>
            <button type="submit" className={styles.buttonConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
