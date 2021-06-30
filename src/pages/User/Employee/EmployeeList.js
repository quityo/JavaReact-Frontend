import React, { useState, useEffect } from "react";
import { Table, Header, Icon, Button } from "semantic-ui-react";
import EmployeeService from "../../../services/employeeService";
import { Link } from "react-router-dom";
export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    let employeeService = new EmployeeService();
    employeeService
      .getEmployees()
      .then((result) => setEmployees(result.data.data));
  }, []);

  return (
    <div>
      <Header as="h2" textAlign='center'>
        <Icon name="sticker mule" color='teal' />
        Employee List
      </Header>
      <Table color="blue" key="blue">
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell/>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employees.map((employee) => (
            <Table.Row textAlign='center' key={employee.employeeId}>
              <Table.Cell>{employee.firstName}</Table.Cell>
              <Table.Cell>{employee.lastName}</Table.Cell>
              <Table.Cell>{employee.email}</Table.Cell>
              <Table.Cell>
              <Button
              color={"green"}
                  animated="fade"
                  as={Link}
                  to={`/employeeUpdate/${employee.employeeId}`}
                >
                  <Button.Content visible>Güncelle</Button.Content>
                  </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}