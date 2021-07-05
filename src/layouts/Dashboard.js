import React from "react";
import { Link} from 'react-router-dom';
import { Grid,Divider, Icon, List, Container} from "semantic-ui-react";
import Footer from "./Footer";
import Section from "./Section";
import { ToastContainer } from "react-toastify";
export default function Dashboard() {
  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
          </Grid.Column>
          <Grid.Column  width={10}>
            <Section/>
          </Grid.Column>
          
        </Grid.Row>
        <Divider />
        <Container>
            <List link horizontal size='big'>
            <List.Item as={Link} to="/jobpositions" 
            name="paw"
          >

            <Icon name="paw" />
            J.Position
          </List.Item>
          <List.Item as={Link} to="/jobadverts" 
            name="angellist"
          >
            <Icon name="angellist" />
            Job Advert
          </List.Item>
          <List.Item 
            as={Link} to="/employers" 
            name="earlybirds"
          >
            <Icon name="earlybirds" />
          Employer
          </List.Item>
          <List.Item as={Link} to="/jobseekers" 
            name="hand spock" >
              <Icon name="hand spock" />
          Jobseekers
          </List.Item>
          <List.Item as={Link} to="/employees" 
            name="sticker mule" >
              <Icon name="sticker mule" />
          Employees
          </List.Item>
          <List.Item as={Link} to="/users" 
            name="paw" >
              <Icon name="paw" />
          Users
          </List.Item>
          </List>
          <Divider />
          </Container>
        <Grid.Column fluid width={16}>
        <Footer/>
        </Grid.Column>
      </Grid>
    </div>
  );
}