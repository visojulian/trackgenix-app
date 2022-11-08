import React from 'react';
import Button from '../Button';
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
            <Button
              text={isActionModal ? 'Cancel' : 'Accept'}
              onClick={() => handleClose()}
              type="button"
              variant={isActionModal ? 'secondary' : 'primary'}
            />
            {isActionModal && (
              <Button
                text={actionButton}
                onClick={() => {
                  action();
                  handleClose();
                }}
                type="button"
                variant="primary"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
