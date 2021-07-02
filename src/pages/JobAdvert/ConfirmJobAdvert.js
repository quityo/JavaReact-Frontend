import React, { useEffect, useState } from 'react'
import JobAdvertService from '../../services/jobAdvertService'
import {Button, Card, Image,Icon} from 'semantic-ui-react'

export default function ConfirmJobAdvert() {


  const [jobAdverts, setJobAdverts] = useState([])
  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService.getByConfirmFalse().then(result => setJobAdverts(result.data.data))
  }, [jobAdverts])



  
  const handleClick = function (jobAdvertId) {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService.confirm(jobAdvertId, "true").then()

  }
return(
  <div>
    
      <Card.Group>
      {jobAdverts.map((j) => ( 
        <Card fluid key={j.jobAdvertId} >
      

<Card.Content style={{backgroundColor:"#F2F4F4"}}>
  <Card.Header>{j.jobPosition.jobTitle}</Card.Header>
  <Image floated="left" size="tiny" circular src={j.employer?.image?.imageUrl}></Image>
  <Card.Meta>{j.employer?.companyName}</Card.Meta>
  <Card.Meta>{j.city?.name}</Card.Meta>
  <Card.Meta>{j.description}</Card.Meta>
  <Card.Meta>{j.workTime?.title}</Card.Meta>
  <Card.Description></Card.Description>
</Card.Content>
<Card.Content extra>
  <div className='ui two buttons'>
  <Button circular basic  >
                                    <Icon style={{ color: "#008080" }} name='delete' />
                                    Reddet
                                </Button>
    
                                <Button onClick={e => handleClick(jobAdverts.jobAdvertId)} circular style={{
                                    backgroundColor: "#008080",
                                    borderColor: "#008080",
                                    color: "white",
                                }} >
                                    <Icon name='checkmark' />Onayla</Button>
  </div>
</Card.Content>
</Card>
      ))}
</Card.Group>
  </div>
);
};

