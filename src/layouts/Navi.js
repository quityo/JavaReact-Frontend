import React from "react";
import { Button, Container, Menu, Dropdown} from "semantic-ui-react";


export default function Navi() {
  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item name="Home" />
          <Menu.Item name="News" />
          <Menu.Item name="Contacts" />
          

          <Menu.Menu position="right">
             <Dropdown item text="Language">
              <Dropdown.Menu>
                <Dropdown.Item>Turkish</Dropdown.Item>
                <Dropdown.Item>French</Dropdown.Item>
                <Dropdown.Item>Spanish</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> 
            <Menu.Item>
              <Button primary>Sign Up</Button>
              </Menu.Item>
              <Menu.Item>
              <Button primary>Sign In</Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}