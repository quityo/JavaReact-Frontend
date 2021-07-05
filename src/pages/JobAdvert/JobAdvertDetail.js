import React, { useState, useEffect } from "react";
import { Table, Image,  Icon, Segment, Divider, Button, Popup, } from "semantic-ui-react";
import JobAdvertService from "../../services/jobAdvertService";
import JobPositionService from "../../services/jobPositionService";
import EmployerService from "../../services/employerService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { addToFav } from "../../Store/action/favAction";

export default function JobAdvertDetail() {
  

  let { jobAdvertId } = useParams();

  const dispatch = useDispatch();
  const [jobAdverts, setJobAdverts] = useState([]);
  const [jobPosition, setPosition] = useState([])
  const [employer, setEmployers] = useState([]);


    useEffect(() => {
      let jobAdvertService = new JobAdvertService();
      jobAdvertService.getById(jobAdvertId)
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

    const handleAddToFav = (jobAdvert) => {
      dispatch(addToFav(jobAdvert))
      toast.success(`${jobAdvert.jobPosition.jobTitle} added to system!`)
  }
  
    return (
      
      <div style={{
        margin: "auto",
        alignItems: "center",
        width:"60%"
      }} >
        
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
                    BİLGİLERİ
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body >
                <Table.Row>
                  <Table.Cell >
                    <Icon name="warehouse" /> Şirket
                  </Table.Cell>
                  <Table.Cell textAlign="center" key={employer.userId}
                  >
                  
                   <Link to={`/employers/${jobAdvert.employer?.userId}`}>{jobAdvert.employer?.companyName}</Link></Table.Cell>
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
                    
                    İŞ BİLGİLERİ
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
                    
                    ÜCRET BİLGİLERİ
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Min Ücret</Table.Cell>
                  <Table.Cell positive>{jobAdvert.salaryMin} TL</Table.Cell>
                  <Table.Cell>Max Ücret</Table.Cell>
                  <Table.Cell positive>{jobAdvert.salaryMax} TL</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table color="blue">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="center" colSpan="4">
                 
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
              <Table color="black">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="center" colSpan="4">
                  Add to Favorites
                  </Table.HeaderCell>
                  </Table.Row>
              </Table.Header>
              <Table.Cell textAlign="center"><Button  style={{background:`transparent`}} onClick={() => handleAddToFav(jobAdvert)} > <Popup
                                    trigger={<Icon name='star' color='red'  />}
                                    content='Add to Favorites'
                                    
                                /></Button></Table.Cell>
              
            </Table>
            
          </div>
        ))}
    
      </div>
    );
  }
