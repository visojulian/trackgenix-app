import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
const Employees = lazy(() => import('Components/Employees'));
const EmployeesForm = lazy(() => import('Components/Employees/Form'));
const Projects = lazy(() => import('Components/Employee/Projects'));

const employees = () => {
  return (
    <Switch>
      <Route exact path="/employees" component={Employees} />
      <Route exact path="/employees/form" component={EmployeesForm} />
      <Route path="/employees/form/:id" component={EmployeesForm} />
      <Route exact path="/employees/projects/:id" component={Projects} />
    </Switch>
  );
};

export default employees;
