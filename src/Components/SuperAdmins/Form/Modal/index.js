import styles from './form-modal.module.css';

const FormModal = ({ showFormModal, formCloseModal, serverMessage }) => {
  if (!showFormModal) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div>
          <h4 className={styles.message}>{serverMessage}</h4>
        </div>
        <div>
          <button onClick={formCloseModal} className={styles.buttonConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
