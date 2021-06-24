import React from 'react'
import { Button, Card, Image} from 'semantic-ui-react'
import EmployerService from "../../../services/employer/employerService"
import { useEffect, useState} from 'react'
import { useParams } from "react-router";
import { Link } from 'react-router-dom';


export default function EmployerDetail() {

  let { userId } = useParams();
  
  const [employer, setEmployer] = useState({});

  useEffect(()=>{
    let employerService = new EmployerService()
    employerService.getEmployerId(userId).then(result=>setEmployer(result.data.data))
  },[userId])

 

  return(
        <div>
            <Card.Group>
            
    <Card fluid>
      <Card.Content >
      <Image floated="right" size="medium" src="http://res.cloudinary.com/fufufu/image/upload/v1624321880/fotr8baxpemwa2kqfcxi.jpg"/>
        <Card.Header>{employer.companyName}</Card.Header>
        <Card.Meta>{employer.website}</Card.Meta>
        <Card.Description>
          <strong>"{employer.companyName}" </strong>  is a unified team of performance marketing, design, and video production experts that delivers customized digital experiences and strategies.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button as={Link} to='/jobadverts/:jobAdvertId' basic color='green'>
            İş İlanları
          </Button>
          <Button basic color='red'>
            Şirket Bilgileri
          </Button>
        </div>
      </Card.Content>
    </Card>
  </Card.Group>
        </div>
    );
  
}