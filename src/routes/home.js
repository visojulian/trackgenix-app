import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
const Home = lazy(() => import('Components/Home/index'));
const Login = lazy(() => import('Components/Auth/Login'));
const SignUp = lazy(() => import('Components/Auth/SignUp'));
const Layout = lazy(() => import('Components/Layout'));

const HomeRouter = () => {
  const { role } = useSelector((state) => state.auth);
  let routes = [];
  switch (role) {
    case 'SUPER_ADMIN':
      break;
    case 'ADMIN':
      break;
    case 'EMPLOYEE':
      routes = [
        { name: 'Home', path: '/home' },
        { name: 'Timesheets', path: '/employee/timesheets' },
        { name: 'Projects', path: '/employee/projects' },
        { name: 'Profile', path: '/employee/profile' }
      ];
      break;
    default:
      routes = [
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
      break;
  }
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route path={`${url}/`} component={Home} />
        <Route path={`${url}/login`} component={Login} />
        <Route path={`${url}/sign-up`} component={SignUp} />
      </Switch>
    </Layout>
  );
};

export default HomeRouter;
