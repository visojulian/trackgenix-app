import Logout from 'assets/logout.png';
import styles from './logout.module.css';
const LogoutButton = ({ onClick }) => {
  return (
    <>
      <a onClick={onClick} className={styles.logoutButton}>
        <img src={Logout} className={styles.logout} />
      </a>
    </>
  );
};

export default LogoutButton;
