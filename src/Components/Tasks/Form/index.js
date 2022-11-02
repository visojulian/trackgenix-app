import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Modal from './FormModal/index';

const Form = () => {
  const [taskName, setTaskName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const onChangeTaskNameInput = (event) => {
    setTaskName(event.target.value);
  };

  useEffect(async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      if (id) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
          method: 'GET'
        });
        const data = await response.json();
        setIsEditing(true);
        setTaskName(data.data.description);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = async (event) => {
    if (!isEditing) {
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
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
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
          <h3>{isEditing ? 'Edit Task' : 'Add Task'}</h3>
        </div>
        <div>
          <div>
            <label className={styles.descriptionLabel}>Task Description</label>
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
              type="button"
              onClick={() => {
                window.location.assign('/tasks');
              }}
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
};

export default Form;
