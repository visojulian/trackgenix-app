import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTimesheets, deleteTimesheet } from 'redux/timeSheets/thunks';
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
  const [timeSheetId, setTimeSheetId] = useState();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getTimesheets());
  }, []);

  const employeeTimesheets = timesheets.filter((timesheet) => timesheet.employee._id === user._id);

  useEffect(() => {
    setTableData(
      employeeTimesheets.map((timesheet) => {
        return {
          _id: timesheet._id,
          hours: timesheet.hours,
          task: timesheet.task.description,
          project: timesheet.project.name,
          description: timesheet.description,
          date: timesheet.date.slice(0, 10)
        };
      })
    );
  }, [timesheets]);

  const onDelete = (id, showModal) => {
    setTimeSheetId(id);
    setShowModal(showModal);
  };

  const onRowClick = (id) => {
    history.push(`timesheets/form/${id}`);
  };

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

  if (timesheets.length) {
    return (
      <div className={styles.container}>
        <h2>Timesheets</h2>
        <Table
          data={tableData}
          headers={['Timesheet', 'Project', 'Task', 'Hours', 'Date']}
          values={['description', 'project', 'task', 'hours', 'date']}
          onDelete={onDelete}
          onRowClick={onRowClick}
        />
        <Modal
          isOpen={showModal}
          handleClose={setShowModal}
          isActionModal={true}
          action={() => {
            timeSheetId && dispatch(deleteTimesheet(timeSheetId));
          }}
          actionButton="Delete"
        >
          <div>
            <h4>Delete Timesheet</h4>
            <p>Are you sure you want to delete this timesheet?</p>
            <p>Changes cannot be undone.</p>
          </div>
        </Modal>
        <div className={styles.buttons}>
          <Button
            text="Add Timesheet"
            type="submit"
            variant="primary"
            onClick={() => {
              history.push(`timesheets/form`);
            }}
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
      </div>
    );
  } else {
    dispatch(getTimesheets());
    return null;
  }
};

export default Timesheets;
