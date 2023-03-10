import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './superAdminProfile.module.css';
import { Button, Modal, Spinner, Animation } from 'Components/Shared';
import { deleteSuperAdmin, getSuperAdmins } from 'redux/superAdmins/thunks';
import { logout } from 'redux/auth/thunks';

const SuperAdminProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutUser = () => dispatch(logout());
  const [showModal, setShowModal] = useState(false);
  const [superAdminId, setSuperAdminId] = useState();
  const { user, isLoading: userIsLoading } = useSelector((state) => state.user);
  const {
    list: superAdmins,
    isLoading: superAdminsIsLoading,
    error: superAdminsError
  } = useSelector((state) => state.superAdmins);
  const [superAdminAccount, setSuperAdminAccount] = useState({
    name: '',
    lastName: '',
    email: ''
  });
  const currentSuperAdmin = superAdmins.find((superAdmin) => superAdmin._id === user._id);

  useEffect(() => {
    dispatch(getSuperAdmins());
  }, []);

  useEffect(() => {
    if (currentSuperAdmin && user) {
      setSuperAdminId(user._id);
      setSuperAdminAccount({
        name: currentSuperAdmin.name,
        lastName: currentSuperAdmin.lastName,
        email: currentSuperAdmin.email
      });
    }
  }, [currentSuperAdmin, user]);

  const getModalContent = () => {
    if (superAdminsError) {
      return (
        <div>
          <h4>An error occurred</h4>
          <p>{superAdminsError}</p>
        </div>
      );
    }
    return (
      <div>
        <h4>Delete account</h4>
        <p>Are you sure you want to delete your account?</p>
        <p>Changes cannot be undone.</p>
      </div>
    );
  };

  const editAccount = () => {
    history.push('/super-admin/edit-profile');
  };

  const goBack = () => {
    history.push('/auth/login');
  };

  if (superAdminsIsLoading || userIsLoading) {
    return <Spinner isLoading={true} />;
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <h2>Profile information</h2>
        <div className={styles.info}>
          <div className={styles.box1}>
            <div className={styles.fields}>
              <h5>Name</h5>
              <p>{superAdminAccount.name}</p>
            </div>
            <div className={styles.fields}>
              <h5>Last Name</h5>
              <p>{superAdminAccount.lastName}</p>
            </div>
          </div>
          <div className={styles.box2}>
            <div className={styles.fields}>
              <h5>Email</h5>
              <p>{superAdminAccount.email}</p>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            text="Edit"
            type="submit"
            variant="primary"
            onClick={() => {
              editAccount();
            }}
          />
          <Button
            text="Delete"
            type="submit"
            variant="secondary"
            onClick={() => setShowModal(true)}
          />
        </div>
        <Modal
          isOpen={showModal}
          handleClose={setShowModal}
          isActionModal={true}
          action={() => {
            superAdminId && dispatch(deleteSuperAdmin(superAdminId) && logoutUser);
            goBack();
          }}
          actionButton="Delete"
        >
          {getModalContent()}
        </Modal>
      </div>
      <Animation />
    </div>
  );
};

export default SuperAdminProfile;
