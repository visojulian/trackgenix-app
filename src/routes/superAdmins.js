import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch, Redirect, Route, Switch } from 'react-router-dom';
const SuperAdmins = lazy(() => import('Components/SuperAdmins'));
const SuperAdminProfile = lazy(() => import('Components/SuperAdmins/SuperAdminProfile'));
const SuperAdminsForm = lazy(() => import('Components/SuperAdmins/Form'));
const Admins = lazy(() => import('Components/Admins'));
const AdminForm = lazy(() => import('Components/Admins/AdminForm'));

const routes = [
  { name: 'Home', path: '/super-admin' },
  { name: 'Super Admins', path: '/super-admin/list' },
  { name: 'Admins', path: '/super-admin/admins' }
];
const SuperAdminsRouter = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={SuperAdminProfile} />
        <Route exact path={`${url}/list`} component={SuperAdmins} />
        <Route exact path={`${url}/form`} component={SuperAdminsForm} />
        <Route path={`${url}/form/:id`} component={SuperAdminsForm} />
        <Route exact path={`${url}/admins`} component={Admins} />
        <Route exact path={`${url}/admins/form`} component={AdminForm} />
        <Route path={`${url}/admins/form/:id`} component={AdminForm} />
        <Redirect to={`${url}/`} />
      </Switch>
    </Layout>
  );
};

export default SuperAdminsRouter;
