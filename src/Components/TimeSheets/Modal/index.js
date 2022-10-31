import styles from './modal.module.css';

const ConfirmationModal = (props) => {
  if (!props.show) {
    return null;
  }
  const onCloseModal = () => {
    props.deleteTimeSheet(props.timeSheetId);
    props.closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h3 className={styles.title}>{props.title}</h3>
        <div className={styles.buttonsDiv}>
          <div>
            <button onClick={props.closeModal} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
          <div>
            <button
              className={styles.confirmButton}
              onClick={() => {
                onCloseModal();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationModal;
