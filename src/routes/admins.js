import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch, Redirect, Route, Switch } from 'react-router-dom';
const AdminProfile = lazy(() => import('Components/Admins/AdminProfile'));
const Employees = lazy(() => import('Components/Employees'));
const EmployeeForm = lazy(() => import('Components/Employees/Form'));
const Projects = lazy(() => import('Components/Projects/index'));
const ProjectsForm = lazy(() => import('Components/Projects/Form/index'));
const Tasks = lazy(() => import('Components/Tasks/index'));
const TasksForm = lazy(() => import('Components/Tasks/Form/index'));
const TimeSheets = lazy(() => import('Components/Admins/TimeSheets'));

const routes = [
  { name: 'Home', path: '/admin' },
  { name: 'Employees', path: '/admin/employees' },
  { name: 'Projects', path: '/admin/projects' },
  { name: 'Tasks', path: '/admin/tasks' },
  { name: 'Timesheets', path: '/admin/timesheets' }
];
const AdminsRouter = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={AdminProfile} />
        <Route exact path={`${url}/employees`} component={Employees} />
        <Route exact path={`${url}/employees/form`} component={EmployeeForm} />
        <Route path={`${url}/employees/form/:id`} component={EmployeeForm} />
        <Route exact path={`${url}/projects`} component={Projects} />
        <Route exact path={`${url}/projects/form`} component={ProjectsForm} />
        <Route path={`${url}/projects/form/:id`} component={ProjectsForm} />
        <Route exact path={`${url}/tasks`} component={Tasks} />
        <Route exact path={`${url}/tasks/form`} component={TasksForm} />
        <Route path={`${url}/tasks/form/:id`} component={TasksForm} />
        <Route exact path={`${url}/timesheets`} component={TimeSheets} />
        <Redirect to={`${url}/`} />
      </Switch>
    </Layout>
  );
};

export default AdminsRouter;
