import ApolloClient from 'apollo-client';
import React, { useContext, useEffect, useState } from 'react';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { IApolloContext } from '../interfaces/apollo';
import { InMemoryCache } from 'apollo-boost';

export const ApolloContext = React.createContext({});
export const useApolloContext = () => useContext(ApolloContext);

export const ApolloProvider = ({ children }: any) => {
  const [client, setClient] = useState();

  useEffect(() => {
    const initClient = async () => {
      const token = '';
      const link: ApolloLink = createHttpLink({
        uri: 'https://api.github.com/graphql',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const apolloClient: ApolloClient<any> = new ApolloClient({
        cache: new InMemoryCache(),
        link
      });
      setClient(apolloClient);
    };
    initClient();
  }, []);

  const apolloProviderValue: IApolloContext = { client };

  return <ApolloContext.Provider value={apolloProviderValue}>{children}</ApolloContext.Provider>;
};
