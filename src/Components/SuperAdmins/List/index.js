import React from 'react';
import styles from './list.module.css';

const SuperAdminsList = (props) => {
  return (
    <div className={styles.container}>
      <h2>Super Admins</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {props.superAdmins.map((superAdmin) => {
            return (
              <tr key={superAdmin._id}>
                <td>{superAdmin.name}</td>
                <td>{superAdmin.lastName}</td>
                <td>{superAdmin.email}</td>
                <td>
                  <button
                    onClick={() => {
                      props.setSuperAdminId(superAdmin._id);
                      props.setModal(true);
                    }}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SuperAdminsList;
