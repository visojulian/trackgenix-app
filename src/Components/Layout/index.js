import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Spinner } from 'Components/Shared';
import styles from './layout.module.css';
import TimeSheets from '../TimeSheets/index';
import TimeSheetsForm from '../TimeSheets/Form/index';
import Projects from '../Projects';
import ProjectsForm from '../Projects/Form';

import Tasks from '../Tasks/index';
import TasksForm from '../Tasks/Form/index';

const Header = lazy(() => import('Components/Header'));
const Footer = lazy(() => import('Components/Footer'));
const Home = lazy(() => import('Components/Home'));
const admins = lazy(() => import('routes/admins'));
const superAdmins = lazy(() => import('routes/superAdmins'));
const employees = lazy(() => import('routes/employees'));

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
            <Route exact path="/" component={Home} />
            <Route exact path="/time-sheets" component={TimeSheets} />
            <Route exact path="/time-sheets/form" component={TimeSheetsForm} />
            <Route path="/time-sheets/form/:id" component={TimeSheetsForm} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/projects/form" component={ProjectsForm} />
            <Route path="/projects/form/:id" component={ProjectsForm} />
            <Route exact path="/tasks" component={Tasks} />
            <Route exact path="/tasks/form" component={TasksForm} />
            <Route path="/tasks/form/:id" component={TasksForm} />
            <Redirect to="/home" />
          </Switch>
          <Footer />
        </div>
      </Suspense>
    </Router>
  );
};
export default Layout;
