import React, { useState, useEffect } from "react";
import { Table,   Icon, Segment } from "semantic-ui-react";
import JobAdvertService from "../../services/jobAdvertService";
import { useParams } from "react-router-dom";
export default function JobAdvertDetail() {
  let { jobAdvertId } = useParams();
    const [jobAdverts, setJobAdverts] = useState([]);
  
    useEffect(() => {
      let jobAdvertService = new JobAdvertService();
      jobAdvertService.getById(jobAdvertId)
        .then((result) => setJobAdverts([result.data.data]));
    }, []);
  
    return (
      <div className="card">
        {jobAdverts.map((jobAdvert) => (
          
          <div>
            <Segment color="green" textAlign="center">
              İLAN DETAYI
            </Segment>
            <Table   celled striped>
              <Table.Header >
                <Table.Row >
                  <Table.HeaderCell textAlign="center" colSpan="2">
                  
                    ŞİRKET
                    <br />
                    BİLGİLERİ
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body >
                <Table.Row>
                  <Table.Cell >
                    <Icon name="warehouse" /> Şirket
                  </Table.Cell>
                  <Table.Cell textAlign="center">{jobAdvert.employer?.companyName}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Icon name="world" />
                    Web Sitesi
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      target="_blank"
                      href={"https://" + jobAdvert.employer?.website}
                    >
                      {jobAdvert.employer?.website}
                    </a>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>
                    <Icon name="phone" />
                    Telefon Numarası
                  </Table.Cell>
                  <Table.Cell>{jobAdvert.employer?.phoneNumber}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Icon name="map marker alternate" />
                    Şehir
                  </Table.Cell>
                  <Table.Cell>{jobAdvert.city?.name}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table color="yellow" celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="center" colSpan="2">
                    <Icon name="users" />
                    İŞ
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Pozisyon</Table.Cell>
                  <Table.Cell>{jobAdvert.jobPosition?.jobTitle}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>Açık Pozisyon Sayısı</Table.Cell>
                  <Table.Cell>{jobAdvert.openPositionCount}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Çalışma Türü</Table.Cell>
                  <Table.Cell>{jobAdvert.workType?.type}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Çalışma Zamanı</Table.Cell>
                  <Table.Cell>{jobAdvert.workTime?.title}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table color="green" celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="center" colSpan="4">
                    <Icon name="money" />
                    MAAŞ
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Minimum Maaş Skalası</Table.Cell>
                  <Table.Cell positive>{jobAdvert.salaryMin} TL</Table.Cell>
                  <Table.Cell>Maksimum Maaş Skalası</Table.Cell>
                  <Table.Cell positive>{jobAdvert.salaryMax} TL</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table color="blue">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="center" colSpan="4">
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
                  <Table.HeaderCell textAlign="center" colSpan="4">
                    <Icon name="time" />
                    Son Başvuru Tarihi
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell negative>{jobAdvert.deadline}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        ))}
       
      </div>
    );
  }
