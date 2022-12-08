import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch, Redirect, Route, Switch } from 'react-router-dom';
const Projects = lazy(() => import('Components/Employee/Projects'));
const ProjectForm = lazy(() => import('Components/Projects/Form'));
const EmployeeProfile = lazy(() => import('Components/Employee/EmployeeProfile'));
const EditEmployee = lazy(() => import('Components/Employee/EditEmployee'));
const Timesheets = lazy(() => import('Components/Employee/Timesheets'));
const TimeSheetsForm = lazy(() => import('Components/TimeSheets/Form'));

const routes = [
  { name: 'Home', path: '/employee' },
  { name: 'Edit', path: '/employee/edit-profile' },
  { name: 'Projects', path: '/employee/projects' },
  { name: 'Timesheets', path: '/employee/timesheets' }
];
const EmployeesRouter = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}`} component={EmployeeProfile} />
        <Route exact path={`${url}/projects`} component={Projects} />
        <Route exact path={`${url}/projects/form/:id`} component={ProjectForm} />
        <Route exact path={`${url}/timesheets`} component={Timesheets} />
        <Route exact path={`${url}/edit-profile`} component={EditEmployee} />
        <Route exact path={`${url}/timesheets/form`} component={TimeSheetsForm} />
        <Route path={`${url}/timesheets/form/:id`} component={TimeSheetsForm} />
        <Redirect to={`${url}`} />
      </Switch>
    </Layout>
  );
};

export default EmployeesRouter;
