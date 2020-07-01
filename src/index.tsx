import App from './App';
import history from './utils/history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from './hooks/AuthContext';

const onRedirectCallback = (appState: any): void => {
  history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
};

ReactDOM.render(
  <Auth0Provider redirectUri={window.location.origin} onRedirectCallback={onRedirectCallback}>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
