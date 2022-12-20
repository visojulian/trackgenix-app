import { lazy } from 'react';
import styles from './layout.module.css';

const Header = lazy(() => import('Components/Header'));
const Footer = lazy(() => import('Components/Footer'));

const Layout = (props) => {
  return (
    <div className={styles.container}>
      <Header routes={props.routes} />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
