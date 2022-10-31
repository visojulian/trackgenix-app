import React, { useEffect, useState } from 'react';
import styles from './admins.module.css';
import AdminList from './AdminList/AdminList';
import ModalAlert from './Modals/ModalAlert';

const Admins = () => {
  const [admins, saveAdmins] = useState([]);
  const [modal, setModal] = useState(false);
  const [adminId, setAdminId] = useState();

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
    setModal(false);
  };

  return (
    <>
      <ModalAlert
        adminId={adminId}
        deleteAdmin={deleteAdmin}
        modal={modal}
        closeModal={closeModal}
      />
      <div className={styles.container}>
        <h1>Admins</h1>
        <AdminList adminList={admins} setModal={setModal} setAdminId={setAdminId} />
      </div>
      <div className={styles.container}>
        <a href="/admins/addAdmin" className={styles.buttonAddAdmin}>
          ➕AddAdmin
        </a>
      </div>
    </>
  );
};

export default Admins;
