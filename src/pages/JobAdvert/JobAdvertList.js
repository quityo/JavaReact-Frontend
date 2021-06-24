import React, { useEffect, useState } from 'react'
import { Card, Header} from 'semantic-ui-react';
import JobAdvertService from "../../services/jobAdvertService";
import {NavLink} from "react-router-dom"

export default function JobAdvertList() {
  const [jobAdverts, setJobAdverts] = useState([]);

useEffect(() => {
  let jobAdvertService = new JobAdvertService();
  jobAdvertService
    .getByConfirmAndActiveTrue()
    .then((result) => setJobAdverts(result.data.data));
}, []);

return (
  <div>
    <Header className="app" as="h2" icon textAlign="center">
      <Header.Content>
        İş İlanları
      </Header.Content>
    </Header>
    <Card.Group>
      {jobAdverts.map((jobAdvert) => (
        <Card
          color="yellow"
          fluid
          as={NavLink}
          to={`/jobadverts/${jobAdvert.jobAdvertId}`}
        >
          <Card.Content>
         
            <Card.Header>{jobAdvert.jobPosition.jobTitle}</Card.Header>
            <Card.Meta>{jobAdvert.employerCompanyName}</Card.Meta>
            <Card.Meta>{jobAdvert.workType.type}</Card.Meta>
            <Card.Description>
              
              {jobAdvert.city.name}
            </Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  </div>
);
}