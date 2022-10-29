import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }
  const onCloseModal = () => {
    props.deleteTask(props.taskId);
    props.closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>{props.title}</h3>
        <button
          onClick={() => {
            onCloseModal();
          }}
        >
          Confirm
        </button>
        <button onClick={props.closeModal}>Cancel</button>
      </div>
    </div>
  );
}

export default Modal;
