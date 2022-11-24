import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAdmins, deleteAdmin } from 'redux/admins/thunks';
import styles from './admins.module.css';
import { Button, Modal, Spinner, Table } from 'Components/Shared';

const Admins = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [adminId, setAdminId] = useState('');
  const admins = useSelector((state) => state.admins.list);
  const isLoading = useSelector((state) => state.admins.isLoading);
  const values = ['name', 'lastName', 'email'];
  const headers = ['Name', 'Last Name', 'Email'];
  const error = useSelector((state) => state.admins.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const onDelete = (id, showModal) => {
    setAdminId(id);
    setShowModal(showModal);
  };

  const onRowClick = (id) => {
    history.push(`/admins/form/${id}`);
  };

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h1>{error}</h1>
      </div>
    );
  }

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
          action={() => adminId && dispatch(deleteAdmin(adminId))}
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
