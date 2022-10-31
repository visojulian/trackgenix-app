import React from 'react';
import styles from '../admins.module.css';
import AdminItem from './AdminItem';

const AdminList = ({ adminList, setModal, setAdminId }) => {
  return (
    <>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th className={styles.tableTitle}>Name</th>
            <th className={styles.tableTitle}>Last Name</th>
            <th className={styles.tableTitle}>Email</th>
            <th className={styles.tableTitle}>Password</th>
            <th className={styles.tableTitle}></th>
          </tr>
        </thead>
        <tbody>
          {adminList.map((admin) => {
            return (
              <AdminItem
                key={admin._id}
                admin={admin}
                setModal={setModal}
                setAdminId={setAdminId}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AdminList;
