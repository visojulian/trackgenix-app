import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './profile.module.css';
import { Spinner } from 'Components/Shared';

const AdminProfile = () => {
  const { user, isLoading: userIsLoading } = useSelector((state) => state.user);
  const [adminAccount, setAdminAccount] = useState({
    name: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    if (user) {
      setAdminAccount({
        name: user.name,
        lastName: user.lastName,
        email: user.email
      });
    }
  }, [user]);

  if (userIsLoading) {
    return <Spinner isLoading={true} />;
  }

  return (
    <div className={styles.container}>
      <h1>Profile information</h1>
      <div className={styles.info}>
        <div className={styles.box1}>
          <div className={styles.fields}>
            <h4>Name</h4>
            <p>{adminAccount.name}</p>
          </div>
          <div className={styles.fields}>
            <h4>Last Name</h4>
            <p>{adminAccount.lastName}</p>
          </div>
        </div>
        <div className={styles.box2}>
          <div className={styles.fields}>
            <h4>Email</h4>
            <p>{adminAccount.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
