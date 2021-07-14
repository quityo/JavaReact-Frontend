import React, { useEffect, useState } from 'react';
import { Link, useHistory} from 'react-router-dom'
import { Dropdown, Menu, Image} from "semantic-ui-react"
import { userLogout } from '../Store/action/authAction';
import UserService from '../services/userService';
import ImageService from '../services/imageService';
import { useDispatch, useSelector } from 'react-redux'
import EmployerUpdate from "../pages/User/Employer/EmployerUpdate"
import Popup from "reactjs-popup";

export default function SignedIn() {

   
    const {authItem} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const history = useHistory();
    const [users, setUsers] = useState({});
    const [images, setImages] = useState({});

    useEffect(()=>{
        let userService = new UserService()
        userService.getUsers().then(result=>setUsers(result.data.data))
      },[])

      useEffect(()=>{
        let imageService = new ImageService()
        imageService.getAll().then(result=>setImages(result.data.data))
      },[])

    const handleLogout=(user)=>{
        dispatch(userLogout(user))
        history.push("/")
    }
   
    return (
           <div > 
            
            <Menu.Item >
               
          <Image avatar spaced ="right"  src={authItem[0].user.image}/>
          <Dropdown pointing="top right" text={authItem[0].user.name}>
                    <Dropdown.Menu>
                        
                        {authItem[0].user.userType===1 &&<Dropdown.Item as={Link} to={`/cvs/${authItem[0].user.userId}`}>Cv Güncelle</Dropdown.Item>}
                        {authItem[0].user.userType===2 &&<Dropdown.Item><Popup trigger={<p><i className="cloud upload icon"></i>Şirket bilgilerini güncelle</p>} modal><EmployerUpdate/></Popup></Dropdown.Item>}
                        {authItem[0].user.userType===3 &&<Dropdown.Item as={Link} to={"/registeremployee"}>Employee Add</Dropdown.Item>}
                       {/* {authItem[0].user.userType===3 &&<Dropdown.Item as={Link} to={"/employeeUpdate"}>Employee Upload</Dropdown.Item>} */}
                        <Dropdown.Item onClick={()=>handleLogout(authItem[0].user)}> Çıkış yap</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}
