import React, { useEffect } from 'react'
import { useState } from 'react';
import { Table } from "semantic-ui-react";
import JobseekerService from '../../../services/jobseeker/jobseekerService';


export default function JobseekerInfo() {
    const [jobseeker, setJobseeker] = useState({});
    useEffect(() => {
      let jobseekerService = new JobseekerService();
      jobseekerService
        .getJobseekers()
        .then((result) => setJobseeker(result.data.data));
    }, []);
    return (
        
            
        
         
          
              <Table padded definition >
               <Table.Body>
            <Table.Row >
              <Table.Cell collapsing>{jobseeker.firstName}</Table.Cell>
                       
              <Table.Cell collapsing>{jobseeker.lastName}</Table.Cell>
          
              <Table.Cell collapsing>{jobseeker.dateOfBirth}</Table.Cell>
           
            </Table.Row>
            </Table.Body>
            </Table>
            
       
    );
  }
