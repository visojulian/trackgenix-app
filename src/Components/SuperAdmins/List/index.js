import React from 'react';
import styles from './list.module.css';
import Delete from '../assets/trash.png';

const SuperAdminsList = (props) => {
  const onClickSuperAdmin = (id) => {
    window.location.assign(`/super-admins/form?id=${id}`);
  };

  return (
    <div className={styles.container}>
      <h2>Super Admins</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>
              <img src={Delete} />
            </th>
          </tr>
        </thead>
        <tbody>
          {props.superAdmins.map((superAdmin) => {
            return (
              <tr
                key={superAdmin._id}
                onClick={() => {
                  onClickSuperAdmin(superAdmin._id);
                }}
              >
                <td>{superAdmin.name}</td>
                <td>{superAdmin.lastName}</td>
                <td>{superAdmin.email}</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={(event) => {
                      event.stopPropagation();
                      props.setDeleteSuperAdmin(superAdmin._id);
                      props.setModal(true);
                    }}
                  >
                    x
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button
          className={styles.buttonAdd}
          onClick={() => {
            window.location.assign('super-admins/form');
          }}
        >
          Add Super Admin
        </button>
      </div>
    </div>
  );
};

export default SuperAdminsList;
