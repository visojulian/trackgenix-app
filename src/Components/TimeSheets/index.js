import { useEffect, useState } from 'react';
import styles from './list.module.css';
import TimeSheet from './TimeSheet/index';
import Modal from '../Shared/Modal';

const TimeSheets = () => {
  const [timeSheets, setTimeSheet] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [modalChildren, setModalChildren] = useState();
  const [timeSheetId, setTimeSheetId] = useState();

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`);
      const data = await response.json();
      setTimeSheet(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleConfirm = () => {
    setIsActionModal(true);
    setModalChildren(
      <div>
        <h4>Delete Admin</h4>
        <p>Are you sure you want to delete this employee from admins?</p>
      </div>
    );
    setShowModal(true);
  };

  const deleteTimeSheet = async () => {
    const id = timeSheetId;
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
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={isActionModal}
        action={deleteTimeSheet}
        actionButton="Delete"
      >
        {modalChildren}
      </Modal>
      <table className={styles.table}>
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
                setShowModal={handleConfirm}
              />
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default TimeSheets;
