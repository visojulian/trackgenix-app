import React from 'react';
import styles from '../admins.module.css';

const AdminItem = ({ admin, setModal, setAdminId }) => {
  return (
    <>
      <tr>
        <td className={styles.row}>{admin.name}</td>
        <td className={styles.row}>{admin.lastName}</td>
        <td className={styles.row}>{admin.email}</td>
        <td className={styles.row}>{admin.password}</td>
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
        <td className={styles.row}>
          <a href="/admins/updateAdmin" className={styles.buttonUpdate}>
            Update
          </a>
        </td>
      </tr>
    </>
  );
};

export default AdminItem;
