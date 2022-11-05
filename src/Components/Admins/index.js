import React, { useEffect, useState } from 'react';
import styles from './admins.module.css';
import AdminList from './AdminList/AdminList';
import Modal from '../Shared/Modal';

const Admins = () => {
  const [admins, saveAdmins] = useState([]);
  const [admin, setAdmin] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [modalChildren, setModalChildren] = useState();

  useEffect(async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const data = await res.json();
      saveAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteAdmin = async () => {
    const id = admin.id;
    saveAdmins([...admins.filter((admin) => admin._id !== id)]);
    await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'DELETE'
    });
  };

  const onClickAdmin = (id) => {
    window.location.assign(`/admins/form?id=${id}`);
  };

  const handleConfirm = () => {
    setIsActionModal(true);
    setModalChildren(
      <div>
        <h4>Add New Project</h4>
        <p>Are you sure you want to delete this employee from admins?</p>
      </div>
    );
    setShowModal(true);
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={isActionModal}
        action={deleteAdmin}
        actionButton="Delete"
      >
        {modalChildren}
      </Modal>
      <div className={styles.container}>
        <h1>Admins</h1>
        <AdminList
          adminList={admins}
          setModal={handleConfirm}
          showModal={showModal}
          setAdmin={setAdmin}
          onClickAdmin={onClickAdmin}
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
