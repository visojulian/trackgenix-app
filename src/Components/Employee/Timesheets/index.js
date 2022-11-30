import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTimesheets } from 'redux/timeSheets/thunks';
import { Button, Modal, Spinner, Table } from 'Components/Shared';
import styles from './list.module.css';

const Timesheets = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {
    list: timesheets,
    isLoading: timesheetsIsLoading,
    error: timesheetsError
  } = useSelector((state) => state.timeSheets);
  const { user, isLoading: userIsLoading, error: userError } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getTimesheets());
  }, []);

  const employeeTimesheets = timesheets.filter((timesheet) => timesheet.employee._id === user._id);

  const tableData = employeeTimesheets.map((timesheet) => {
    return {
      hours: timesheet.hours,
      task: timesheet.task.description,
      project: timesheet.project.name,
      description: timesheet.description,
      date: timesheet.date
    };
  });

  if (timesheetsIsLoading || userIsLoading) {
    return <Spinner isLoading={true} />;
  }

  if (timesheetsError || userError) {
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
        headers={['Timesheet', 'Project', 'Task', 'Hours', 'Date']}
        values={['description', 'project', 'task', 'hours', 'date']}
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
