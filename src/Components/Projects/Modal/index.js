import styles from './modal.module.css';

const Modal = (props) => {
  const { show, handleModal, deleteProject, id } = props;
  const closeModal = () => handleModal(false);
  const confirmDelete = () => {
    deleteProject(id);
    closeModal();
  };

  if (!show) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <button onClick={() => closeModal()} className={styles.close}>
          &times;
        </button>
        <h3>Modal</h3>
        <button onClick={() => confirmDelete()}>Confirm</button>
      </div>
    </div>
  );
};

export default Modal;
