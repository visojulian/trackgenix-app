import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './super-admins.module.css';
import Table from '../Shared/Table/index';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Spinner from '../Shared/Spinner/spinner';
import { getSuperAdmins } from '../../redux/superAdmins/thunks';
import { useSelector, useDispatch } from 'react-redux';

const SuperAdmins = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  // const [superAdminId, setSuperAdminId] = useState();
  const { list: superAdmins, isLoading } = useSelector((state) => state.superAdmins);
  const dispatch = useDispatch();
  const values = ['name', 'lastName', 'email'];
  const headers = ['Name', 'Last Name', 'Email'];

  useEffect(async () => {
    dispatch(getSuperAdmins());
  }, []);

  const deleteSuperAdmin = async () => {
    // setSuperAdmins([...superAdmins.filter((superAdmin) => superAdmin._id !== superAdminId)]);
    // await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${superAdminId}`, {
    //   method: 'DELETE'
    // });
  };

  // const onDelete = (id, showModal) => {
  //   setSuperAdminId(id);
  //   setShowModal(showModal);
  // };

  const onRowClick = (id) => {
    history.push(`/super-admins/form/${id}`);
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Super Admins</h1>
        <Spinner isLoading={isLoading} />
        <Table
          data={superAdmins}
          headers={headers}
          values={values}
          // onDelete={onDelete}
          onRowClick={onRowClick}
        />
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
      </div>
    </>
  );
};

export default SuperAdmins;
