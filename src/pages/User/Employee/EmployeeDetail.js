import React,{useState , useEffect}  from 'react'
import { useParams } from 'react-router-dom'
import { Table , Button , Modal } from 'semantic-ui-react'
import EmployeeService from '../../../services/employeeService'
import EmployeeUpdate from './EmployeeUpdate'

export default function EmployeeDetail() {
    let {userId} = useParams()

    const [employee, setEmployee] = useState({})

    useEffect(() => {
        let employeeService = new EmployeeService()

        employeeService.getEmployeeId(userId).then(result => setEmployee(result.data.data))
    }, [userId])
   
    return (
        <div>
            <Table celled>
    <Table.Header>
    <Table.HeaderCell colSpan='3'>Employee</Table.HeaderCell>
      <Table.Row>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.Cell>{employee.email}</Table.Cell>
      </Table.Row>
      <Table.Row>
      <Table.HeaderCell>Password</Table.HeaderCell>
      <Table.Cell>{employee.password}</Table.Cell>
      </Table.Row>
      <Table.Row>
      <Table.HeaderCell>First Name</Table.HeaderCell>
      <Table.Cell>{employee.firstName}</Table.Cell>
      </Table.Row>
      <Table.Row>
      <Table.HeaderCell>Last Name</Table.HeaderCell>
      <Table.Cell>{employee.lastName}</Table.Cell>
      </Table.Row>
    </Table.Header>
  </Table>

  <Modal
      trigger={<Button color = "green" icon = 'edit'></Button>}
      header='Reminder!'
      content={<EmployeeUpdate employee={employee}></EmployeeUpdate>}
    />
        </div>
    )
}
