import React, { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Table from '../Shared/Table/index';
import ModalAlert from './Modals/ModalAlert';

const Admins = () => {
  const [admins, saveAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [adminId, setAdminId] = useState();
  const headers = ['name', 'lastName', 'email'];

  useEffect(async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const data = await res.json();
      saveAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteAdmin = async (id) => {
    saveAdmins([...admins.filter((admin) => admin._id !== id)]);
    await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'DELETE'
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <ModalAlert
        adminId={adminId}
        deleteAdmin={deleteAdmin}
        showModal={showModal}
        closeModal={closeModal}
      />
      <div className={styles.container}>
        <h1>Admins</h1>
        <Table
          data={admins}
          headers={headers}
          setDelete={setAdminId}
          setShowModal={setShowModal}
          url={'admins'}
        />
      </div>
      <div className={styles.container}>
        <a href="/admins/form" className={styles.buttonAddAdmin}>
          ➕AddAdmin
        </a>
      </div>
    </>
  );
};

export default Admins;
