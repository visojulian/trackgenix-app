import { useEffect, useState } from 'react';
import styles from './time-sheets.module.css';
import TimeSheet from './TimeSheet/index';
//import Modal from './Modal/index';

const TimeSheets = () => {
  const [timeSheets, setTimeSheet] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`);
      const data = await response.json();
      setTimeSheet(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Delete Task</th>
          </tr>
        </thead>
        <tbody>
          {timeSheets.map((timeSheet) => {
            return <TimeSheet key={timeSheets._id} timeSheet={timeSheet} />;
          })}
        </tbody>
      </table>
    </section>
  );
};

export default TimeSheets;
