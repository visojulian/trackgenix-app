import { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import Modal from './Modal/index';
import Table from '../Shared/Table';

const Tasks = () => {
  const [tasks, saveTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskId, setTaskId] = useState(undefined);
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

  const deleteTask = async (id) => {
    saveTasks([...tasks.filter((task) => task._id !== id)]);
    await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
  };

  const onDelete = (id, showModal) => {
    setTaskId(id);
    setShowModal(showModal);
  };

  const onClickEntity = (id) => {
    window.location.assign(`/tasks/form?id=${id}`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <Modal
        show={showModal}
        closeModal={closeModal}
        deleteTask={deleteTask}
        taskId={taskId}
        title="Do you want to delete this task?"
      />
      <div className={styles.upperFlexBox}>
        <div className={styles.titleFlexBox}>
          <h2>Tasks</h2>
        </div>
        <div className={styles.buttonFlexBox}>
          <a href="/tasks/form">
            <button className={styles.addTaskButton}>Add new task</button>
          </a>
        </div>
      </div>
      <Table data={tasks} headers={headers} onDelete={onDelete} onClickEntity={onClickEntity} />
    </section>
  );
};

export default Tasks;
