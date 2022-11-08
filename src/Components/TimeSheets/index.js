import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './list.module.css';
import Table from '../Shared/Table';
import Button from '../Shared/Button/index';
import Modal from '../Shared/Modal';

const TimeSheets = () => {
  const history = useHistory();
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

  const deleteTimeSheet = async () => {
    setTimeSheet([...timeSheets.filter((timeSheet) => timeSheet._id !== timeSheetId)]);
    await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${timeSheetId}`, {
      method: 'DELETE'
    });
  };

  const onDelete = (id, showModal) => {
    setTimeSheetId(id);
    setShowModal(showModal);
  };

  const onRowClick = (id) => {
    history.push(`/time-sheets/form/${id}`);
  };

  return (
    <section className={styles.container}>
      <div className={styles.containerUpper}>
        <h2>TimeSheets</h2>
        <Table
          data={getTableData()}
          headers={headers}
          onDelete={onDelete}
          onRowClick={onRowClick}
        />
      </div>
      <Modal
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={true}
        action={deleteTimeSheet}
        actionButton="Delete"
      >
        <div>
          <h4>Delete Timesheet</h4>
          <p>Are you sure you want to delete this timesheet?</p>
          <p>Changes cannot be undone.</p>
        </div>
      </Modal>
      <Button
        text="Add Timesheet"
        type="submit"
        variant="primary"
        onClick={() => {
          history.push(`/time-sheets/form`);
        }}
      />
    </section>
  );
};

export default TimeSheets;
