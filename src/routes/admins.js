import Layout from 'Components/Layout';
import Spinner from 'Components/Shared/Spinner';
import React, { lazy, Suspense } from 'react';
import { useRouteMatch, Redirect, Route, Switch } from 'react-router-dom';
const AdminProfile = lazy(() => import('Components/Admins/AdminProfile'));
const Employees = lazy(() => import('Components/Employees'));
const EmployeeForm = lazy(() => import('Components/Employees/Form'));
const Projects = lazy(() => import('Components/Projects/index'));
const ProjectsForm = lazy(() => import('Components/Projects/Form/index'));
const Tasks = lazy(() => import('Components/Tasks/index'));
const TasksForm = lazy(() => import('Components/Tasks/Form/index'));
const TimeSheets = lazy(() => import('Components/Admins/TimeSheets'));
const Home = lazy(() => import('Components/Home/index'));

export const routes = [
  { name: 'Home', path: '/home' },
  { name: 'Projects', path: '/admin/projects' },
  { name: 'Employees', path: '/admin/employees' },
  { name: 'Tasks', path: '/admin/tasks' },
  { name: 'Timesheets', path: '/admin/timesheets' },
  { name: 'Profile', path: '/admin/profile' }
];

const AdminsRouter = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Suspense fallback={<Spinner isLoading={true} />}>
        <Switch>
          <Route exact path={`${url}/home`} component={Home} />
          <Route exact path={`${url}/admin/projects`} component={Projects} />
          <Route exact path={`${url}/profile`} component={AdminProfile} />
          <Route exact path={`${url}/employees/form`} component={EmployeeForm} />
          <Route path={`${url}/employees/form/:id`} component={EmployeeForm} />
          <Route exact path={`${url}/employees`} component={Employees} />
          <Route exact path={`${url}/projects`} component={Projects} />
          <Route exact path={`${url}/projects/form`} component={ProjectsForm} />
          <Route path={`${url}/projects/form/:id`} component={ProjectsForm} />
          <Route exact path={`${url}/tasks`} component={Tasks} />
          <Route exact path={`${url}/tasks/form`} component={TasksForm} />
          <Route path={`${url}/tasks/form/:id`} component={TasksForm} />
          <Route exact path={`${url}/timesheets`} component={TimeSheets} />
          <Redirect to={`${url}/projects`} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default AdminsRouter;
