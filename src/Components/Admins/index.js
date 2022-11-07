import React, { useEffect, useState } from 'react';
import styles from './admins.module.css';
import AdminList from './AdminList/AdminList';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';

const Admins = () => {
  const history = useHistory();
  const [admins, saveAdmins] = useState([]);
  const [admin, setAdmin] = useState({});
  const [showModal, setShowModal] = useState(false);

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
    history.push(`/admins/form/${id}`);
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={true}
        action={deleteAdmin}
        actionButton="Delete"
      >
        <div>
          <h4>Delete Admin</h4>
          <p>Are you sure you want to delete this employee from admins?</p>
          <p>Changes cannot be undone.</p>
        </div>
      </Modal>
      <div className={styles.container}>
        <h1>Admins</h1>
        <AdminList
          adminList={admins}
          setModal={() => setShowModal(true)}
          showModal={showModal}
          setAdmin={setAdmin}
          onClickAdmin={onClickAdmin}
        />
      </div>
      <div className={styles.container}>
        <Button
          text="Add Admin"
          type="submit"
          variant="primary"
          onClick={() => {
            history.push(`/admins/form`);
          }}
        />
      </div>
    </>
  );
};

export default Admins;
