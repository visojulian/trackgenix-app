import React from 'react';
import styles from './super-admins.module.css';
import { useEffect, useState } from 'react';
import SuperAdminsList from './List';
import Modal from './Modal';

function SuperAdmins() {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [showModal, setModal] = useState(false);
  const [superAdminId, setSuperAdminId] = useState();

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await response.json();
      setSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const closeModal = () => {
    setModal(false);
  };

  const deleteSuperAdmin = async (id) => {
    await fetch(`http://localhost:4000/super-admins/${id}`, {
      method: 'DELETE'
    });
    setSuperAdmins([...superAdmins.filter((superAdmin) => superAdmin._id !== id)]);
  };

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        deleteSuperAdmin={deleteSuperAdmin}
        superAdminId={superAdminId}
      />
      <div>
        <SuperAdminsList
          superAdmins={superAdmins}
          setModal={setModal}
          setSuperAdminId={setSuperAdminId}
        />
      </div>
    </section>
  );
}

export default SuperAdmins;
