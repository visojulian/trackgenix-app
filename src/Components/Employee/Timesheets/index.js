import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTimesheets } from 'redux/timeSheets/thunks';
import { Button, Modal, Spinner, Table } from 'Components/Shared';
import styles from './list.module.css';

const Timesheets = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {
    list: timesheets,
    isLoading: timesheetsIsLoading,
    error: timesheetsError
  } = useSelector((state) => state.timeSheets);

  useEffect(() => {
    dispatch(getTimesheets());
  }, []);

  const employeeTimesheets = timesheets.filter((timesheet) => timesheet.employee._id === id);

  const tableData = employeeTimesheets.map((timesheet) => {
    return {
      hours: timesheet.hours,
      task: timesheet.task.description,
      project: timesheet.project.name
    };
  });

  if (timesheetsIsLoading) {
    return <Spinner isLoading={true} />;
  }

  if (timesheetsError) {
    return (
      <Modal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
        isActionModal={false}
        action={() => history.goBack()}
      >
        There was an error
      </Modal>
    );
  }

  return (
    <div className={styles.container}>
      <h2>List of worked hours by projects and tasks</h2>
      <Table
        data={tableData}
        headers={['Project', 'Task', 'Hours']}
        values={['project', 'task', 'hours']}
        onDelete={() => {}}
        onRowClick={() => {}}
      />
      <Button
        text="Go Back"
        type="button"
        variant="secondary"
        onClick={() => {
          history.goBack();
        }}
      />
    </div>
  );
};

export default Timesheets;
