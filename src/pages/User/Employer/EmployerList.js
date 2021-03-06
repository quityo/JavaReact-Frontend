import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Header, Icon, Button, Image } from "semantic-ui-react";
import EmployerService from "../../../services/employerService";

export default function EmployerList() {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    let employerService = new EmployerService();
    employerService
      .getByAsc()
      .then((result) => setEmployers(result.data.data));
  }, []);

  return (
    <div 
    style={{
      margin: "auto",
    }} className="app">
      <Header  as="h2" textAlign="center">
        <Icon name="earlybirds" />
        Employer List
      </Header>
      <Table color="blue" key="blue">
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell >Company Name</Table.HeaderCell>
            <Table.HeaderCell>Website</Table.HeaderCell>
            <Table.HeaderCell>Detail</Table.HeaderCell>
            {/* 
            <Table.HeaderCell>Confirmation</Table.HeaderCell> */}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employers.map((employer) => (
            <Table.Row textAlign="center" key={employer.userId}>
              <Table.Cell>
                <Image
                  floated="left"
                  size="tiny"
                  src={employer.image?.imageUrl}
                  circular
                ></Image>
              </Table.Cell>
              <Table.Cell textAlign="center">{employer.companyName}</Table.Cell>
              <Table.Cell textAlign="center">{employer.website}</Table.Cell>

              <Table.Cell>
                <Button
                  fluid
                  size="small"
                  color="green"
                  as={Link}
                  to={`/employers/${employer.userId}`}
                >
                  View
                </Button>
              </Table.Cell>
              {/* <Table.Cell>{employer.registrationVerification===true?"Yes":"No"}</Table.Cell> */}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
