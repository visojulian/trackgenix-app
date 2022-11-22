import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
const Employees = lazy(() => import('Components/Employees'));
const EmployeesForm = lazy(() => import('Components/Employees/Form'));
const Timesheets = lazy(() => import('Components/Employee/Timesheets'));

const routes = [
  { name: 'home', path: '/employees' },
  { name: 'timesheets', path: '/employees/timesheets/:id' }
];
const EmployeesRouter = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={Employees} />
        <Route exact path={`${url}/form`} component={EmployeesForm} />
        <Route path={`${url}/form/:id`} component={EmployeesForm} />
        <Route path={`${url}/timesheets/:id`} component={Timesheets} />
      </Switch>
    </Layout>
  );
};

export default EmployeesRouter;
