import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Table from '../Shared/Table/index';
// import EmployeesList from './List';
import Modal from './Modal';

function Employees() {
  const [employees, saveEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [employeeId, setEmployeeId] = useState();
  const headers = ['name', 'lastName', 'phone', 'email'];

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      saveEmployees(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteEmployee = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
      method: 'DELETE'
    });
    saveEmployees([...employees.filter((employee) => employee._id !== id)]);
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        onDelete={deleteEmployee}
        employeeId={employeeId}
      />
      <h2>Employees</h2>
      <div>
        <Table
          data={employees}
          headers={headers}
          setDelete={setEmployeeId}
          setModal={setShowModal}
          url={'employees'}
        />
      </div>
    </section>
  );
}

export default Employees;
