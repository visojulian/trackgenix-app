import styles from './modal.module.css';

const FormModal = ({ showFormModal, formCloseModal }) => {
  if (!showFormModal) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.title}>
          <h4>holaaa</h4>
        </div>
        <div className={styles.buttons}>
          <button onClick={formCloseModal} className={styles.confirmButton}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
