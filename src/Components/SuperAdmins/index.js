import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './super-admins.module.css';
import { ButtonAdd, Modal, Spinner, Table } from 'Components/Shared';
import { getSuperAdmins, deleteSuperAdmin } from 'redux/superAdmins/thunks';
import { useSelector, useDispatch } from 'react-redux';

const SuperAdmins = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [superAdminId, setSuperAdminId] = useState();
  const {
    list: superAdmins,
    isLoading: superAdminsIsLoading,
    error: superAdminsError
  } = useSelector((state) => state.superAdmins);
  const { user, isLoading: userIsLoading, error: userError } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const values = ['name', 'lastName', 'email'];
  const headers = ['Name', 'Last Name', 'Email'];

  useEffect(() => {
    dispatch(getSuperAdmins());
  }, []);

  const onDelete = (id, showModal) => {
    setSuperAdminId(id);
    setShowModal(showModal);
  };

  const onRowClick = (id) => {
    if (id === user._id) {
      history.push('/super-admin/edit-profile');
    } else {
      history.push(`/super-admin/form/${id}`);
    }
  };

  if (superAdminsIsLoading || userIsLoading) {
    return <Spinner isLoading={true} />;
  }

  if (superAdminsError || userError) {
    return (
      <div className={styles.error}>
        <h4>There was an error</h4>
        <p>{superAdminsError || userError}</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <h2>Super Admins</h2>
        <Table
          data={superAdmins.filter((admin) => admin._id !== user._id)}
          headers={headers}
          values={values}
          onDelete={onDelete}
          onRowClick={onRowClick}
        />
        <Modal
          isOpen={showModal}
          handleClose={setShowModal}
          isActionModal={true}
          action={() => superAdminId && dispatch(deleteSuperAdmin(superAdminId))}
          actionButton="Delete"
        >
          <div>
            <h4>Delete Super Admin</h4>
            <p>Are you sure you want to delete this employee from super admins?</p>
            <p>Changes cannot be undone.</p>
          </div>
        </Modal>
        <div className={styles.buttonMargin}>
          <ButtonAdd
            text="Add Super Admin"
            type="submit"
            variant="main"
            onClick={() => {
              history.push('/super-admin/form');
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SuperAdmins;
