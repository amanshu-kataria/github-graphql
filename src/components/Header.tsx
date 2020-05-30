import React from 'react';
import { IAuthContext } from '../interfaces/auth';
import { useAuth0 } from '../hooks/AuthContext';

function Header() {
  const { user }: IAuthContext = useAuth0();
  const profilePicture = `${user.picture}&s=25`;

  return (
    <div className="gg__header">
      <div className="gg__app-title">Github + GraphQL</div>
      <div className="gg__user-section">
        <span className="gg__user-name">{user.name}</span>
        <img className="gg__user-picture" src={profilePicture} alt="Profile" />
        <div className="gg__user-dropdown"></div>
      </div>
    </div>
  );
}

export default Header;
