import Layout from 'Components/Layout';
import Spinner from 'Components/Shared/Spinner';
import React, { lazy, Suspense } from 'react';
import { useRouteMatch, Redirect, Route, Switch } from 'react-router-dom';
const SuperAdmins = lazy(() => import('Components/SuperAdmins'));
const SuperAdminProfile = lazy(() => import('Components/SuperAdmins/SuperAdminProfile'));
const EditSuperAdmin = lazy(() => import('Components/SuperAdmins/EditSuperAdmin'));
const SuperAdminsForm = lazy(() => import('Components/SuperAdmins/Form'));
const Admins = lazy(() => import('Components/Admins'));
const AdminForm = lazy(() => import('Components/Admins/AdminForm'));
const Home = lazy(() => import('Components/Home/index'));

export const routes = [
  { name: 'Home', path: '/home' },
  { name: 'Admins', path: '/super-admin/admins' },
  { name: 'Super Admins', path: '/super-admin/list' },
  { name: 'Profile', path: '/super-admin/profile' }
];
const SuperAdminsRouter = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Suspense fallback={<Spinner isLoading={true} />}>
        <Switch>
          <Route exact path={`${url}/home`} component={Home} />
          <Route exact path={`${url}/super-admin/admins`} component={Admins} />
          <Route exact path={`${url}/edit-profile`} component={EditSuperAdmin} />
          <Route exact path={`${url}/profile`} component={SuperAdminProfile} />
          <Route exact path={`${url}/list`} component={SuperAdmins} />
          <Route exact path={`${url}/form`} component={SuperAdminsForm} />
          <Route path={`${url}/form/:id`} component={SuperAdminsForm} />
          <Route exact path={`${url}/admins`} component={Admins} />
          <Route exact path={`${url}/admins/form`} component={AdminForm} />
          <Route path={`${url}/admins/form/:id`} component={AdminForm} />
          <Redirect to={`${url}/admins`} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default SuperAdminsRouter;
