import React from 'react'
import {NavLink, Link } from 'react-router-dom';
import {  List, Container,Divider} from 'semantic-ui-react';

export default function SideCorporate() {
    return (
    <div>
    <Container textAlign='left'>

     <List link aling= "right" size='big'>
      <List.Item as={NavLink} to="/" 
        name="hand spock"          >
         
        Hakkımıza
      </List.Item>

      <Divider />

      <List.Item 
        as={Link} to="/employers" 
        name="earlybirds"          >
        Basında "Funky Sun"
      </List.Item>

      <Divider />

      <List.Item as={Link} to="/jobpositions" 
        name="paw"
      >
        Yayınlarımız
      </List.Item>

      <Divider />

      <List.Item as={Link} to="/jobadverts" 
        name="angellist"          >
        Gizlilik ve Kullanım
      </List.Item>

      <Divider />

      <List.Item as={Link} to="/employees" 
        name="sticker mule"          >
        Üyelik Silme
      </List.Item>

      <Divider />

      

    </List>
    </Container>
  </div>
);
}
