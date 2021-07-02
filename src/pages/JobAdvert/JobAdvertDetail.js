import React, { useState, useEffect } from "react";
import { Table, Image,  Icon, Segment, Divider } from "semantic-ui-react";
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
      
      <div className="card" >
        
        {jobAdverts.map((jobAdvert) => (
         
          <div>
            <Segment color="green" textAlign="center">
              İLAN DETAYI
            </Segment>
            <Image centered size="tiny" src={jobAdvert.employer?.image?.imageUrl}></Image>
            <Divider />
            {jobAdvert.employer?.companyName}
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
                  <Table.Cell collapsing>
                    <Icon name="phone" />
                    Telefon Numarası
                  </Table.Cell>
                  <Table.Cell textAlign="center">{jobAdvert.employer?.phoneNumber}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Icon name="map marker alternate" />
                    Şehir
                  </Table.Cell>
                  <Table.Cell textAlign="center">{jobAdvert.city?.name}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table color="yellow" celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="center" colSpan="2">
                    <Icon name="users" />
                    İŞ BİLGİLERİ
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Pozisyon</Table.Cell>
                  <Table.Cell  textAlign="center">{jobAdvert.jobPosition?.jobTitle}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>Açık Pozisyon Sayısı</Table.Cell>
                  <Table.Cell  textAlign="center">{jobAdvert.openPositionCount}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Çalışma Türü</Table.Cell>
                  <Table.Cell  textAlign="center">{jobAdvert.workType?.type}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Çalışma Zamanı</Table.Cell>
                  <Table.Cell  textAlign="center">{jobAdvert.workTime?.title}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table color="green" celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="center" colSpan="4">
                    <Icon name="money" />
                    ÜCRET BİLGİLERİ
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Minimum Ücret</Table.Cell>
                  <Table.Cell positive>{jobAdvert.salaryMin} TL</Table.Cell>
                  <Table.Cell>MaksimumÜcret</Table.Cell>
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
                  <Table.Cell  textAlign="center">{jobAdvert.description}</Table.Cell>
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
                  <Table.Cell  textAlign="center" negative>{jobAdvert.deadline}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        ))}
       
      </div>
    );
  }
