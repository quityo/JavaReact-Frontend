
import React,{ useState, useEffect } from "react";
import {
  Table,
  Segment,
  Container,
  Icon,
  Card,
  Button
} from "semantic-ui-react";
import swal from "sweetalert";
import EmployerService from "../../../services/employerService";

export default function EmployerUpdateConfirm() {
    
    const [employers, setEmployers] = useState([]);

useEffect(() => {
  let employerService = new EmployerService();
  employerService.getByConfirmStatusFalse().then((result) => setEmployers(result.data.data));
}, []);

const confirmStatusTrue = (userId) => {
    let employerService = new EmployerService();
    employerService.updateConfirmStatus(userId).then((result) => console.log(result.data.data));
    
      swal({
        title: "Başarılı!",
        text: "Şirket bilgileri onaylandı!",
        icon: "success",
        button: "OK",
      });
  };

return (
    <div style={{
        margin: "auto",
        alignItems: "center",
      }} >
         <Segment vertical>
    <Container>
      <Card fluid color="black">
        {" "}
        <Card.Header
          as="h2"
          textAlign="center"
          style={{ fontSize: "2em", marginBottom: "1em", marginTop: "1em" }}
        >
          
          Onay Bekleyen Şirketler
        </Card.Header>
        <Card.Content>
          <Table color="black">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Company Name</Table.HeaderCell>
                <Table.HeaderCell>Tel No</Table.HeaderCell>
                <Table.HeaderCell>Website</Table.HeaderCell>
                <Table.HeaderCell>E-Mail</Table.HeaderCell>
                <Table.HeaderCell>Password</Table.HeaderCell>
                <Table.HeaderCell>Onay Durumu</Table.HeaderCell>
                <Table.HeaderCell>Onay İşlemi</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body >
              {employers.map((employer) => (
                <Table.Row key={employer.userId} 
                >
                  <Table.Cell>
                    {employer.employerUpdate?.companyName}
                  </Table.Cell>
                  <Table.Cell>{employer.employerUpdate?.phoneNumber} </Table.Cell>
                  <Table.Cell>{employer.employerUpdate?.website}</Table.Cell>
                  <Table.Cell>{employer.employerUpdate?.email}</Table.Cell>
                  <Table.Cell>{employer.employerUpdate?.password}</Table.Cell>
                  <Table.Cell>{employer.employerUpdate?.confirmStatus === false
                      ? "Onaylanmadı"
                      : " "}
                  </Table.Cell>
                  <Table.Cell>
                     
                    <Button
                      animated
                      basic
                      color="green"
                      onClick={(e) =>
                        confirmStatusTrue(employer.employerUpdate?.userId)
                      }
                    >
                      <Button.Content visible>Onayla</Button.Content>
                      <Button.Content hidden>
                        <Icon name="check" />
                      </Button.Content>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>
    </Container>
  </Segment>
    </div>
)
}