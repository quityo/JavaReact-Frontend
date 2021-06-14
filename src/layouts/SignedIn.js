import React from 'react';
import { useEffect, useState} from 'react'
import { Dropdown, Menu, Image} from "semantic-ui-react"
import ImageService from '../services/imageService';

export default function SignedIn(props) {
    
    const [image, setImage] = useState({});

    useEffect(() => {
        let imageService = new ImageService();
        imageService.getById()
   
      .then((result) => setImage(result.data.data));
  }, []);
    return (
        <div>
            <Menu.Item>
            
                <Image avatar spaced="right" src={image.id}/>
                <Dropdown pointing="top left" text="FuFu">
                    <Dropdown.Menu>
                        <Dropdown.Item text="Bilgilerim" icon="info" />

                        <Dropdown.Item  onClick={props.signOut} text="Çıkış Yap" icon="info" />
   
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
            
        </div>
    )
}