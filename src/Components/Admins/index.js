import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './admins.module.css';
import Table from '../Shared/Table/index';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';

const Admins = () => {
  const history = useHistory();
  const [admins, saveAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [adminId, setAdminId] = useState();
  const values = ['name', 'lastName', 'email'];
  const headers = ['Name', 'Last Name', 'Email'];

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
    saveAdmins([...admins.filter((admin) => admin._id !== adminId)]);
    await fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`, {
      method: 'DELETE'
    });
  };

  const onDelete = (id, showModal) => {
    setAdminId(id);
    setShowModal(showModal);
  };

  const onRowClick = (id) => {
    history.push(`/admins/form/${id}`);
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Admins</h1>
        <Table
          data={admins}
          headers={headers}
          values={values}
          onDelete={onDelete}
          onRowClick={onRowClick}
        />
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
