import Header from './Header';
import Nav from './Nav';
import React, { useEffect, useState } from 'react';
import Repositories from './Repositories';
import { IApolloContext } from '../interfaces/apollo';
import { IAuthContext } from '../interfaces/auth';
import { ProfileContext } from '../context/profileContext';
import { useApolloContext } from '../hooks/apolloClient';
import { useAuth0 } from '../hooks/AuthContext';
import { userProfile } from '../queries/user';
import { IUserQueryResponse } from '../interfaces/profile';

export default function Dashboard() {
  const { client }: IApolloContext = useApolloContext();
  const [userData, setUserData] = useState({ loading: true });
  const [currentNavItem, setNavItem] = useState('repositories');
  const { user }: IAuthContext = useAuth0();

  useEffect(() => {
    if (client !== undefined) {
      client
        .query({
          query: userProfile(),
          variables: {
            userName: user.nickname
          }
        })
        .then((response: IUserQueryResponse) => {
          const { user } = response.data;
          const userData = {
            followers: user.followers,
            following: user.following,
            repositories: user.repositories,
            starredRepositories: user.starredRepositories,
            loading: false
          };
          setUserData(userData);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [client]);

  return (
    <div>
      <Header />
      <ProfileContext.Provider value={userData}>
        {userData.loading ? (
          'Loading ...'
        ) : (
          <div className="dashboard">
            <Nav onNavItemChange={setNavItem} />
            <div className="dashboard__right-panel">{currentNavItem === 'repositories' && <Repositories />}</div>
          </div>
        )}
      </ProfileContext.Provider>
    </div>
  );
}
