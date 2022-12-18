import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch, Redirect, Route, Switch } from 'react-router-dom';
const Projects = lazy(() => import('Components/Employee/Projects'));
const ProjectForm = lazy(() => import('Components/Employee/Projects/Form'));
const EmployeeProfile = lazy(() => import('Components/Employee/EmployeeProfile'));
const Timesheets = lazy(() => import('Components/Employee/Timesheets'));
const TimeSheetsForm = lazy(() => import('Components/TimeSheets/Form'));

const routes = [
  { name: 'Home', path: '/employee' },
  { name: 'Projects', path: '/employee/projects' },
  { name: 'Profile', path: '/employee/profile' }
];
const EmployeesRouter = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={Timesheets} />
        <Route exact path={`${url}/projects`} component={Projects} />
        <Route exact path={`${url}/profile`} component={EmployeeProfile} />
        <Route exact path={`${url}/projects/form/:id`} component={ProjectForm} />
        <Route exact path={`${url}/timesheets/form`} component={TimeSheetsForm} />
        <Route path={`${url}/timesheets/form/:id`} component={TimeSheetsForm} />
        <Redirect to={`${url}`} />
      </Switch>
    </Layout>
  );
};

export default EmployeesRouter;
