import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.showModal) {
    return null;
  }

  return (
    <section className={styles.modal}>
      <div className={styles.modalText}>
        <h4>Employee Removal</h4>
        <p>Do you want to remove this Employee? Changes cannot be undone.</p>
      </div>
      <div className={styles.buttons}>
        <button onClick={props.closeModal}>Close</button>
        <button onClick={props.onDelete}>Remove</button>
      </div>
    </section>
  );
};

export default Modal;
