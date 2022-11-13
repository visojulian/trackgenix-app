import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Button from '../../Shared/Button/index';
import Modal from '../../Shared/Modal';
import TextInput from '../../Shared/TextInput/index';
import Spinner from '../../Shared/Spinner/spinner';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postTasks, putTasks } from '../../../redux/task/thunks';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const [taskName, setTaskName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState();
  const tasks = useSelector((state) => state.tasks.list);
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const error = useSelector((state) => state.tasks.error);
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

  // useEffect(() => {
  //   dispatch(getTasks());
  // }, []);
  // const variable = [tasks.find((item) => item._id === id)];
  // console.log(tasks);
  // console.log(variable);
  useEffect(async () => {
    try {
      //console.log(...tasks.list.map((item) => (item._id === id ? { item } : 'not found')));
      if (id) {
        // console.log(...tasks.list.map((item) => (item._id === id ? { item } : 'not found')));
        // const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        //   method: 'GET'
        // });
        // const data = await response.json();
        // setIsEditing(true);
        // setTaskName(data.data.description);
        const fill = [tasks.find((item) => item._id === id)];
        setIsEditing(true);
        setTaskName(fill[0].description);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onSubmit = async () => {
    if (!isEditing) {
      // const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ description: taskName })
      // });
      // const content = await rawResponse.json();
      // if (!content.error) {
      //   history.goBack();
      // } else {
      //   setServerError(content.message);
      //   setShowModal(true);
      // }
      dispatch(postTasks(taskName));
      if (error === '') {
        history.goBack();
      } else {
        setServerError(error);
        setShowModal(true);
      }
    } else {
      // const params = new URLSearchParams(window.location.search);
      // console.log(params);
      // const id = params.get('id');
      // console.log(id);
      dispatch(putTasks(taskName, id));
      // const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ description: taskName })
      // });
      // const content = await rawResponse.json();
      // if (!content.error) {
      //   history.goBack();
      // } else {
      //   setServerError(content.message);
      //   setShowModal(true);
      // }
      if (error === '') {
        history.goBack();
      } else {
        setServerError(error);
        setShowModal(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>{isEditing ? 'Edit Task' : 'Add Task'}</h1>
      <Spinner isLoading={isLoading} />
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
