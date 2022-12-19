import React from 'react';
import { Button } from 'Components/Shared';
import styles from './modal.module.css';

const Modal = (props) => {
  const { children, isOpen, handleClose, action } = props;
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        {children}
        <div className={styles.buttonsWrapper}>
          <div className={styles.buttonsList}>
            <Button text="Cancel" onClick={() => handleClose()} type="button" variant="secondary" />
            <Button
              text="Confirm"
              onClick={() => {
                action();
                handleClose();
              }}
              type="button"
              variant="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
