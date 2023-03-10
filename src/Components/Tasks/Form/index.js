import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postTask, putTask } from '../../../redux/task/thunks';
import { POST_TASK_SUCCESS, PUT_TASK_SUCCESS } from '../../../redux/task/constants';
import styles from './form.module.css';
import { Button, Modal, Spinner, TextInput } from 'Components/Shared';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { schema } from '../../../validations/task';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { list: tasks, isLoading, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const foundTask = tasks.find((task) => task._id === id);
  const {
    handleSubmit,
    register,
    getValues,
    reset,
    trigger,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    trigger();
    if (getValues('description') && !Object.values(errors).length) {
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
    if (getValues('description') && !Object.values(errors).length) {
      return (
        <div>
          <h4>{isEditing ? 'Edit' : 'Add'} New Task</h4>
          <p>
            Are you sure you want to {isEditing ? 'save' : 'add'} {getValues('description')}{' '}
            {isEditing ? 'changes' : ''}?
          </p>
        </div>
      );
    }
    return (
      <div>
        <h4>Form field have errors</h4>
        <p>Please make sure to amend all errors before submit.</p>
      </div>
    );
  };

  useEffect(() => {
    if (id && foundTask) {
      setIsEditing(true);
      reset({
        description: foundTask.description
      });
    }
  }, [id, foundTask]);

  const onSubmit = async (data) => {
    if (!isEditing) {
      const result = await dispatch(postTask(data.description));
      if (result.type === POST_TASK_SUCCESS) {
        history.goBack();
      } else {
        setShowModal(true);
      }
    } else {
      const result = await dispatch(putTask(data.description, id));
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
        action={handleSubmit(onSubmit)}
        actionButton="Submit"
      >
        {getModalContent()}
      </Modal>
      <form className={styles.formFlexBox}>
        <div>
          <TextInput
            label="Task Description"
            id="description"
            name="description"
            type="text"
            placeholder="Task description"
            register={register}
            error={errors.description?.message}
          />
        </div>
        <div className={styles.butCont}>
          <div>
            <Button
              type="button"
              text="Cancel"
              variant="secondary"
              onClick={() => {
                history.goBack();
              }}
            />
            <Button text="Confirm" type="submit" variant="primary" onClick={handleConfirmModal} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
