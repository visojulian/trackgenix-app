import styles from './modal.module.css';

function Modal(props) {
  console.log(props);
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Do you wish to delete this task?</h3>
        <button onClick={props.closeModal}>Confirm</button>
        <button onClick={props.closeModal}>Cancel</button>
      </div>
    </div>
  );
}

export default Modal;
