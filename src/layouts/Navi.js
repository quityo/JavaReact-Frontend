import React, {useState} from "react";
import { NavLink,useHistory } from "react-router-dom";
import { Container, Input,Button,Menu, Dropdown} from "semantic-ui-react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import City from "../pages/City/City"

export default function Navi() {
  const [state, setState] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const history = useHistory()
  function handleSignOut(params) {
   setIsAuthenticated(false)
   history.push("/")
  }

  function handleSignIn(params) {
    setIsAuthenticated(true)
   }
   

const font = {
   fontFamily:"New Times Roman",
   fontWeight:100,
   fontSize:"1.1rem",
   color:"white"



}

   const handleItemClick = (e, { name }) => setState({ activeItem: name })
   const { activeItem } = state
   return (
<div>
      <Menu inverted fixed="top">
        <Container>
        <Menu.Menu position="center"/>
        <Menu.Item>
        <h1 style={font} >Spiral Sun</h1>

        </Menu.Item> 
        <Menu.Item as={NavLink} to="/jobadverts">İş İlanları</Menu.Item>
         {/*  <Menu.Item as={NavLink} to="/confirmjobadvert">
            Bildirimler
          </Menu.Item> */}
        <Menu.Item active={activeItem === "jobadvert/add"} onClick={handleItemClick} as={NavLink} to="/jobadverts/add" name="İlan Ver" />
        <Menu.Item style={{ marginRight: 20 }} active={activeItem === "confirmjobadvert"} onClick={handleItemClick} as={NavLink} to="/confirmjobadvert">
                    
                    <h1 style={font}>İlan Onayı</h1></Menu.Item> 
        <Menu.Item active={activeItem === "CvDetail"} onClick={handleItemClick} as={NavLink} to="/cvDetail">
                    <h1 style={font} >Cv Detail</h1></Menu.Item>
        
               
        
        <Menu.Menu position="right">
        <Menu.Item active={activeItem === "/"} onClick={handleItemClick} as={NavLink} to="/" name="Home" />
        <Menu.Item active={activeItem === "CvList"} onClick={handleItemClick} as={NavLink} to="/cvList">
            
          
                <h1 style={font} >Cv List</h1>
            </Menu.Item>
          
                 

          
             <Dropdown item style={font} text="İş Veren">
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to="/loginemployer">
                  Giriş
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/registeremployer">
                  Kayıt
                  </Dropdown.Item>
                <Dropdown.Item>Sizi Arayalım</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> 
            {isAuthenticated?<SignedIn signOut={handleSignOut} biseu="1" />
            :<SignedOut  signIn={handleSignIn}/>}
            
            
          </Menu.Menu>
        </Container>
      </Menu>
     <Input type='text' placeholder='Position/CompanyName...' action>
     <input />

     <City />

     <Button color='teal' type='submit'>Search</Button>
 </Input>
 
  </div>
   );
}