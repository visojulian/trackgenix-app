import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Modal from '../../Shared/Modal';
import TextInput from '../../Shared/TextInput/index';
import { useHistory, useParams } from 'react-router-dom';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const [taskName, setTaskName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState();

  const onChangeTaskNameInput = (event) => {
    setTaskName(event.target.value);
  };

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setIsActionModal(true);
    setShowModal(true);
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
    if (taskName) {
      return (
        <div>
          <h4>{isEditing ? 'Edit' : 'Add'} New Task</h4>
          <p>
            Are you sure you want to {isEditing ? 'save' : 'add'} {taskName}{' '}
            {isEditing ? 'changes' : ''}?
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

  useEffect(async () => {
    try {
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

  const onSubmit = async () => {
    if (!isEditing) {
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
        history.goBack();
      } else {
        setServerError(content.message);
        setShowModal(true);
      }
    } else {
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
        history.goBack();
      } else {
        setServerError(content.message);
        setShowModal(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Modal
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={isActionModal}
        action={onSubmit}
        actionButton="Submit"
      >
        {getModalContent()}
      </Modal>
      <form className={styles.formFlexBox}>
        <div>
          <h3>{isEditing ? 'Edit Task' : 'Add Task'}</h3>
        </div>
        <div>
          <TextInput
            label="Task Description"
            id="taskName"
            name="taskName"
            value={taskName}
            onChange={onChangeTaskNameInput}
            type="text"
            placeholder="Task Name"
          />
        </div>
        <div className={styles.buttonsFlexBox}>
          <div>
            <button
              type="button"
              onClick={() => {
                history.goBack();
              }}
              className={styles.buttonCancel}
            >
              Cancel
            </button>
          </div>
          <div>
            <button onClick={handleConfirmModal} className={styles.buttonConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
