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
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteTask = async (id) => {
    saveTasks([...tasks.filter((task) => task._id !== id)]);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`);
    const data = await response.json();
    console.log(data);
    const responsev2 = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    const datav2 = await responsev2.json();
    console.log(datav2);
  };

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return <Task key={task._id} task={task} deleteTask={deleteTask} />;
          })}
        </tbody>
      </table>
    </section>
  );
}

export default Tasks;
