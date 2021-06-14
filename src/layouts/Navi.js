import React, {useState} from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Container, Menu, Dropdown} from "semantic-ui-react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";

export default function Navi() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const history = useHistory()
  function handleSignOut(params) {
   setIsAuthenticated(false)
   history.push("/")
  }

  function handleSignIn(params) {
    setIsAuthenticated(true)
   }

  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
        <Menu.Menu position="left"/>
        <Menu.Item name="Spiral Sun" />
       
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/" name="Home" />
          <Menu.Item name="News" />
          <Menu.Item name="Contacts" />          

          
             <Dropdown item text="Language">
              <Dropdown.Menu>
                <Dropdown.Item>Turkish</Dropdown.Item>
                <Dropdown.Item>French</Dropdown.Item>
                <Dropdown.Item>Spanish</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> 
            {isAuthenticated?<SignedIn signOut={handleSignOut} biseu="1" />
            :<SignedOut  signIn={handleSignIn}/>}
            
            
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}