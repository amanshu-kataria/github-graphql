import { ReactNode } from 'react';
import {
  GetIdTokenClaimsOptions,
  RedirectLoginOptions,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  IdToken,
  LogoutOptions,
} from '@auth0/auth0-spa-js';

export interface IAuthProps {
  children: ReactNode;
  onRedirectCallback: Function;
  clientId: string;
  redirectUri: string;
  domain: string;
  cacheLocation: 'memory' | 'localstorage';
}

export interface IAuthContext {
  isAuthenticated: boolean;
  accessToken: string | undefined;
  user: any;
  loading: boolean;
  popupOpen: boolean;
  loginWithPopup: (params: any) => void;
  handleRedirectCallback: () => void;
  getIdTokenClaims: (params: GetIdTokenClaimsOptions) => Promise<IdToken>;
  loginWithRedirect: (params: RedirectLoginOptions) => void;
  getTokenSilently: (params: GetTokenSilentlyOptions) => Promise<any>;
  getTokenWithPopup: (params: GetTokenWithPopupOptions) => Promise<string>;
  logout(options?: LogoutOptions): void;
}
