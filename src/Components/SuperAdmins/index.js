import React from 'react';
import styles from './super-admins.module.css';
import { useEffect, useState } from 'react';
import SuperAdminsList from './List';

function SuperAdmins() {
  const [superAdmins, setSuperAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await response.json();
      setSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // const deleteItem = (id) => {}

  return (
    <section className={styles.container}>
      <div>
        <SuperAdminsList superAdmins={superAdmins} />
      </div>
    </section>
  );
}

export default SuperAdmins;
