import { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

const AdminsRoutes = lazy(() => import('./admins'));
const SuperAdminsRouter = lazy(() => import('./superAdmins'));
const EmployeeRouter = lazy(() => import('./employees'));
const TimeSheetsRouter = lazy(() => import('./timeSheets'));
const HomeRouter = lazy(() => import('./home'));

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading..</div>}>
        <Switch>
          <Route path="/admins" component={AdminsRoutes} />
          <Route path="/super-admins" component={SuperAdminsRouter} />
          <Route path="/employees" component={EmployeeRouter} />
          <Route path="/time-sheets" component={TimeSheetsRouter} />
          <Route path="/home" component={HomeRouter}></Route>
          <Redirect to="/home"></Redirect>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
