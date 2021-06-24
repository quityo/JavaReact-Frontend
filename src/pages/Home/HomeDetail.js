import React from 'react'
import { Link } from 'react-router-dom';
import { Icon, List, Container,Divider,Button } from 'semantic-ui-react';
import './HomeDetail.css';
export default function HomeDetail() {
    return (
        <div className="home">
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
          </Container>
          <Container>
            <Divider/>
            
            <h1>Funky Sun</h1>
            <p1><i>Human Resource Management</i></p1>
            <Divider/>
            <p2><i>Wellcome The Chosen One!</i></p2>
            <Divider/>
            <p>Human resource managers are the overseers of the human resources department and insurers of the functions and tasks being carried out by the HR team.</p>
            <p>They are often seen as the link between an organization’s management and its employees, as their work runs the gamut from providing consultation on strategic planning with top executives to recruiting, interviewing, and hiring new staff.</p>
            <p>Serving to bring together employerd and job seekers, our company is an easy-to-use and goal-oriented website to help you find the job you're looking for and not waste more time advancing your career.</p>
            <p>For Emoloyers! They can easily identify their teammates, advertise them and communicate one-on-one without any intermediaries.</p>
            <p>To start your career, continue and achieve your goals, you can search by the city you want to live in. If you wish, you can see all the jobs that have been advertised and you can reach the details of the advertisements that you think are suitable for you.</p>
            <Divider/>
            
            
            <Button fluid  size='huge' color='green'>
            <p2>We wish you a happy trip</p2>
          <Icon name='right arrow' />
        </Button>
       </Container>

           
        </div>
        
    )
}
