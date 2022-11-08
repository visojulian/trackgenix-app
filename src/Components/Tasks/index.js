import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './tasks.module.css';
import Table from '../Shared/Table';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';

const Tasks = () => {
  const history = useHistory();
  const [tasks, saveTasks] = useState([]);
  const [taskId, setTaskId] = useState();
  const [showModal, setShowModal] = useState(false);
  const headers = ['description'];

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      saveTasks(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteTask = async () => {
    saveTasks([...tasks.filter((task) => task._id !== taskId)]);
    await fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
      method: 'DELETE'
    });
  };

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
      <Table data={tasks} headers={headers} onDelete={onDelete} onRowClick={onRowClick} />
      <Modal
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={true}
        action={deleteTask}
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
