import gql from 'graphql-tag';
import Header from './Header';
import Nav from './Nav';
import React, { Fragment, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import { IApolloContext } from '../interfaces/apollo';
import { useApolloContext } from '../hooks/apolloClient';

export default function Dashboard() {
  const { client }: IApolloContext = useApolloContext();
  const [userData, setUserData] = useState({ loading: true });

  useEffect(() => {
    if (client !== undefined) {
      client
        .query({
          query: gql`
            {
              user(login: "amanshu-kataria") {
                bio
                createdAt
                email
                followers(first: 20) {
                  totalCount
                }
                following {
                  totalCount
                }
                repositories {
                  totalCount
                }
                starredRepositories {
                  totalCount
                }
              }
            }
          `
        })
        .then((response: any) => {
          const { user } = response.data;
          const userData = {
            followers: user.followers.totalCount,
            following: user.following.totalCount,
            repositories: user.repositories.totalCount,
            starredRepositories: user.starredRepositories.totalCount,
            loading: false
          };
          setUserData(userData);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  });
  return (
    <div className="gg__dashboard">
      <Header />
      <UserContext.Provider value={userData}>
        {userData.loading ? (
          'Loading ...'
        ) : (
          <Fragment>
            <Nav />
          </Fragment>
        )}
      </UserContext.Provider>
    </div>
  );
}
