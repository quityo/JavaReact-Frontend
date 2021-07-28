import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CvService from "../../services/cvService";
import EducationUpdate from "./Education/EducationUpdate";
import LanguageUpdate from "./Language/LanguageUpdate";
import SkillUpdate from "./Skill/SkillUpdate";
import ExperienceUpdate from "./Experience/ExperienceUpdate";
import GitHubUpdate from "./Links/GitHubUpdate";
import LinkedinUpdate from "./Links/LinkedinUpdate";
import BiographyUpdate from "./Links/BiographyUpdate";
import ImageUpdate from "../Image/ImageUpdate";
import ImageService from "../../services/imageService";
import { Card, Image, Table, Header, Button, Icon } from "semantic-ui-react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


export default function CvDetail() {
   
  const {authItem} = useSelector(state => state.auth)

  let { userId, imageId } = useParams();

  let [cv, setCv] = useState({});
  let [image, setImage] = useState({});

  let imageService = new ImageService();
  let cvService = new CvService();
  
  useEffect(() => {  
    imageService.getByImageId(imageId).then((result) =>  setImage(result.data.data));
     cvService.getByJobseeker(userId).then((result) => setCv(result.data.data));
  }, [userId, imageId]);

  let myProfile = false;
  if(authItem[0].loggedIn === false){
    myProfile=false
  }else if(authItem[0].loggedIn === true){
    myProfile = parseInt(authItem[0].user.userId) === parseInt(userId);
  }

  const handleGithubDelete = (cvId) => {
    cvService.deleteGithub(cvId).then((result) => {
      toast.success(result.data.message)
      updateCvValues();
    }).catch((result) => {
      toast.error(result.response.data.message)
    })
  }

  const handleLinkedinDelete = (cvId) => {
    cvService.deleteLinkedin(cvId).then((result) => {
      toast.success(result.data.message)
      updateCvValues();
    }).catch((result) => {
      alert(result.response.data.message)
      toast.error(result.response.data.message)
    })
  }

  const updateCvValues = () => {
    cvService.getByJobseeker(userId).then((result) => {
      setCv(result.data.data)
    })
  }

  return (
    <div style={{
      margin: "auto",
      alignItems: "center",
      
    }}>
      <Card.Group>
        <Card fluid color={"black"}>
          <Card.Content>
             
<Image size="small" floated="left" src={cv.jobseeker?.image?.imageUrl} circular></Image>
            {myProfile && <Popup trigger={<button className="ui button">Upload</button>} modal>
                            <ImageUpdate cvId={cv.cvId} updateCvValues={updateCvValues} />
                          </Popup>}

            <Card.Header style={{marginTop:"1.1em", fontFamily:"Arial",fontSize:"30px"}}>
            
             {cv.jobseeker?.firstName + " " + cv.jobseeker?.lastName}
            </Card.Header>
            <br />
            <Card.Meta>
              <strong>{cv.jobseeker?.email}</strong>
            </Card.Meta>
            <Card.Description>
              <Table celled color={"black"}>
                <Table.Header>
                  <Table.Row textAlign="center" backGroundColor="grey">
                    <Table.HeaderCell>Joobseker</Table.HeaderCell>
                    <Table.HeaderCell>Details</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>First Name</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell textAlign="center">{cv.jobseeker?.firstName}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Last Name</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell textAlign="center">{cv.jobseeker?.lastName}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Birth Day</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell textAlign="center">{cv.jobseeker?.dateOfBirth}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>E-mail</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell textAlign="center">{cv.jobseeker?.email}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content >
                          <a
                            href={cv.githubAddress}
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <Button secondary disabled={!cv.githubAddress}>
                              <Icon name="github" /> Github
                            </Button>
                          </a>
                          {myProfile && <Popup trigger={<button className="ui button"> Update </button>} modal>
                            <GitHubUpdate cvId={cv.cvId} updateCvValues={updateCvValues} />
                          </Popup>}
                          {myProfile && <Button color="red" circular icon="x" onClick={() => handleGithubDelete(cv.cvId)} disabled={!cv.githubAddress}>
                            </Button>}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell textAlign="center">{cv.githubAddress}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <a
                            href={cv.linkedin}
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <Button color="linkedin" disabled={!cv.linkedinAddress}>
                              <Icon name="linkedin" /> LinkedIn
                            </Button>
                          </a>
                          {myProfile && <Popup trigger={<button className="ui button"> Update </button>} modal>
                            <LinkedinUpdate cvId={cv.cvId} updateCvValues={updateCvValues} />
                          </Popup>}
                          {myProfile && <Button color="red" icon="x" circular disabled={!cv.linkedinAddress} onClick={() => handleLinkedinDelete(cv.cvId)}>
                            </Button>}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell textAlign="center">{cv.linkedinAddress}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card.Description>
          </Card.Content>
          <Card.Content extra></Card.Content>
        </Card>
      </Card.Group>
      
      <Card fluid color={"black"}>
        <Card.Content >
          <Card.Header>
          Education
          {myProfile && <Popup trigger={<button className="ui button" style={{marginLeft:"1em"}}> Update </button>} modal>
                            <EducationUpdate cvId={cv.cvId} updateCvValues={updateCvValues}/>
                          </Popup>}
          </Card.Header>
        </Card.Content>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row textAlign="center" >
              <Table.HeaderCell>School Name</Table.HeaderCell>
              <Table.HeaderCell>Department</Table.HeaderCell>
              <Table.HeaderCell>Start Year</Table.HeaderCell>
              <Table.HeaderCell>End Year</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv.educations?.map((education) => (
              <Table.Row key={education.educationId} textAlign="center">
                <Table.Cell>{education.schoolName}</Table.Cell>
                <Table.Cell>{education.department}</Table.Cell>
                <Table.Cell>{education.startYearOfSchool}</Table.Cell>
                <Table.Cell>{education.endYearOfSchool ? education.endYearOfSchool:<p>Devam Ediyor</p>}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <Card fluid>
        <Card.Content >
          <Card.Header>
          Experiences
            {myProfile && <Popup trigger={<button className="ui button" style={{marginLeft:"1em"}}> Update </button>} modal>
                            <ExperienceUpdate cvId={cv.cvId} updateCvValues={updateCvValues} />
                          </Popup>}
          </Card.Header>
        </Card.Content>
          <Table celled color={"black"} textAlign="center">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Company</Table.HeaderCell>
                <Table.HeaderCell>Position</Table.HeaderCell>
                <Table.HeaderCell>Start Year</Table.HeaderCell>
                <Table.HeaderCell>End Year</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
            {cv.experiences?.map((experience) => (
              <Table.Row key={experience.experienceId}>
                <Table.Cell>{experience.workingPlace}</Table.Cell>
                <Table.Cell>{experience.position}</Table.Cell>
                <Table.Cell>{experience.startYearOfSchool}</Table.Cell>
                <Table.Cell>{experience.endYearOfSchool ? experience.endYearOfSchool:<p>Devam Ediyor</p>}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          </Table>
      </Card>

      <Card fluid color={"black"}>
        <Card.Content>
          <Card.Header>
            Languages
            {myProfile && <Popup trigger={<button className="ui button" style={{marginLeft:"1em"}}> Update </button>} modal>
                            <LanguageUpdate cvId={cv.cvId} updateCvValues={updateCvValues}/>
                          </Popup>}
          </Card.Header>
        </Card.Content>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Language</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Level</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv.languages?.map((language) => (
              <Table.Row key={language.languageId}>
                <Table.Cell textAlign="center">{language.language}</Table.Cell>
                <Table.Cell textAlign="center">{language.level}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Card fluid color={"black"}>
        <Card.Content>
          <Card.Header>
          Skills
          {myProfile && <Popup trigger={<button className="ui button" style={{marginLeft:"1em"}}> Update </button>} modal>
                            <SkillUpdate cvId={cv.cvId} updateCvValues={updateCvValues} />
                          </Popup>}
          </Card.Header>
        </Card.Content>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Skills</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv.skills?.map((skill) => (
              <Table.Row key={skill.skillId}>
                <Table.Cell textAlign="center">{skill.skillName}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <Card fluid color={"black"}>
        <Card.Content>
          <Card.Header>
            Personal Info
            {myProfile && <Popup trigger={<button className="ui button" style={{marginLeft:"1em"}}>Update </button>} modal>
                            <BiographyUpdate cvId={cv.cvId} updateCvValues={updateCvValues} curentBiography={cv.coverLetter}/>
                          </Popup>}
          </Card.Header>
        </Card.Content>
        <Card.Content description={cv.coverLetter} />
      </Card>

    </div>
  );
}
