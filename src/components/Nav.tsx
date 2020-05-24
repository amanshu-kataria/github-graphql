import React, { useState } from 'react';
import { Label, Menu } from 'semantic-ui-react';

const menuItems = ['Repositories', 'Stars', 'Followers', 'Following'];

function Nav() {
  const [activeItem, setActiveItem] = useState(0);
  return (
    <Menu vertical className="gg__nav">
      {menuItems.map((item, index) => {
        return (
          <Menu.Item key={index} name={item} active={activeItem === index} onClick={() => setActiveItem(index)}>
            <Label color={activeItem === index ? 'teal' : 'grey'}>1</Label>
            {item}
          </Menu.Item>
        );
      })}
    </Menu>
  );
}

export default Nav;
