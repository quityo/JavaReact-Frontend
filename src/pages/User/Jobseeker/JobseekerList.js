import React, { useState, useEffect } from "react";
import { Table, Header, Icon, Button } from "semantic-ui-react";
import JobseekerService from "../../../services/jobseeker/jobseekerService";

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
        Jobseeker List
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
                <Button>View</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}