import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
const Employees = lazy(() => import('Components/Employees'));
const EmployeesForm = lazy(() => import('Components/Employees/Form'));
const EmployeeProfile = lazy(() => import('Components/Employee/EmployeeProfile'));
const EditEmployee = lazy(() => import('Components/Employee/EditEmployee'));

const employees = () => {
  return (
    <Switch>
      <Route exact path="/employees" component={Employees} />
      <Route exact path="/employees/form" component={EmployeesForm} />
      <Route path="/employees/form/:id" component={EmployeesForm} />
      <Route path="/employees/employee-profile/:id" component={EmployeeProfile} />
      <Route path="/employees/edit-employee/:id" component={EditEmployee} />
    </Switch>
  );
};

export default employees;
