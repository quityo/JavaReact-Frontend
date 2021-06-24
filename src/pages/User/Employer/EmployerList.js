import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Header, Icon, Button } from "semantic-ui-react";
import EmployerService from "../../../services/employer/employerService";

export default function EmployerList() {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    let employerService = new EmployerService();
    employerService
      .getEmployers()
      .then((result) => setEmployers(result.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header as="h2" textAlign='center'>
        <Icon name="earlybirds"  />
        Employer List
      </Header>
      <Table color="blue" key="blue">
        <Table.Header >
          <Table.Row textAlign='center'>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
            <Table.HeaderCell>Website</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
            <Table.HeaderCell>Detail</Table.HeaderCell>
            <Table.HeaderCell>Confirmation</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body >
          {employers.map((employer) => (
            <Table.Row textAlign='center' key = {employer.userId}>
              <Table.Cell><Link to={`/employers/${employer.userId}`}>{employer.companyName}</Link></Table.Cell>
              <Table.Cell>{employer.website}</Table.Cell>
              <Table.Cell>{employer.email}</Table.Cell>
              <Table.Cell>{employer.phoneNumber}</Table.Cell>
              
              <Table.Cell>
                <Button>View</Button>
              </Table.Cell>
              <Table.Cell>{employer.registrationVerification===true?"Yes":"No"}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}