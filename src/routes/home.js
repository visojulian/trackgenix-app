import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import { routes as adminRoutes } from './admins';
import { routes as superAdminRoutes } from './superAdmins';
import { routes as employeeRoutes } from './employees';
const Home = lazy(() => import('Components/Home/index'));
const Login = lazy(() => import('Components/Auth/Login'));
const SignUp = lazy(() => import('Components/Auth/SignUp'));
const Layout = lazy(() => import('Components/Layout'));

const HomeRouter = () => {
  const { url } = useRouteMatch();
  const { role, logged: isLogged } = useSelector((state) => state.auth);

  const roleRoutes = () => {
    if (isLogged) {
      switch (role) {
        case 'ADMIN':
          return adminRoutes;
        case 'SUPER_ADMIN':
          return superAdminRoutes;
        default:
          return employeeRoutes;
      }
    }
    return [
      { name: 'Home', path: '/home' },
      {
        name: 'Login',
        path: '/auth/login'
      },
      {
        name: 'Sign Up',
        path: '/auth/sign-up'
      }
    ];
  };

  return (
    <Layout routes={roleRoutes()}>
      <Switch>
        <Route path={`${url}/`} component={Home} />
        <Route path={`${url}/login`} component={Login} />
        <Route path={`${url}/sign-up`} component={SignUp} />
      </Switch>
    </Layout>
  );
};

export default HomeRouter;
