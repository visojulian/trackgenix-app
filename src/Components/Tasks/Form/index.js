import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Modal from '../../Shared/Modal';

const Form = () => {
  const [taskName, setTaskName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [modalChildren, setModalChildren] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const onChangeTaskNameInput = (event) => {
    setTaskName(event.target.value);
  };

  const handleConfirmModal = (e) => {
    e.preventDefault();
    if (taskName) {
      setIsActionModal(true);
      setModalChildren(
        <div>
          <h4>{isEditing ? 'Edit' : 'Add'} New Admin</h4>
          <p>
            Are you sure you want to {isEditing ? 'save' : 'add'} {taskName}{' '}
            {isEditing ? 'changes' : 'as Admin'}?
          </p>
        </div>
      );
    } else {
      setIsActionModal(false);
      setModalChildren(
        <div>
          <h4>Form incomplete</h4>
          <p>Please complete all fields before submit.</p>
        </div>
      );
    }
    setShowModal(true);
  };

  const handleErrorModal = (error) => {
    setIsActionModal(false);
    setModalChildren(
      <div>
        <h4>Server error</h4>
        <p>{error}</p>
      </div>
    );
    setShowModal(true);
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
        window.location.assign('/tasks');
      } else {
        handleErrorModal(content.message);
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
        window.location.assign('/tasks');
      } else {
        handleErrorModal(content.message);
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
        {modalChildren}
      </Modal>
      <form className={styles.formFlexBox}>
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
