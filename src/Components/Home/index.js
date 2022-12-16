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
      <div className={styles.boxWhy}>
        <section>
          <h3>Why Trackgenix?</h3>
          <div className={styles.custom}>
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className={styles.shapeFill}
              ></path>
            </svg>
          </div>
        </section>
      </div>
      <section className={styles.contact}>
        <h3>Contact</h3>
      </section>
      <div className={styles.customContact}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className={styles.shapeContact}
          ></path>
        </svg>
      </div>
      <section className={styles.story}>
        <h3>Our Story</h3>
      </section>
    </div>
  );
};

export default Home;
