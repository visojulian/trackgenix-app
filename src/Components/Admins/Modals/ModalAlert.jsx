import React from 'react';
import styles from './modal.module.css';

const ModalAlert = ({ adminId, deleteAdmin, modal, closeModal }) => {
  if (!modal) {
    return null;
  }

  const closeModalOk = () => {
    deleteAdmin(adminId);
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Admin</h3>
        <p className={styles.p}>Do you want to remove this Admin?</p>
        <p className={styles.p}>Changes cannot be undone.</p>
        <div className={styles.buttonContainer}>
          <button
            className={styles.buttonCancel}
            onClick={() => {
              closeModal();
            }}
          >
            Cancel
          </button>
          <button
            className={styles.buttonConfirm}
            onClick={() => {
              closeModalOk();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
