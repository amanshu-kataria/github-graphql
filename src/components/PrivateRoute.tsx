import React, { useEffect, Fragment } from 'react';
import { IRouteProps } from '../interfaces/routes';
import { Route, Redirect } from 'react-router';
import { useAuth0 } from './AuthContext';
import { IAuthContext } from '../interfaces/auth';

function PrivateRoute({ children, ...rest }: IRouteProps) {
  const { isAuthenticated, loading }: IAuthContext = useAuth0();
  return (
    <Fragment>
      {!loading && isAuthenticated && <Route {...rest}>{children}</Route>}
      {!loading && !isAuthenticated && <Redirect to="/login" />}
      {loading && <div>Loading ...</div>}
    </Fragment>
  );
}

export default PrivateRoute;
