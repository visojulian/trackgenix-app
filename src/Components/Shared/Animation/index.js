import styles from './animation.module.css';

const Animation = () => {
  return (
    <div>
      <div className={styles.storyAnimation}>
        <div className={styles.moon}>
          <div className={styles.craterOne}></div>
          <div className={styles.craterTwo}></div>
          <div className={styles.craterThree}></div>
          <div className={styles.craterFour}></div>
          <div className={styles.craterFive}></div>
          <div className={styles.shadow}></div>
        </div>
        <div className={styles.orbit}>
          <div className={styles.miniRocket}>
            <div className={styles.windowAnimation}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animation;
