import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postTask, putTask } from 'redux/task/thunks';
import { POST_TASK_SUCCESS, PUT_TASK_SUCCESS } from 'redux/task/constants';
import styles from './form.module.css';
import { Button, Modal, Spinner, TextInput } from 'Components/Shared';
// import { joiResolver } from '@hookform/resolvers/joi';
// import { useForm } from 'react-hook-form';
// import { schema } from '../../../validations/task';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const [taskName, setTaskName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { list: tasks, isLoading, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const onChangeTaskNameInput = (event) => {
    setTaskName(event.target.value);
  };

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    if (taskName) {
      setIsActionModal(true);
    }
  };

  const getModalContent = () => {
    if (error) {
      return (
        <div>
          <h4>Server error</h4>
          <p>{error}</p>
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
        setIsEditing(true);
        setTaskName(tasks.find((item) => item._id === id).description);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onSubmit = async () => {
    if (!isEditing) {
      const result = await dispatch(postTask(taskName));
      if (result.type === POST_TASK_SUCCESS) {
        history.goBack();
      } else {
        setShowModal(true);
      }
    } else {
      const result = await dispatch(putTask(taskName, id));
      if (result.type === PUT_TASK_SUCCESS) {
        history.goBack();
      } else {
        setShowModal(true);
      }
    }
  };

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  if (error) {
    return (
      <div className={styles.container} style={{ 'justify-content': 'center' }}>
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>{isEditing ? 'Edit Task' : 'Add Task'}</h1>
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
            <Button
              type="button"
              text="Cancel"
              variant="secondary"
              onClick={() => {
                history.goBack();
              }}
            />
          </div>
          <div>
            <Button text="Confirm" type="submit" variant="primary" onClick={handleConfirmModal} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
