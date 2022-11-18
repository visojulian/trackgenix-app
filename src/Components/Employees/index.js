import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees, deleteEmployee } from '../../redux/employees/thunks';
import styles from './employees.module.css';
import Table from '../Shared/Table/index';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Spinner from '../Shared/Spinner/spinner';

function Employees() {
  const [employeeId, setEmployeeId] = useState();
  const [showModal, setShowModal] = useState(false);
  const values = ['name', 'lastName', 'phone', 'email'];
  const headers = ['Name', 'Last Name', 'Phone', 'Email'];
  const history = useHistory();
  const dispatch = useDispatch();
  const { list: employeesList, isLoading, error } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const onDelete = (id, showModal) => {
    setEmployeeId(id);
    setShowModal(showModal);
  };

  const onRowClick = (id) => {
    history.push(`/employees/form/${id}`);
  };

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  if (error) {
    return (
      <div className={styles.errorDiv}>
        <h4>There was an error!</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <h1>Employees</h1>
        <Table
          data={employeesList}
          headers={headers}
          values={values}
          onDelete={onDelete}
          onRowClick={onRowClick}
        />
        <Modal
          isOpen={showModal}
          handleClose={setShowModal}
          isActionModal={true}
          action={() => employeeId && dispatch(deleteEmployee(employeeId))}
          actionButton="Delete"
        >
          <div>
            <h4>Delete employee</h4>
            <p>Are you sure you want to delete this employee?</p>
            <p>Changes cannot be undone.</p>
          </div>
        </Modal>
        <Button
          text="Add Employee"
          type="submit"
          variant="primary"
          onClick={() => {
            history.push(`/employees/form`);
          }}
        />
      </div>
    </>
  );
}

export default Employees;
