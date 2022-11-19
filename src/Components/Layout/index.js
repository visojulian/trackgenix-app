import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styles from './layout.module.css';

const Header = lazy(() => import('Components/Header'));
const Footer = lazy(() => import('Components/Footer'));
const Admins = lazy(() => import('Components/Admins'));
const AdminForm = lazy(() => import('Components/Admins/AdminForm/AdminForm'));
const SuperAdmins = lazy(() => import('Components/SuperAdmins'));
const SuperAdminsForm = lazy(() => import('Components/SuperAdmins/Form'));
const Home = lazy(() => import('Components/Home'));
const Employees = lazy(() => import('Components/Employees'));
const EmployeesForm = lazy(() => import('Components/Employees/Form'));
const Projects = lazy(() => import('Components/Projects'));
const ProjectsForm = lazy(() => import('Components/Projects/Form'));
const TimeSheets = lazy(() => import('Components/TimeSheets'));
const TimeSheetsForm = lazy(() => import('Components/TimeSheets/Form'));
const Tasks = lazy(() => import('Components/Tasks'));
const TasksForm = lazy(() => import('Components/Tasks/Form'));

const Layout = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div className={styles.container}>
          <Header />
          <Switch>
            <Route exact path="/admins" component={Admins} />
            <Route exact path="/admins/form" component={AdminForm} />
            <Route path="/admins/form/:id" component={AdminForm} />
            <Route exact path="/super-admins" component={SuperAdmins} />
            <Route exact path="/super-admins/form" component={SuperAdminsForm} />
            <Route path="/super-admins/form/:id" component={SuperAdminsForm} />
            <Route exact path="/employees" component={Employees} />
            <Route exact path="/employees/form" component={EmployeesForm} />
            <Route path="/employees/form/:id" component={EmployeesForm} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/projects/form" component={ProjectsForm} />
            <Route path="/projects/form/:id" component={ProjectsForm} />
            <Route exact path="/time-sheets" component={TimeSheets} />
            <Route exact path="/time-sheets/form" component={TimeSheetsForm} />
            <Route path="/time-sheets/form/:id" component={TimeSheetsForm} />
            <Route exact path="/tasks" component={Tasks} />
            <Route exact path="/tasks/form" component={TasksForm} />
            <Route path="/tasks/form/:id" component={TasksForm} />
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
