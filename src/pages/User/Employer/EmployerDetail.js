import React from 'react'
import { Button, Card, Image, Header,} from 'semantic-ui-react'
import EmployerService from "../../../services/employerService"
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
        <div style={{
          margin: "auto"
        }}>
           <Header as="h2" textAlign='center'>
        Employer Detail
      </Header>
      <br />
            <Card.Group>
            
    <Card fluid >
      <Card.Content style={{backgroundColor:"#F2F4F4"}} >
      
      <Image size="tiny" src={employer.image?.imageUrl} circular></Image>
      
        <Card.Header><br/>{employer.companyName}</Card.Header>
        <br />
        <Card.Meta>{employer.website}</Card.Meta>
        
        <Card.Description>
          <strong>"{employer.companyName}" </strong>  is a unified team of performance marketing, design, and video production<br /> experts that delivers customized digital experiences and strategies.
        </Card.Description>
        <br />
        <Card.Meta>E-mail:  {employer.email} <br /> Tel:  {employer.phoneNumber} </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
        <Button as={Link} to={"/employerUpdate"} inverted color='green'>
           Şirket Bilgilerini Güncelleme
          </Button></div>
          <div className='ui two buttons'>
          <Button as={Link} to={`/employers/${employer.jobAdvert?.jobAdvertId}`} inverted color='blue'>
            İş İlanları
          </Button>
          
        </div>
      </Card.Content>
    </Card>
  </Card.Group>
        </div>
    );
  
}