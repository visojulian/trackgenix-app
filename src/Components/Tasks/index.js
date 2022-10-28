import { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import Task from './Task/index';

function Tasks() {
  const [tasks, saveTasks] = useState([]);
  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      saveTasks(data.data);
      console.log(tasks);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>Description</th>
            <th>Action</th>
          </tr>
          {tasks.map((task) => {
            return <Task key={task._id} task={task} />;
          })}
        </tbody>
      </table>
    </section>
  );
}

export default Tasks;
