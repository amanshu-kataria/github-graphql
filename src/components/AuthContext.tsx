import React, { useContext, useEffect, useState } from 'react';
import { IAuthProps, IAuthContext } from '../interfaces/auth';
import createAuth0Client, {
  Auth0Client,
  GetIdTokenClaimsOptions,
  RedirectLoginOptions,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  LogoutOptions,
} from '@auth0/auth0-spa-js';

const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext({});
export const useAuth0: any = () => useContext(Auth0Context);

export const Auth0Provider = ({ children, onRedirectCallback = DEFAULT_REDIRECT_CALLBACK, ...initOptions }: IAuthProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook: Auth0Client = await createAuth0Client({
        domain: initOptions.domain,
        client_id: initOptions.clientId,
        cacheLocation: initOptions.cacheLocation,
      });
      setAuth0(auth0FromHook);

      if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        const accessToken = await auth0FromHook.getTokenSilently();
        setUser(user);
        setAccessToken(accessToken);
      }

      setLoading(false);
    };
    initAuth0();
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  const authProviderValue: IAuthContext = {
    isAuthenticated,
    accessToken,
    user,
    loading,
    popupOpen,
    loginWithPopup,
    handleRedirectCallback,
    getIdTokenClaims: ({ ...p }: GetIdTokenClaimsOptions) => auth0Client.getIdTokenClaims({ ...p }),
    loginWithRedirect: ({ ...p }: RedirectLoginOptions) => auth0Client.loginWithRedirect({ ...p }),
    getTokenSilently: ({ ...p }: GetTokenSilentlyOptions) => auth0Client.getTokenSilently({ ...p }),
    getTokenWithPopup: ({ ...p }: GetTokenWithPopupOptions) => auth0Client.getTokenWithPopup({ ...p }),
    logout: ({ ...p }: LogoutOptions) => auth0Client.logout({ ...p }),
  };

  return <Auth0Context.Provider value={authProviderValue}>{children}</Auth0Context.Provider>;
};
