import styles from './form.module.css';
// import React, { useStates} from "react";

const Form = () => {
  return (
    <section className={styles.container}>
      <div className={styles.flex}>
        <h3>Add Super Admin</h3>
        <div className={styles.box}>
          <div>
            <div className={styles.div}>
              <label>Name</label>
              <input></input>
            </div>
            <div className={styles.div}>
              <label>Last Name</label>
              <input></input>
            </div>
          </div>
          <div>
            <div className={styles.div}>
              <label>Email</label>
              <input></input>
            </div>
            <div className={styles.buttons}>
              <button>Cancel</button>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
