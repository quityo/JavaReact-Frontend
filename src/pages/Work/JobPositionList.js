import React, { useEffect, useState } from "react";
import JobPositionService from "../../services/jobPositionService";
import { Table, Header, Icon } from "semantic-ui-react";

export default function JobPositionList() {
    const [positions, setPositions] = useState([]);
    useEffect(() => {
      let jobPositionService = new JobPositionService();
      jobPositionService
        .getJobPositions()
        .then((result) => setPositions(result.data.data));
    }, []);
  
    return (
      <div>
        <Header as="h2">
          <Icon name="list alternate outline" />
          <Header.Content>Job Position List</Header.Content>
        </Header>
        <Table color="blue" key="blue">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Job Title</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
  
          <Table.Body>
          {positions.map((position) => (
            <Table.Row key={position.id}>
              <Table.Cell>{position.jobTitle}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}