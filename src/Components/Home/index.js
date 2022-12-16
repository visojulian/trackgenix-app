import styles from './home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <section>
        <div className={styles.appName}>
          <h1>
            Track<span>GENIX</span>
          </h1>
          <p>AN EASY SYSTEM TO TRACK YOUR TEAM´S TIMES AND PROJECTS</p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industrys standard dummy text ever since the 1500s.
          </p>
        </div>
        <div className={styles.box}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.rocket}>
          <div className={styles.rocketBody}>
            <div className={styles.body}></div>
            <div className={styles.finLeft}></div>
            <div className={styles.finRight}></div>
            <div className={styles.window}></div>
          </div>
          <div className={styles.exhaustFlame}></div>
          <ul className={styles.exhaustFumes}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
