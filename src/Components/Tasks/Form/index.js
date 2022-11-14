import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Button from '../../Shared/Button/index';
import Modal from '../../Shared/Modal';
import TextInput from '../../Shared/TextInput/index';
import Spinner from '../../Shared/Spinner/spinner';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postTasks, putTasks } from '../../../redux/task/thunks';
import { POST_TASKS_SUCCESS, PUT_TASKS_SUCCESS } from '../../../redux/task/constants';
//import store from '../../../redux/store.js';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const [taskName, setTaskName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  //const [serverError, setServerError] = useState();
  //const general = useSelector((state) => state.tasks);
  const tasks = useSelector((state) => state.tasks.list);
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const error = useSelector((state) => state.tasks.error);
  const dispatch = useDispatch();
  //let algo = false;
  // let previousValue;

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
        //const fill = tasks.find((item) => item._id === id);
        setIsEditing(true);
        setTaskName(tasks.find((item) => item._id === id).description);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  // const mapStateToProps = (state) => {
  //   return {
  //     something: state.tasks.list
  //   };
  // };

  // const check = () => {
  //   let previousValue = tasks;
  //   //console.log(previousValue);
  //   let currentValue = general.getState().tasks.list;
  //   //console.log(currentValue);

  //   if (previousValue !== currentValue) {
  //     console.log('Hubo cambios de', previousValue, 'to', currentValue);
  //     algo = true;
  //   }
  // };

  // const check = (isLoading) => {
  //   if (!isLoading) {
  //     let currentValue = store.getState().tasks.list;
  //     if (previousValue !== currentValue) {
  //       // console.log('Hubo cambios de', previousValue, 'to', currentValue);
  //       algo = true;
  //     }
  //   }
  // };

  // const unsubscribe = general.subscribe(check);

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
      //store.subscribe(check);
      //previousValue = tasks;
      const result = await dispatch(postTasks(taskName));
      //check(isLoading);
      if (result.type === POST_TASKS_SUCCESS) {
        // unsubscribe();
        history.goBack();
      } else {
        //setServerError(error);
        setShowModal(true);
      }
    } else {
      // const params = new URLSearchParams(window.location.search);
      // console.log(params);
      // const id = params.get('id');
      // console.log(id);
      const result = await dispatch(putTasks(taskName, id));
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
      if (result.type === PUT_TASKS_SUCCESS) {
        history.goBack();
      } else {
        //setServerError(error);
        setShowModal(true);
      }
    }
  };

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
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
