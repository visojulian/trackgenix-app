import styles from './header.module.css';
import { Link, withRouter } from 'react-router-dom';
import Rocket from 'assets/rocket.png';

function Header(props) {
  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.appName}>
          <img src={Rocket} className={styles.headerImage} />
          <p>
            Track<span>GENIX</span>
          </p>
        </div>
        <ul className={styles.rutes}>
          {props.routes.map((route) => (
            <li key={route.name}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default withRouter(Header);
