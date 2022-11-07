import React from 'react';
import Button from '../../Shared/Button';
import styles from '../admins.module.css';

const AdminItem = ({ admin, setModal, setAdmin, onClickAdmin }) => {
  return (
    <>
      <tr
        onClick={() => {
          onClickAdmin(admin._id);
        }}
      >
        <td className={styles.row}>{admin.name}</td>
        <td className={styles.row}>{admin.lastName}</td>
        <td className={styles.row}>{admin.email}</td>
        <td className={styles.row}>{admin.password}</td>
        <td className={styles.row}>
          <Button
            text="&times;"
            type="submit"
            variant="primary"
            onClick={(e) => {
              e.stopPropagation();
              setAdmin({ id: admin._id, name: admin.name });
              setModal(true);
            }}
          />
        </td>
      </tr>
    </>
  );
};

export default AdminItem;
