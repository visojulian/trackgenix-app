import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import AdminForm from '../Admins/AdminForm/AdminForm';
import SuperAdmins from '../SuperAdmins/index';
import SuperAdminsForm from '../SuperAdmins/Form/index';
import Home from '../Home/index';
import styles from './layout.module.css';
import Employees from '../Employees/index';
import EmployeesForm from '../Employees/Form/index';
import Projects from '../Projects';
import ProjectsForm from '../Projects/Form';
import TimeSheets from '../TimeSheets/index';
import TimeSheetsForm from '../TimeSheets/Form/index';
import Tasks from '../Tasks/index';
import TasksForm from '../Tasks/Form/index';

const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Switch>
        <Route path="/admins" component={Admins} />
        <Route path="/admins/form" component={AdminForm} />
        <Route path="/super-admins" component={SuperAdmins} />
        <Route path="/super-admins/forms" component={SuperAdminsForm} />
        <Route path="/employees" component={Employees} />
        <Route path="/employees/forms" component={EmployeesForm} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/forms" component={ProjectsForm} />
        <Route path="/time-sheets" component={TimeSheets} />
        <Route path="/time-sheets/forms" component={TimeSheetsForm} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/tasks/forms" component={TasksForm} />
        <Route exact path="/" component={Home}>
          <Redirect to="/home" />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};
export default Layout;
