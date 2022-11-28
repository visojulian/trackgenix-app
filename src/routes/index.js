import { tokenListener } from 'helpers/firebase';
import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

const AdminsRoutes = lazy(() => import('./admins'));
const SuperAdminsRouter = lazy(() => import('./superAdmins'));
const EmployeeRouter = lazy(() => import('./employees'));
const PrivateRoute = lazy(() => import('./PrivateRoute'));
const AuthRoutes = lazy(() => import('./auth'));

const Routes = () => {
  useEffect(() => {
    tokenListener();
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading..</div>}>
        <Switch>
          <PrivateRoute path="/admin" component={AdminsRoutes} />
          <PrivateRoute path="/super-admin" component={SuperAdminsRouter} />
          <PrivateRoute path="/employee" component={EmployeeRouter} />
          <Route path="/auth" component={AuthRoutes}></Route>
          <Redirect to="/auth"></Redirect>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
