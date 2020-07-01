import React, { Fragment, useEffect } from 'react';
import { IAuthContext } from '../interfaces/auth';
import { Redirect } from 'react-router';
import { useAuth0 } from '../hooks/AuthContext';

const Login = () => {
  const { isAuthenticated, loginWithRedirect }: IAuthContext = useAuth0();
  useEffect(() => {
    if (isAuthenticated === false) {
      loginWithRedirect({});
    }
  });
  return (
    <Fragment>
      {!isAuthenticated ? (
        <div>Loading ...</div>
      ) : (
        <Redirect
          to={{
            pathname: '/dashboard'
          }}
        />
      )}
    </Fragment>
  );
};

export default Login;
