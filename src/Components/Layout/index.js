import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
    <Router>
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
          <Route exact path="/" component={Home}></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};
export default Layout;
