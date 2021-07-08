import React, { useEffect, useState } from 'react';
import { Link, useHistory} from 'react-router-dom'
import { Dropdown, Menu, Image} from "semantic-ui-react"
import { userLogout } from '../Store/action/authAction';
import UserService from '../services/userService';
import ImageService from '../services/imageService';
import { useDispatch, useSelector } from 'react-redux'
export default function SignedIn() {

   
    const {authItem} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const history = useHistory();
    const [users, setUsers] = useState({});
    const [image, setImages] = useState({});

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
        
       
        <div> 
            
            <Menu.Item>
            <Image avatar spaced ="right"  src= {image.imageUrl}/>
            <Menu.Item></Menu.Item><Dropdown pointing="top right" text={authItem[0].user.name}>
                    <Dropdown.Menu>
                        {authItem[0].user.userType===1 &&<Dropdown.Item as={Link} to={`/cvs/${authItem[0].user.userId}`}>Cv ni Güncelle</Dropdown.Item>}
                        <Dropdown.Item onClick={()=>handleLogout(authItem[0].user)}> Çıkış yap</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}
