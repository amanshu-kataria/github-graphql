import { ApolloClient } from 'apollo-boost';

export interface IApolloContext {
  client?: ApolloClient<any>;
}
