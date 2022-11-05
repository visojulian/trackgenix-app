import React from 'react';
import styles from './super-admins.module.css';
import { useEffect, useState } from 'react';
import SuperAdminsList from './List';
import Modal from '../Shared/Modal';

const SuperAdmins = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [superAdminId, setSuperAdminId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [modalChildren, setModalChildren] = useState();

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await response.json();
      setSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleConfirm = () => {
    setIsActionModal(true);
    setModalChildren(
      <div>
        <h4>Delete Super Admin</h4>
        <p>Are you sure you want to delete this employee from super admins?</p>
      </div>
    );
    setShowModal(true);
  };

  const deleteSuperAdmin = async () => {
    const id = superAdminId;
    await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'DELETE'
    });
    setSuperAdmins([...superAdmins.filter((superAdmin) => superAdmin._id !== id)]);
  };

  return (
    <section className={styles.container}>
      <Modal
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={isActionModal}
        action={deleteSuperAdmin}
        actionButton="Delete"
      >
        {modalChildren}
      </Modal>
      <div>
        <SuperAdminsList
          superAdmins={superAdmins}
          setModal={handleConfirm}
          setSuperAdminId={setSuperAdminId}
        />
      </div>
    </section>
  );
};

export default SuperAdmins;
