import styles from './modal.module.css';

const Modal = ({ showModal, closeModal, onDelete, employeeId }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className={styles.container}>
      <section className={styles.modal}>
        <div className={styles.modalText}>
          <h4>Employee Removal</h4>
          <p>Do you want to remove this Employee? Changes cannot be undone.</p>
        </div>
        <div className={styles.buttons}>
          <button onClick={closeModal}>Close</button>
          <button onClick={() => onDelete(employeeId)}>Remove</button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
