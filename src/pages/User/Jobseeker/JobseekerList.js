import React, { useState, useEffect } from "react";
import { Table, Header, Icon, Button } from "semantic-ui-react";
import JobseekerService from "../../../services/jobseeker/jobseekerService";
import { Link } from "react-router-dom";
export default function JobseekerList() {
  const [jobseekers, setJobseekers] = useState([]);
  useEffect(() => {
    let jobseekerService = new JobseekerService();
    jobseekerService
      .getJobseekers()
      .then((result) => setJobseekers(result.data.data));
  }, []);

  return (
    <div>
      <Header as="h2" textAlign='center'>
        <Icon name="hand spock" color='teal'></Icon>
        Jobseekers List
      </Header>
      <Table color="blue" key="blue">
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Detail</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobseekers.map((jobseeker) => (
            <Table.Row textAlign='center' key = {jobseeker.id}>
              <Table.Cell>{jobseeker.firstName}</Table.Cell>
              <Table.Cell>{jobseeker.lastName}</Table.Cell>
              <Table.Cell>{jobseeker.email}</Table.Cell>
              <Table.Cell>
              <Button
              color={"green"}
                  animated="fade"
                  as={Link}
                  to={`/cvlist/${jobseeker.userId}`}
                >
                  <Button.Content visible>Wiew</Button.Content>
                  </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}