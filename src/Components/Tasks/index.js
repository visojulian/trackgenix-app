import { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import Task from './Task/index';
import Modal from '../Shared/Modal';
import Logo from '../../assets/trash.png';

const Tasks = () => {
  const [tasks, saveTasks] = useState([]);
  const [taskId, setTaskId] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [modalChildren, setModalChildren] = useState();

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      saveTasks(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleConfirm = () => {
    setIsActionModal(true);
    setModalChildren(
      <div>
        <h4>Delete Task</h4>
        <p>Are you sure you want to delete this task?</p>
      </div>
    );
    setShowModal(true);
  };

  const deleteTask = async () => {
    const id = taskId;
    saveTasks([...tasks.filter((task) => task._id !== id)]);
    await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
  };

  const onClickTask = (id) => {
    window.location.assign(`/tasks/form?id=${id}`);
  };

  return (
    <section className={styles.container}>
      <Modal
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={isActionModal}
        action={deleteTask}
        actionButton="Delete"
      >
        {modalChildren}
      </Modal>
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
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Description</th>
            <th>
              <img src={Logo} />
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <Task
                key={task._id}
                task={task}
                setShowModal={handleConfirm}
                setTaskId={setTaskId}
                onClickTask={onClickTask}
              />
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Tasks;
