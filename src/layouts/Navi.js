import React, {useState} from "react";
import { NavLink, Link } from "react-router-dom";
import { Container, Menu, Dropdown, Image, Button, Icon} from "semantic-ui-react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import { useSelector } from "react-redux";

export default function Navi() {

  const {authItem} = useSelector(state => state.auth)
  const [state, setState] = useState({})

 
   

const font = {
   fontFamily:"New Times Roman",
   fontWeight:100,
   fontSize:"1.1rem",
   color:"white",
   margin: "auto",
}



   const handleItemClick = (e, { name }) => setState({ activeItem: name })
   const { activeItem } = state
   return (
<div>
      <Menu inverted fixed="top">
        <Container margin="auto">
        <Menu.Menu position="center"/>
        <Menu.Item>
        <Image style={{width:"35px" ,
         height:" 40px",
         margin:"0 15px 0 0"}} src={"https://res.cloudinary.com/fufufu/image/upload/v1625168938/yqkd4vauoa5tvmif7gq2.png"}></Image>
        <h1 style={font} >Funky Sun</h1>

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

            {authItem[0].loggedIn && authItem[0].user.userType===1 &&  <Button color="red" as={Link} to={`/favorites`}>
              <Icon name='heart' />
              Favori İlanlar
            </Button>}
            {authItem[0].loggedIn?<SignedIn/>
            :<SignedOut/>}
            
            
          </Menu.Menu>
         
        </Container>
      </Menu>
     
 
  </div>
   );
}