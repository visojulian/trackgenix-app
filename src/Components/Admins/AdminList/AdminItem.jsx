import React from 'react';
import styles from '../admins.module.css';

const AdminItem = ({ admin, setModal, setAdminId, onClickAdmin }) => {
  return (
    <>
      <tr>
        <td
          className={styles.row}
          onClick={() => {
            onClickAdmin(admin._id);
          }}
        >
          {admin.name}
        </td>
        <td
          className={styles.row}
          onClick={() => {
            onClickAdmin(admin._id);
          }}
        >
          {admin.lastName}
        </td>
        <td
          className={styles.row}
          onClick={() => {
            onClickAdmin(admin._id);
          }}
        >
          {admin.email}
        </td>
        <td
          className={styles.row}
          onClick={() => {
            onClickAdmin(admin._id);
          }}
        >
          {admin.password}
        </td>
        <td className={styles.row}>
          <button
            onClick={() => {
              setAdminId(admin._id);
              setModal(true);
            }}
            className={styles.buttonDelete}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default AdminItem;
