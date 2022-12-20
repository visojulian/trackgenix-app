import styles from './header.module.css';
import { Link, withRouter, useHistory } from 'react-router-dom';
import Rocket from 'assets/rocket.png';
import { logout } from 'redux/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import LogoutButton from 'Components/Shared/Logout/index';

function Header(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout());
    history.push('/home');
  };
  const isLogged = useSelector((state) => state.auth.logged);
  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.appName}>
          <a href="/home">
            <img src={Rocket} className={styles.headerImage} />
          </a>
          <a href="/home" className={styles.link}>
            <p>
              Track<span>GENIX</span>
            </p>
          </a>
        </div>
        <ul className={styles.rutes}>
          {props.routes.map((route) => (
            <li key={route.name}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
          {isLogged && (
            <li>
              <LogoutButton onClick={logoutUser} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default withRouter(Header);
