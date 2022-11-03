import styles from '../FormModal/formModal.module.css';

const FormModal = ({ show, errorMsg, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <section className={styles.modal}>
        <div className={styles.modalText}>
          <h4>{errorMsg}</h4>
        </div>
        <div>
          <button className={styles.button} onClick={onClose}>
            Close
          </button>
        </div>
      </section>
    </div>
  );
};

export default FormModal;
