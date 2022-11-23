import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
const Tasks = lazy(() => import('Components/Tasks/index'));
const TasksForm = lazy(() => import('Components/Tasks/Form/index'));

const TasksRouter = () => {
  return (
    <Switch>
      <Route exact path="/tasks" component={Tasks} />
      <Route exact path="/tasks/form" component={TasksForm} />
      <Route path="/tasks/form/:id" component={TasksForm} />
    </Switch>
  );
};

export default TasksRouter;
