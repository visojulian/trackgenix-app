import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
const TimeSheets = lazy(() => import('Components/TimeSheets'));
const TimeSheetsForm = lazy(() => import('Components/TimeSheets/Form'));

const timesheets = () => {
  return (
    <Switch>
      <Route exact path="/time-sheets" component={TimeSheets} />
      <Route exact path="/time-sheets/form" component={TimeSheetsForm} />
      <Route path="/time-sheets/form/:id" component={TimeSheetsForm} />
    </Switch>
  );
};

export default timesheets;
