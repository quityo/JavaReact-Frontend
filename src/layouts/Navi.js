import React, {useState} from "react";
import { NavLink,useHistory } from "react-router-dom";
import { Container, Menu, Dropdown, Image} from "semantic-ui-react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import FavSummary from "./FavSummary";
import { useSelector } from "react-redux";

export default function Navi() {
  const {favItems} = useSelector(state => state.favSummary)
  const [state, setState] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const history = useHistory()
  function handleSignOut() {
   setIsAuthenticated(false)
   history.push("/")
  }

  function handleSignIn() {
    setIsAuthenticated(true)
   }
   

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

            
            <Menu.Item>{favItems.length>0&&<FavSummary/>}</Menu.Item>
            {isAuthenticated?<SignedIn signOut={handleSignOut} biseu="1" />
            :<SignedOut  signIn={handleSignIn}/>}
            
            
          </Menu.Menu>
         
        </Container>
      </Menu>
     
 
  </div>
   );
}