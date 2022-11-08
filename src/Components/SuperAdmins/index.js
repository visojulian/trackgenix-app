import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './super-admins.module.css';
import Table from '../Shared/Table/index';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';

const SuperAdmins = () => {
  const history = useHistory();
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

  const deleteSuperAdmin = async () => {
    setSuperAdmins([...superAdmins.filter((superAdmin) => superAdmin._id !== superAdminId)]);
    await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${superAdminId}`, {
      method: 'DELETE'
    });
  };

  const onDelete = (id, showModal) => {
    setSuperAdminId(id);
    setShowModal(showModal);
  };

  const onRowClick = (id) => {
    history.push(`/super-admins/form/${id}`);
  };

  return (
    <section className={styles.container}>
      <Table data={superAdmins} headers={headers} onDelete={onDelete} onRowClick={onRowClick} />
      <Modal
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={true}
        action={deleteSuperAdmin}
        actionButton="Delete"
      >
        <div>
          <h4>Delete Super Admin</h4>
          <p>Are you sure you want to delete this employee from super admins?</p>
          <p>Changes cannot be undone.</p>
        </div>
      </Modal>
      <Button
        text="Add Super Admin"
        type="submit"
        variant="primary"
        onClick={() => {
          history.push('super-admins/form');
        }}
      />
    </section>
  );
};

export default SuperAdmins;
