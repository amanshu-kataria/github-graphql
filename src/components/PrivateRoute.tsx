import React from 'react';
import { ApolloProvider } from '../hooks/apolloClient';
import { IAuthContext } from '../interfaces/auth';
import { IRouteProps } from '../interfaces/routes';
import { Redirect, Route } from 'react-router';
import { useAuth0 } from '../hooks/AuthContext';

function PrivateRoute({ children, ...rest }: IRouteProps) {
  const { isAuthenticated, loading }: IAuthContext = useAuth0();
  return (
    <ApolloProvider>
      {!loading && isAuthenticated && <Route {...rest}>{children}</Route>}
      {!loading && !isAuthenticated && <Redirect to="/login" />}
      {loading && <div>Loading ...</div>}
    </ApolloProvider>
  );
}

export default PrivateRoute;
