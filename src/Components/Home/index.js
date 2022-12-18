import styles from './home.module.css';
import Clock from 'assets/clock.png';
import Group from 'assets/group.png';
import Resources from 'assets/human-resources.png';
import User from 'assets/user.png';
import Work from 'assets/worka.png';

const Home = () => {
  return (
    <div className={styles.container}>
      <section className={styles.mainContainer}>
        <div>
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
        </div>
        <div className={styles.appName}>
          <h1>
            Track<span>GENIX</span>
          </h1>
          <p>AN EASY SYSTEM TO TRACK YOUR TEAM IS TIMES AND PROJECTS</p>
          <p>
            Trackgenix is a web system where you can create new projects with your team. Everyone
            can update all the hours they are working, on the different projects in an easy and
            simple way and provides information to the companies so they can make better decisions.
          </p>
        </div>
      </section>
      <section className={styles.secondBox}>
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
      </section>
      <section className={styles.boxWhy}>
        <section>
          <div className={styles.whyDiv}>
            <img src={Work} className={styles.whyImg} />
            <div>
              <h3>Why Trackgenix?</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industrys standard dummy text ever since the 1500s.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industrys standard dummy text ever since the 1500s.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industrys standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>
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
      </section>
      <section className={styles.story}>
        <div>
          <h3>Our Story</h3>
          <div className={styles.glass}>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s. Lorem Ipsum is simply
              dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industrys standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text
              of the printing and typesetting industry. Lorem Ipsum has been the industrys standard
              dummy text ever since the 1500s.
            </p>
          </div>
        </div>
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
      </section>
    </div>
  );
};

export default Home;
