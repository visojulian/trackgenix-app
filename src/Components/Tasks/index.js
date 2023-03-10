import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getTasks, deleteTask } from 'redux/task/thunks';
import { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import { ButtonAdd, Modal, Spinner, Table } from 'Components/Shared';

const Tasks = () => {
  const history = useHistory();
  const [taskId, setTaskId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const tasks = useSelector((state) => state.tasks.list);
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const error = useSelector((state) => state.tasks.error);
  const dispatch = useDispatch();
  const values = ['description'];
  const headers = ['Description'];

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const onDelete = (id, showModal) => {
    setTaskId(id);
    setShowModal(showModal);
  };

  const onRowClick = (id) => {
    history.push(`tasks/form/${id}`);
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
    <section className={styles.container}>
      <h1>Tasks</h1>
      <Table
        data={tasks}
        headers={headers}
        values={values}
        onDelete={onDelete}
        onRowClick={onRowClick}
      />
      <Modal
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={true}
        action={() => taskId && dispatch(deleteTask(taskId))}
        actionButton="Delete"
      >
        <div>
          <h4>Delete Task</h4>
          <p>Are you sure you want to delete this task?</p>
          <p>Changes cannot be undone.</p>
        </div>
      </Modal>
      <div className={styles.buttonMargin}>
        <ButtonAdd
          text="Add new task"
          type="submit"
          variant="main"
          onClick={() => {
            history.push(`tasks/form`);
          }}
        />
      </div>
    </section>
  );
};

export default Tasks;
