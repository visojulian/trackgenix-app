import React from 'react';
import styles from '../admins.module.css';

function AdminItem({ admin, setModal, setAdminId }) {
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
      </tr>
    </>
  );
}

export default AdminItem;
