import React, { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Table from '../Shared/Table/index';
import Modal from './Modal';

const SuperAdmins = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [superAdminId, setSuperAdminId] = useState();
  const headers = ['name', 'lastName', 'email'];

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await response.json();
      setSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteSuperAdmin = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'DELETE'
    });
    setSuperAdmins([...superAdmins.filter((superAdmin) => superAdmin._id !== id)]);
  };

  const onDelete = (id, showModal) => {
    setSuperAdminId(id);
    setShowModal(showModal);
  };

  const onRowClick = (id) => {
    window.location.assign(`/super-admins/form?id=${id}`);
  };

  const closeModal = () => {
    setShowModal(false);
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
        <Table data={superAdmins} headers={headers} onDelete={onDelete} onRowClick={onRowClick} />
      </div>
    </section>
  );
};

export default SuperAdmins;
