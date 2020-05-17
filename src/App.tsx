import Dashboard from './components/Dashboard';
import history from './utils/history';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import './styles.css';
import { useAuth0 } from './components/AuthContext';

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div> Loading...</div>;
  }

  return (
    <Router history={history}>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Redirect from="/" to="/dashboard" exact />
        <PrivateRoute path={'/dashboard'}>
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
