import React, { useState, useEffect } from 'react'
import { Table, Header, Icon } from "semantic-ui-react";
import JobseekerService from '../../services//jobseeker/jobseekerService';
import EmployeeService from '../../services/employeeService';
import EmployerService from '../../services/employer/employerService';

export default function UserList() {
    
    const [jobseekers, setJobseekers] = useState([]);
    useEffect(() => {
      let jobseekerService = new JobseekerService();
      jobseekerService
        .getJobseekers()
        .then((result) => setJobseekers(result.data.data));
    }, []);

    const [employees, setEmployees] = useState([]);

  useEffect(() => {
    let employeeService = new EmployeeService();
    employeeService
      .getEmployees()
      .then((result) => setEmployees(result.data.data));
  }, []);

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
        <Header as="h2" textAlign='center' >
          <Icon name="paw" color='orange'/>
          Users List
          
        </Header>
        <Header as="h2" textAlign='center' >
          
          Jobseekers List
          
        </Header>
        <Table color="blue" key="blue">
          <Table.Header>
          <Table.Row textAlign='center'>
          
            <Table.HeaderCell>FirstName</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          
  
          <Table.Body>
          {jobseekers.map((jobseeker) => (
            <Table.Row textAlign='center' key = {jobseeker.id}>
              <Table.Cell>{jobseeker.firstName}</Table.Cell>
              <Table.Cell>{jobseeker.lastName}</Table.Cell>
              <Table.Cell>{jobseeker.email}</Table.Cell>
             
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Header as="h2" textAlign='center'>
        Employee List
        </Header>
        <Table color="blue" key="blue">
          <Table.Header>
          <Table.Row textAlign='center'>
          
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employees.map((employee) => (
            <Table.Row textAlign='center' key={employee.id}>
              <Table.Cell>{employee.firstName}</Table.Cell>
              <Table.Cell>{employee.lastName}</Table.Cell>
              <Table.Cell>{employee.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Header as="h2" textAlign='center'>
        Employer List
      </Header>
      <Table color="blue" key="blue">
        <Table.Header >
          <Table.Row textAlign='center'>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
            <Table.HeaderCell>Website</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body >
          {employers.map((employer) => (
            <Table.Row textAlign='center' key = {employer.id}>
              <Table.Cell>{employer.companyName}</Table.Cell>
              <Table.Cell>{employer.website}</Table.Cell>
              <Table.Cell>{employer.email}</Table.Cell>             
            
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
    )
}
