import React from 'react';
import { Icon, Menu } from 'semantic-ui-react'

export default function SideBar() {
    return (
      <div>
        <Menu inverted icon="labeled" vertical>
        
          <Menu.Item
            name="hand spock"
          >
            <Icon name="hand spock" />
            Job-Seeker
          </Menu.Item>
  
          <Menu.Item
            name="earlybirds"
          >
            <Icon name="earlybirds" />
            Employer
          </Menu.Item>
          <Menu.Item
            name="paw"
          >
            <Icon name="paw" />
            Job Position
          </Menu.Item>
        </Menu>
      </div>
    );
  }
