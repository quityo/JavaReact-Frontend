import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Table, Header, Icon, Image,  Divider } from "semantic-ui-react";
import { toast } from "react-toastify";
import JobAdvertService from "../../services/jobAdvertService";

import JobPositionService from "../../services/jobPositionService";
import EmployerService from "../../services/employerService";
import { Link } from "react-router-dom";
export default function ExamineJobAdvertDetail() {
  let jobAdvertService = new JobAdvertService();

  let { jobAdvertId } = useParams();

  const [jobAdverts, setJobAdverts] = useState([]);
  const [jobPosition, setPosition] = useState([])
  const [employer, setEmployers] = useState([]);

  const history = useHistory();

  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService
      .getByJobAdvertIdAndConfirmFalse(jobAdvertId)
      .then((result) => setJobAdverts([result.data.data]));
  }, []);
  useEffect(() => { 
    let jobPositionService = new JobPositionService();
    jobPositionService.getJobPositions().then(result => setPosition(result.data.data))
}, [])

useEffect(() => {
  let employerService = new EmployerService();
  employerService
    .getEmployers()
    .then((result) => setEmployers(result.data.data))
    .catch((err) => console.log(err));
}, []);
  const confirm = (jobAdvertId) => {
    jobAdvertService
      .confirm(jobAdvertId)
      .then(toast.success("İLAN ONAYLANDI"),history.push("/confirmjobadvert"));
  };

  return (
    <div className="card"
    style={{
      margin: "auto",
      alignItems: "center",
      width:"60%"
    }} >
      <Header as="h2" icon textAlign="center">
        <Header.Content>İŞ İLANI DETAYI</Header.Content>
      </Header>
      {jobAdverts.map((jobAdvert) => (
        <div>
          <Image centered size="tiny" src={jobAdvert.employer?.image?.imageUrl}></Image>
          <Divider />
            {jobAdvert.employer?.companyName}
          <Table color="red" celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center" colSpan="2">ŞİRKET</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  Şirket
                </Table.Cell>
                <Table.Cell textAlign="center" key={employer.userId}
                  >
                  
                   <Link to={`/employers/${jobAdvert.employer?.userId}`}>{jobAdvert.employer?.companyName}</Link></Table.Cell>
              </Table.Row>
              <Table.Row>
                  <Table.Cell>
                    Web Sitesi
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <a
                      target="_blank"
                      href={"https://" + jobAdvert.employer?.website}
                    >
                      {jobAdvert.employer?.website}
                    </a>
                  </Table.Cell>
                </Table.Row>
              <Table.Row>
                <Table.Cell >
                   Şehir
                </Table.Cell>
                <Table.Cell textAlign="center">{jobAdvert.city.name}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table color="yellow" celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center"colSpan="2">
                  <Icon name="users" />
                  İŞ
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Pozisyon</Table.Cell>
                <Table.Cell  textAlign="center" key={jobPosition.jobPositionId}>
                    <Link to={`/jobpositions/${jobAdvert.jobPosition?.jobPositionId}`}>{jobAdvert.jobPosition?.jobTitle}</Link></Table.Cell>
              </Table.Row>
              
              <Table.Row>
                <Table.Cell>Açık Pozisyon</Table.Cell>
                <Table.Cell textAlign="center">{jobAdvert.openPositionCount}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>Çalışma Türü</Table.Cell>
                <Table.Cell textAlign="center">{jobAdvert.workType.type}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Çalışma Zamanı</Table.Cell>
                <Table.Cell textAlign="center">{jobAdvert.workTime.title}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table color="green" celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center"colSpan="4">
                  <Icon name="money" />
                  ÜCRET
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Min Ücret</Table.Cell>
                <Table.Cell textAlign="center">{jobAdvert.salaryMin} TL</Table.Cell>
                <Table.Cell>Max Ücret</Table.Cell>
                <Table.Cell textAlign="center">{jobAdvert.salaryMax} TL</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table color="blue">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center"colSpan="4">
                  <Icon name="paperclip" />
                  AÇIKLAMA
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center">{jobAdvert.description}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table color="black">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center"colSpan="4">
                  <Icon name="time" />
                  Son Başvuru Tarihi
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center">{jobAdvert.deadline}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Button textAlign="center"
            onClick={() => confirm(jobAdvert.jobAdvertId)}
            style={{ marginTop: "5pt" }}
            floated="center"
            inverted
            color="green"
            size="medium"
          >
            ONAYLA
          </Button>
        </div>
      ))}
    </div>
  );
}