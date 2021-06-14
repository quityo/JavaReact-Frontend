import React from 'react'
import { Button, Card, Image} from 'semantic-ui-react'
import EmployerService from "../../../services/employerService"
import { useEffect, useState} from 'react'
import { useParams } from "react-router";


export default function EmployerDetail() {

  let { id } = useParams();
  
  const [employer, setEmployer] = useState({});

  useEffect(()=>{
    let employerService = new EmployerService()
    employerService.getEmployerId(id).then(result=>setEmployer(result.data.data))
  },[id])

 

  return(
        <div>
            <Card.Group>
            
    <Card fluid>
      <Card.Content >
      <Image floated="right" size="medium" src="{image.url}"/>
        <Card.Header>{employer.companyName}</Card.Header>
        <Card.Meta>{employer.website}</Card.Meta>
        <Card.Description>
          <strong>"{employer.companyName}" </strong>  is a unified team of performance marketing, design, and video production experts that delivers customized digital experiences and strategies.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
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
