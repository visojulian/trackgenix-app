import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './profile.module.css';
import { Spinner, Animation } from 'Components/Shared';

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
      <div className={styles.containerBox}>
        <Animation />
        <div>
          <h2>Profile information</h2>
          <div className={styles.info}>
            <div className={styles.box1}>
              <div className={styles.fields}>
                <h5>Name</h5>
                <p>{adminAccount.name}</p>
              </div>
              <div className={styles.fields}>
                <h5>Last Name</h5>
                <p>{adminAccount.lastName}</p>
              </div>
            </div>
            <div className={styles.box2}>
              <div className={styles.fields}>
                <h5>Email</h5>
                <p>{adminAccount.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
