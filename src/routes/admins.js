import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
const Admins = lazy(() => import('Components/Admins'));
const AdminForm = lazy(() => import('Components/Admins/AdminForm'));

const admins = () => {
  return (
    <Switch>
      <Route exact path="/admins" component={Admins} />
      <Route exact path="/admins/form" component={AdminForm} />
      <Route path="/admins/form/:id" component={AdminForm} />
    </Switch>
  );
};

export default admins;
