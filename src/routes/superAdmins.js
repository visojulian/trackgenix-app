import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
const SuperAdmins = lazy(() => import('Components/SuperAdmins'));
const SuperAdminsForm = lazy(() => import('Components/SuperAdmins/Form'));

const superAdmins = () => {
  return (
    <Switch>
      <Route exact path="/super-admins" component={SuperAdmins} />
      <Route exact path="/super-admins/form" component={SuperAdminsForm} />
      <Route path="/super-admins/form/:id" component={SuperAdminsForm} />
    </Switch>
  );
};

export default superAdmins;
