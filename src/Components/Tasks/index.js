import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getTasks, deleteTasks } from '../../redux/task/thunks';
import { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import Table from '../Shared/Table';
import Button from '../Shared/Button';
import Spinner from '../Shared/Spinner/spinner';
import Modal from '../Shared/Modal';

const Tasks = () => {
  const history = useHistory();
  const [taskId, setTaskId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const tasks = useSelector((state) => state.tasks.list);
  const isLoading = useSelector((state) => state.tasks.isLoading);
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
    history.push(`/tasks/form/${id}`);
  };

  return (
    <section className={styles.container}>
      <h1>Tasks</h1>
      <Spinner isLoading={isLoading} />
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
        action={() => taskId && dispatch(deleteTasks(taskId))}
        actionButton="Delete"
      >
        <div>
          <h4>Delete Task</h4>
          <p>Are you sure you want to delete this task?</p>
          <p>Changes cannot be undone.</p>
        </div>
      </Modal>
      <Button
        text="Add new task"
        type="submit"
        variant="primary"
        onClick={() => {
          history.push(`/tasks/form`);
        }}
      />
    </section>
  );
};

export default Tasks;
