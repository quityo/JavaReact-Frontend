import React, { useEffect, useState } from "react";
import JobPositionService from "../../services/jobPositionService";
import { Table, Header, Icon } from "semantic-ui-react";

export default function JobPositionList() {
    const [jobPositions, setJobPositions] = useState([]);
    useEffect(() => {
      let jobPositionService = new JobPositionService();
      jobPositionService
        .getByAsc()
        .then((result) => setJobPositions(result.data.data));
    }, []);
  
    return (
      
      <div>
        
        <Header as="h2" textAlign='center' >
          <Icon name="paw" color='orange'/>
          Job Position List
          
        </Header>
        <Table color="blue" key="blue">
          <Table.Header >
            <Table.Row >
              <Table.HeaderCell textAlign='center'>Job Title</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
  
          <Table.Body>
          {jobPositions.map((position) => (
            <Table.Row textAlign='center' key={position.jobPositionId}>
              <Table.Cell>{position.jobTitle}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}