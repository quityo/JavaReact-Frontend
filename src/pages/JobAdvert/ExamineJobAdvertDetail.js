import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Table, Header, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import JobAdvertService from "../../services/jobAdvertService";

export default function ExamineJobAdvertDetail() {
  let jobAdvertService = new JobAdvertService();

  let { jobAdvertId } = useParams();

  const [jobAdverts, setJobAdverts] = useState([]);

  const history = useHistory();

  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService
      .getByJobAdvertIdAndConfirmFalse(jobAdvertId)
      .then((result) => setJobAdverts([result.data.data]));
  }, []);

  const confirm = (jobAdvertId) => {
    jobAdvertService
      .confirm(jobAdvertId)
      .then(toast.success("İLAN ONAYLANDI"),history.push("/confirmjobadvert"));
  };

  return (
    <div className="card">
      <Header as="h2" icon textAlign="center">
        <Header.Content>İŞ İLANI DETAYI</Header.Content>
      </Header>
      {jobAdverts.map((jobAdvert) => (
        <div>
          <Table color="red" celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="2">ŞİRKET</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                   Şirket
                </Table.Cell>
                <Table.Cell>{jobAdvert.employer.companyName}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell collapsing>
                  <Icon name="map marker alternate" /> Şehir
                </Table.Cell>
                <Table.Cell>{jobAdvert.city.name}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table color="yellow" celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="2">
                  <Icon name="users" />
                  İŞ
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Pozisyon</Table.Cell>
                <Table.Cell>{jobAdvert.jobPosition.jobTitle}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Açık Pozisyon Sayısı</Table.Cell>
                <Table.Cell>{jobAdvert.openPositionCount}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>Çalışma Türü</Table.Cell>
                <Table.Cell>{jobAdvert.workType.type}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Çalışma Zamanı</Table.Cell>
                <Table.Cell>{jobAdvert.workTime.title}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table color="green" celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  <Icon name="money" />
                  MAAŞ
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Minimum Maaş Skalası</Table.Cell>
                <Table.Cell>{jobAdvert.salaryMin} TL</Table.Cell>
                <Table.Cell>Maksimum Maaş Skalası</Table.Cell>
                <Table.Cell>{jobAdvert.salaryMin} TL</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table color="blue">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  <Icon name="paperclip" />
                  AÇIKLAMA
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{jobAdvert.description}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table color="black">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  <Icon name="time" />
                  Son Başvuru Tarihi
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{jobAdvert.deadline}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Button
            onClick={() => confirm(jobAdvert.jobAdvertId)}
            style={{ marginTop: "5pt" }}
            floated="right"
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