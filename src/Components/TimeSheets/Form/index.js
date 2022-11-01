import styles from './form.module.css';

const Form = () => {
  return (
    <div className={styles.container}>
      <form>
        <div>
          <div className={styles.box}>
            <label>Description</label>
            <input
              type="text"
              name="description"
              required
              //value={timeSheetInput.description}
            />
          </div>
          <div className={styles.box}>
            <label>Date</label>
            <input
              type="date"
              name="date"
              required
              //value={timeSheetInput.date}
            />
          </div>
          <div className={styles.box}>
            <label>Hours</label>
            <input
              type="number"
              name="hours"
              required
              //value={timeSheetInput.hours}
            />
          </div>
          <div className={styles.box}>
            <label>Task</label>
            <input
              type="text"
              name="task"
              required
              //value={timeSheetInput.task}
            />
          </div>
          <div className={styles.box}>
            <label>Employee</label>
            <input
              type="text"
              name="employee"
              required
              //value={timeSheetInput.employee}
            />
          </div>
          <div className={styles.box}>
            <label>Project</label>
            <input
              type="text"
              name="project"
              required
              //value={timeSheetInput.project}
            />
          </div>
          <div className={styles.buttons}>
            <div>
              <button
                className={styles.confirmButton}
                onClick={() => window.location.assign('/time-sheets')}
              >
                Cancel
              </button>
            </div>
            <div>
              <button className={styles.cancelButton} type="submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
