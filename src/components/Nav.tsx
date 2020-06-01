import React, { Fragment, useState } from 'react';
import UserContext from '../context/UserContext';
import { Label, Menu } from 'semantic-ui-react';

const menuItems = [
  { label: 'Repositories', prop: 'repositories' },
  { label: 'Stars', prop: 'starredRepositories' },
  { label: 'Followers', prop: 'followers' },
  { label: 'Following', prop: 'following' }
];

function Nav() {
  const [activeItem, setActiveItem] = useState(0);
  return (
    <UserContext.Consumer>
      {(user: any) => (
        <Menu vertical className="gg__nav">
          {menuItems.map((item, index) => {
            return (
              <Menu.Item key={index} name={item.label} active={activeItem === index} onClick={() => setActiveItem(index)}>
                <Label color={activeItem === index ? 'teal' : 'grey'}>{user.loading ? '' : user[item.prop]}</Label>
                {item.label}
              </Menu.Item>
            );
          })}
        </Menu>
      )}
    </UserContext.Consumer>
  );
}

export default Nav;
