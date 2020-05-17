import App from './App';
import config from './auth_config.json';
import history from './utils/history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from './components/AuthContext';

const onRedirectCallback = (appState: any): void => {
  history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    clientId={config.clientId}
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    cacheLocation={'localstorage'}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root'),
);
