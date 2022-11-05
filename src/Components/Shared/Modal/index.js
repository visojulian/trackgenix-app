import React from 'react';
import styles from './modal.module.css';

const Modal = (props) => {
  const { children, isOpen, handleClose, isActionModal, action, actionButton } = props;
  let buttons;
  if (!isOpen) {
    return null;
  }
  if (isActionModal) {
    buttons = (
      <div className={styles.buttonsList}>
        <button className={styles.cancel} onClick={() => handleClose()}>
          Cancel
        </button>
        <button
          className={styles.confirm}
          onClick={() => {
            action();
            handleClose();
          }}
        >
          {actionButton}
        </button>
      </div>
    );
  } else {
    buttons = (
      <div className={styles.buttonsList}>
        <button className={styles.confirm} onClick={() => handleClose()}>
          Accept
        </button>
      </div>
    );
  }
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        {children}
        <div className={styles.buttonsWrapper}>{buttons}</div>
      </div>
    </div>
  );
};

export default Modal;
