import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Spinner } from 'Components/Shared';
import styles from './layout.module.css';

const Header = lazy(() => import('Components/Header'));
const Footer = lazy(() => import('Components/Footer'));
const Home = lazy(() => import('Components/Home'));
const admins = lazy(() => import('routes/admins'));
const superAdmins = lazy(() => import('routes/superAdmins'));
const employees = lazy(() => import('routes/employees'));
const projects = lazy(() => import('routes/projects'));
const timesheets = lazy(() => import('routes/timesheets'));
const tasks = lazy(() => import('routes/tasks'));

const Layout = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner isLoading={true} />}>
        <div className={styles.container}>
          <Header />
          <Switch>
            <Route path="/admins" component={admins} />
            <Route path="/super-admins" component={superAdmins} />
            <Route path="/employees" component={employees} />
            <Route path="/projects" component={projects} />
            <Route path="/time-sheets" component={timesheets} />
            <Route exact path="/tasks" component={tasks} />
            <Route exact path="/" component={Home} />
            <Redirect to="/home" />
          </Switch>
          <Footer />
        </div>
      </Suspense>
    </Router>
  );
};
export default Layout;
