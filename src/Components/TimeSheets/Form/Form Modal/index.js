import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h3 className={styles.title}>{props.title}</h3>
        <div className={styles.buttons}>
          <button onClick={props.closeModal} className={styles.confirmButton}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
