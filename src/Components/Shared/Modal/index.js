import React from 'react';
import styles from './modal.module.css';

const Modal = (props) => {
  const { children, isOpen, handleClose, isActionModal, action, actionButton } = props;
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        {children}
        <div className={styles.buttonsWrapper}>
          <div className={styles.buttonsList}>
            <button
              className={isActionModal ? styles.cancel : styles.confirm}
              onClick={() => handleClose()}
            >
              {isActionModal ? 'Cancel' : 'Accept'}
            </button>
            {isActionModal && (
              <button
                className={styles.confirm}
                onClick={() => {
                  action();
                  handleClose();
                }}
              >
                {actionButton}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
