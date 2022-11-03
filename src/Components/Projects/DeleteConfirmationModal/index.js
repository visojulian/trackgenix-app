import styles from './modal.module.css';

const DeleteConfirmationModal = (props) => {
  const { show, handleModal, deleteEntity, entity } = props;
  const closeModal = () => handleModal(false);
  const confirmDelete = () => {
    deleteEntity(entity.id);
    closeModal();
  };

  if (!show) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.title}>
          <h4>Alert!</h4>
          <p>Are you sure you want to remove: {entity.name}?</p>
        </div>
        <div className={styles.buttons}>
          <button onClick={() => closeModal()} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={() => confirmDelete()} className={styles.confirmButton}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
