import { Spinner } from 'Components/Shared';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const auth = useSelector((store) => {
    return store.auth;
  });

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (auth.isLoading) {
          return <Spinner isLoading={auth.isLoading} />;
        }
        if (auth.role.role === rest.role) {
          return <RouteComponent {...routeProps} />;
        }
        return <Redirect to={'/auth/login'} />;
      }}
    />
  );
};

export default PrivateRoute;
