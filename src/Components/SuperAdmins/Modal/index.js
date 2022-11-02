import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.showModal) {
    return null;
  }

  const onCloseModal = () => {
    props.deleteSuperAdmin(props.superAdminId);
    props.closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.title}>
          <h4>Remove Super Admin</h4>
          <p>Do you want to remove this Super Admin?</p>
          <p>Changes cannot be undone.</p>
        </div>
        <div className={styles.buttons}>
          <button onClick={props.closeModal}>Cancel</button>
          <button onClick={onCloseModal}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
