import styles from './home.module.css';
import Clock from 'assets/clock.png';
import Group from 'assets/group.png';
import Resources from 'assets/human-resources.png';
import User from 'assets/user.png';

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
      <div className={styles.secondBox}>
        <div className={styles.title}>
          <h2>Services </h2>
        </div>
        <div className={styles.services}>
          <div>
            <h3>Hours Registry</h3>
            <img src={Clock} className={styles.servicesImage} />
          </div>
          <div>
            <h3>Multiple Roles</h3>
            <img src={Group} className={styles.servicesImage} />
          </div>
          <div>
            <h3>Reports</h3>
            <img src={Resources} className={styles.servicesImage} />
          </div>
          <div>
            <h3>Resources Managment</h3>
            <img src={User} className={styles.servicesImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
