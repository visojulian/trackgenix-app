import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch, Redirect, Route, Switch } from 'react-router-dom';
const Projects = lazy(() => import('Components/Employee/Projects'));
const EmployeeProfile = lazy(() => import('Components/Employee/EmployeeProfile'));
const EditEmployee = lazy(() => import('Components/Employee/EditEmployee'));
const Timesheets = lazy(() => import('Components/Employee/Timesheets'));

const routes = [
  { name: 'home', path: '/employee' },
  { name: 'profile', path: '/employee/profile' },
  { name: 'edit', path: '/employee/edit-profile' },
  { name: 'projects', path: '/employee/projects' },
  { name: 'timesheets', path: '/employee/timesheets' }
];
const EmployeesRouter = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route path={`${url}`} component={EmployeeProfile} />
        <Route path={`${url}/profile`} component={EmployeeProfile} />
        <Route path={`${url}/projects`} component={Projects} />
        <Route path={`${url}/timesheets`} component={Timesheets} />
        <Route path={`${url}/edit-profile`} component={EditEmployee} />
        <Redirect to={`${url}`} />
      </Switch>
    </Layout>
  );
};

export default EmployeesRouter;
