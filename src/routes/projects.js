import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
const Projects = lazy(() => import('Components/Projects'));
const ProjectsForm = lazy(() => import('Components/Projects/Form'));

const projects = () => {
  return (
    <Switch>
      <Route exact path="/projects" component={Projects} />
      <Route exact path="/projects/form" component={ProjectsForm} />
      <Route path="/projects/form/:id" component={ProjectsForm} />
    </Switch>
  );
};

export default projects;
