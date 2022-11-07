import React from 'react';
import styles from '../admins.module.css';
import AdminItem from './AdminItem';
import Delete from '../../../assets/trash.png';

const AdminList = ({ adminList, setModal, setAdminId, onClickAdmin }) => {
  return (
    <>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>
              <img src={Delete} />
            </th>
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
                onClickAdmin={onClickAdmin}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AdminList;
