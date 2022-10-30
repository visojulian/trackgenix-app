import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import EmployeesList from './List';

function Employees() {
  const [employees, saveEmployees] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      saveEmployees(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <div>
        <EmployeesList list={employees} />
      </div>
    </section>
  );
}

export default Employees;
