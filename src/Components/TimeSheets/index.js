import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTimesheets, deleteTimesheet } from '../../redux/timeSheets/thunks';
import styles from './list.module.css';
import Table from '../Shared/Table';
import Button from '../Shared/Button/index';
import Modal from '../Shared/Modal';
import Spinner from '../Shared/Spinner';

const TimeSheets = () => {
  const { list: timeSheets, isLoading, error } = useSelector((state) => state.timeSheets);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [timeSheetId, setTimeSheetId] = useState();
  const headers = ['Description', 'Date', 'Hours', 'Task', 'Employee', 'Project'];

  useEffect(() => {
    dispatch(getTimesheets());
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

  const onDelete = (id, showModal) => {
    setTimeSheetId(id);
    setShowModal(showModal);
  };

  const onRowClick = (id) => {
    history.push(`/time-sheets/form/${id}`);
  };

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  if (error) {
    <Modal isOpen={showModal} handleClose={setShowModal} isActionModal={false}>
      <div>
        <h4>There was an error</h4>
        <p>{error}</p>
      </div>
    </Modal>;
  }

  return (
    <div className={styles.container}>
      <h1>TimeSheets</h1>
      <Table
        data={getTableData()}
        headers={headers}
        values={headers.map((header) => header.toLowerCase())}
        onDelete={onDelete}
        onRowClick={onRowClick}
      />
      <Modal
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={true}
        action={() => timeSheetId && dispatch(deleteTimesheet(timeSheetId))}
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
    </div>
  );
};

export default TimeSheets;
