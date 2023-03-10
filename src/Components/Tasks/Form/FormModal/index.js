import styles from './modal.module.css';

const FormModal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3 className={styles.modalTitle}>{props.title}</h3>
        <div className={styles.buttonsDiv}>
          <div>
            <button onClick={props.closeModal} className={styles.buttonCancel}>
              Acknowledge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
