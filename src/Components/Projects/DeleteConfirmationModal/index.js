import styles from './modal.module.css';

const DeleteConfirmationModal = (props) => {
  const { show, handleModal, deleteProject, project } = props;
  const closeModal = () => handleModal(false);
  const confirmDelete = () => {
    deleteProject(project.id);
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
        <h3>Alert!</h3>
        <p>Are you sure you want to remove project: {project.name}?</p>
        <button onClick={() => confirmDelete()} className={styles.confirm}>
          Confirm
        </button>
        <button onClick={() => closeModal()} className={styles.cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
