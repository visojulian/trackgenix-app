import styles from '../FormModal/formModal.module.css';

const FormModal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <section className={styles.modal}>
        <div className={styles.modalText}>
          <h4>Missing data</h4>
          <p>You must fill in all of the fields!</p>
        </div>
        <div>
          <button className={styles.button} onClick={props.onClose}>
            Close
          </button>
        </div>
      </section>
    </div>
  );
};

export default FormModal;
