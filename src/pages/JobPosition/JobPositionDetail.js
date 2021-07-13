import React, { useEffect, useState } from 'react'
import JobPositionService from '../../services/jobPositionService';
import {  Card, Header,} from 'semantic-ui-react'

import { useParams } from "react-router";
export default function JobPositionDetail() {

    let { jobPositionId } = useParams();
    const [position, setPosition] = useState([])

    useEffect(() => { 
        let jobPositionService = new JobPositionService();
        jobPositionService.getById(jobPositionId).then(result => setPosition(result.data.data))
    }, [jobPositionId])

    return (
        <div style={{margin: "auto"}}>
        <Header as="h2" textAlign='center'>
     Job Position Details
   </Header>
   <br />
   <Card.Group>
            
            <Card fluid>
            <Card.Content style={{backgroundColor:"#F2F4F4"}} >
   
     <Card.Header><br/>{position.jobTitle}</Card.Header>
     <br />
     
     
     <Card.Description>
       <strong>{position.jobDescription} </strong> </Card.Description>
     <br />
     
   </Card.Content>
   
 </Card>
  
</Card.Group>
     </div>
 );

}