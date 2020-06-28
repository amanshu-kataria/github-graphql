import React, { useState } from 'react';
import { Label, Menu } from 'semantic-ui-react';
import { NavProps } from '../interfaces/UI';
import { ProfileContext } from '../context/profileContext';

const menuItems = [
  { label: 'Repositories', prop: 'repositories' },
  { label: 'Stars', prop: 'starredRepositories' },
  { label: 'Followers', prop: 'followers' },
  { label: 'Following', prop: 'following' }
];

function Nav({ onNavItemChange }: NavProps) {
  const [activeItem, setActiveItem] = useState(0);

  function onNavItemClick(index: number, prop: string) {
    setActiveItem(index);
    onNavItemChange(prop);
  }

  return (
    <ProfileContext.Consumer>
      {(user: any) => (
        <Menu vertical className="gg__nav">
          {menuItems.map((item, index) => {
            return (
              <Menu.Item key={index} name={item.label} active={activeItem === index} onClick={() => onNavItemClick(index, item.prop)}>
                <Label color={activeItem === index ? 'teal' : 'grey'}>{user.loading ? '' : user[item.prop].totalCount}</Label>
                {item.label}
              </Menu.Item>
            );
          })}
        </Menu>
      )}
    </ProfileContext.Consumer>
  );
}

export default Nav;
