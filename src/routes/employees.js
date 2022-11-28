import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch, Redirect, Route, Switch } from 'react-router-dom';
const Employees = lazy(() => import('Components/Employees'));
const EmployeesForm = lazy(() => import('Components/Employees/Form'));
const SignUp = lazy(() => import('Components/Employee/SignUp'));
const Projects = lazy(() => import('Components/Employee/Projects'));
const EmployeeProfile = lazy(() => import('Components/Employee/EmployeeProfile'));
const EditEmployee = lazy(() => import('Components/Employee/EditEmployee'));
const Timesheets = lazy(() => import('Components/Employee/Timesheets'));

const routes = [
  { name: 'home', path: '/employees' },
  { name: 'profile', path: '/employees/employee-profile/:id' },
  { name: 'edit', path: '/employees/edit-employee/:id' },
  { name: 'sign up', path: '/employees/sign-up' },
  { name: 'projects', path: '/employees/projects/:id' },
  { name: 'timesheets', path: '/employees/timesheets/:id' }
];
const EmployeesRouter = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={Employees} />
        <Route path={`${url}/employee-profile/:id`} component={EmployeeProfile} />
        <Route exact path={`${url}/form`} component={EmployeesForm} />
        <Route path={`${url}/form/:id`} component={EmployeesForm} />
        <Route path={`${url}/projects/:id`} component={Projects} />
        <Route path={`${url}/timesheets/:id`} component={Timesheets} />
        <Route exact path={`${url}/sign-up`} component={SignUp} />
        <Route path={`${url}/edit-employee/:id`} component={EditEmployee} />
        <Redirect to={`${url}/`} />
      </Switch>
    </Layout>
  );
};

export default EmployeesRouter;
