import { useEffect, useState } from 'react';
import styles from './list.module.css';
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

  const getTableData = () => {
    return timeSheets.map((timesheet) => {
      return {
        ...timesheet,
        task: timesheet.task.description,
        employee: `${timesheet.employee.name} ${timesheet.employee.lastName}`,
        project: timesheet.project.name
      };
    });
  };

  const deleteTimeSheet = async (id) => {
    setTimeSheet([...timeSheets.filter((timeSheet) => timeSheet._id !== id)]);
    await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
      method: 'DELETE'
    });
  };

  const onClickEntity = (id) => {
    window.location.assign(`/time-sheets/form?id=${id}`);
  };

  const onDelete = (id, showModal) => {
    setTimeSheetId(id);
    setShowModal(showModal);
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
      <Table
        data={getTableData()}
        headers={headers}
        onDelete={onDelete}
        onClickEntity={onClickEntity}
      />
    </section>
  );
};

export default TimeSheets;
