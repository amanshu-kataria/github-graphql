import ApolloClient from 'apollo-client';
import React, { useContext, useEffect, useState } from 'react';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { IApolloContext } from './interfaces/apollo';
import { IAuthContext } from './interfaces/auth';
import { InMemoryCache } from 'apollo-boost';
import { useAuth0 } from './components/AuthContext';

export const ApolloContext = React.createContext({});
export const useApolloContext = () => useContext(ApolloContext);

export const ApolloProvider = ({ children }: any) => {
  const [client, setClient] = useState();
  const { getTokenSilently }: IAuthContext = useAuth0();

  useEffect(() => {
    const initClient = async () => {
      const token = await getTokenSilently({});
      const link: ApolloLink = createHttpLink({
        uri: 'https://api.github.com/graphql',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const apolloClient: ApolloClient<any> = new ApolloClient({
        cache: new InMemoryCache(),
        link,
      });
      setClient(apolloClient);
    };
    initClient();
  }, [getTokenSilently]);

  const apolloProviderValue: IApolloContext = {
    client,
  };

  return <ApolloContext.Provider value={apolloProviderValue}>{children}</ApolloContext.Provider>;
};
