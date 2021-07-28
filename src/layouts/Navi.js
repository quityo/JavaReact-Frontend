import React, {useState} from "react";
import { NavLink, Link } from "react-router-dom";
import { Container, Menu, Dropdown, Image, Button, Icon, DropdownItem} from "semantic-ui-react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import { useSelector } from "react-redux";
import "../../src/layouts/Navi.css"

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
        
        <Menu.Item  active={activeItem === "CvDetail"} onClick={handleItemClick} as={NavLink} to="/cvdetail">
                    <h2 style={font} >Cv Detail</h2></Menu.Item>
        
        
        <Menu.Menu position="right">
        <Menu.Item active={activeItem === "/"} onClick={handleItemClick} as={NavLink} to="/" name="Home" />
        <Menu.Item active={activeItem === "CvList"} onClick={handleItemClick} as={NavLink} to="/cvlist"> <h2 style={font} >Cv List</h2></Menu.Item>
        
        <Menu.Item active={activeItem === "CvDetail"} onClick={handleItemClick} as={NavLink} to="/cvdetail"> <h2 style={font} >Cv Detail</h2>
            </Menu.Item>
           
            <div style={{margin:"auto"}}> {authItem[0].loggedIn && authItem[0].user.userType===1 &&  <Button color="orange" as={Link} to={`/favorites`}>
              <Icon name='heart' />
              Favori İlanlar </Button >}
            </div>

            <div style={{margin:"auto"}}>
           
             {authItem[0].loggedIn && authItem[0].user.userType===3 && 
              <Dropdown item style={font} text="Admin List">
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/registeremployee">Employee Add</Dropdown.Item>
                <Dropdown.Item as={Link} to={`/employees/${authItem[0].user.userId}`}>Employee Details</Dropdown.Item>
                <Dropdown.Item as={Link} to={"/employerupdateconfirm"}>Employer Confirm</Dropdown.Item>
                <Dropdown.Item as={Link} to={"/employers"}>Employer List</Dropdown.Item>
                <Dropdown.Item as={Link} to={"/confirmjobadvert"}>Job Confirm</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>}
            </div>

            <div style={{margin:"auto"}}>
           
           {authItem[0].loggedIn && authItem[0].user.userType===2 && 
            <Dropdown item style={font} text="Employers">
            <Dropdown.Menu>
            <Dropdown.Item as={Link} to={`/employers/${authItem[0].user.userId}`}>Employer Detail</Dropdown.Item>
            <Dropdown.Item as={Link} to={"/employerUpdate"}>Employer Update</Dropdown.Item>
            <Dropdown.Item as={Link} to={"/employers"}>Employer List</Dropdown.Item>
            <Dropdown.Item as={Link} to={"/jobadverts/add"}>Job Add</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>}
          </div>
<div style={{
          margin: "auto"
        }}>
 {authItem[0].loggedIn?<SignedIn/>
            :<SignedOut/>}</div>
          
            
          </Menu.Menu>
         
        </Container>
      </Menu>
     
 
  </div>
   );
}