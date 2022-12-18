import styles from './footer.module.css';
import { withRouter } from 'react-router-dom';
import Linkedin from 'assets/linkedin.png';
import Twitter from 'assets/twitter.png';
import Facebook from 'assets/facebook.png';
import Instagram from 'assets/instagram.png';
import Github from 'assets/github.png';

function Footer() {
  return (
    <footer className={styles.container}>
      <div>
        <a href={'https://www.linkedin.com'} target={'_blank'} rel="noreferrer">
          <img src={Linkedin} />
        </a>
        <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
          <img src={Twitter} />
        </a>
        <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
          <img src={Facebook} />
        </a>
        <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
          <img src={Instagram} />
        </a>
        <a href={'https://github.com/BaSP-a2022'} target={'_blank'} rel="noreferrer">
          <img src={Github} />
        </a>
      </div>
      <div>
        <p>Copyright © 2022 Trackgenix. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default withRouter(Footer);
