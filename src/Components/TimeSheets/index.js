import { useEffect, useState } from 'react';
import styles from './list.module.css';
// import TimeSheet from './TimeSheet/index';
import Modal from './Modal/index';
import Table from '../Shared/Table';

const TimeSheets = () => {
  const [timeSheets, setTimeSheet] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [timeSheetId, setTimeSheetId] = useState();
  const headers = ['description', 'date', 'hours', 'task', 'employee', 'project'];

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`);
      const data = await response.json();
      setTimeSheet(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteTimeSheet = async (id) => {
    setTimeSheet([...timeSheets.filter((timeSheet) => timeSheet._id !== id)]);
    await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
      method: 'DELETE'
    });
  };

  return (
    <section className={styles.container}>
      <div className={styles.containerUpper}>
        <h2>TimeSheets</h2>
        <button
          className={styles.button}
          onClick={() => {
            window.location.assign(`/time-sheets/form`);
          }}
        >
          New TimeSheet
        </button>
      </div>
      <Modal
        show={showModal}
        closeModal={closeModal}
        deleteTimeSheet={deleteTimeSheet}
        timeSheetId={timeSheetId}
        title="Are you sure that you want to delete this time sheet?"
      />
      {/* <table className={styles.table}>
        <thead>
          <tr style={{ display: 'flex', justifyContent: 'center' }}>
            <th style={{ flexBasis: '25%' }}>Description</th>
            <th style={{ flexBasis: '15%' }}>Date</th>
            <th style={{ flexBasis: '10%' }}>Hours</th>
            <th style={{ flexBasis: '20%' }}>Task</th>
            <th style={{ flexBasis: '20%' }}>Employee</th>
            <th style={{ flexBasis: '10%' }}>Project</th>
            <th style={{ flexBasis: '10%' }}>Delete TimeSheet</th>
          </tr>
        </thead>
        <tbody>
          {timeSheets.map((timeSheet) => {
            return (
              <TimeSheet
                key={timeSheets._id}
                timeSheet={timeSheet}
                setTimeSheetId={setTimeSheetId}
                setShowModal={setShowModal}
              />
            );
          })}
        </tbody>
      </table> */}
      <Table
        data={timeSheets}
        headers={headers}
        setDelete={setTimeSheetId}
        setModal={setShowModal}
      />
    </section>
  );
};

export default TimeSheets;
