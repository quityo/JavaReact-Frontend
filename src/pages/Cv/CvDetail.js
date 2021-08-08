import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CvService from "../../services/cvService";
import EducationUpdate from "./Education/EducationUpdate";
import LanguageUpdate from "./Language/LanguageUpdate";
import SkillUpdate from "./Skill/SkillUpdate";
import ExperienceUpdate from "./Experience/ExperienceUpdate";
import GitHubUpdate from "./Links/GitHubUpdate";
import PositionUpdate from "./Links/PositionUpdate";
import LinkedinUpdate from "./Links/LinkedinUpdate";
import BiographyUpdate from "./Links/BiographyUpdate";
import ImageUpdate from "../Image/ImageUpdate";
import ImageService from "../../services/imageService";
import ExperienceService from "../../services/jobseeker/experienceService";
import { Card, Image, Table, Header, Button, Icon } from "semantic-ui-react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function CvDetail() {
  const { authItem } = useSelector((state) => state.auth);

  let { userId, imageId } = useParams();

  let [cv, setCv] = useState({});
  let [setImage] = useState({});

  let imageService = new ImageService();
  let cvService = new CvService();
  let experienceService = new ExperienceService();

  useEffect(() => {
    imageService
      .getByImageId(imageId)
      .then((result) => setImage(result.data.data));
    cvService.getByJobseeker(userId).then((result) => setCv(result.data.data));
  }, [userId, imageId]);

  let myProfile = false;
  if (authItem[0].loggedIn === false) {
    myProfile = false;
  } else if (authItem[0].loggedIn === true) {
    myProfile = parseInt(authItem[0].user.userId) === parseInt(userId);
  }

  const handleGithubDelete = (cvId) => {
    cvService
      .deleteGithub(cvId)
      .then((result) => {
        toast.success(result.data.message);
        updateCvValues();
      })
      .catch((result) => {
        toast.error(result.response.data.message);
      });
  };
  const handlePositionDelete = (experienceId) => {
    experienceService
      .deletePosition(experienceId)
      .then((result) => {
        toast.success(result.data.message);
        updateCvValues();
      })
      .catch((result) => {
        toast.error(result.response.data.message);
      });
  };

  const handleLinkedinDelete = (cvId) => {
    cvService
      .deleteLinkedin(cvId)
      .then((result) => {
        toast.success(result.data.message);
        updateCvValues();
      })
      .catch((result) => {
        alert(result.response.data.message);
        toast.error(result.response.data.message);
      });
  };

  const updateCvValues = () => {
    cvService.getByJobseeker(userId).then((result) => {
      setCv(result.data.data);
    });
  };

  return (
    <div
      style={{
        margin: "auto",
        alignItems: "center",
        marginLeft:"50px"
      }}
    >
      <Header as="h2" textAlign="center">
      Curriculum Vitae / RESUME
      </Header>
      <br />
      <Card.Group>
        <Card fluid color={"black"}>
          <Card.Content>
            <Image
              style={{
                padding: "10px",
                background: " #fff",
                margin: "0 0 15px 20px",
                transform: "rotate(-4deg)",
                boxShadow: "0 0 4px rgba(0, 0, 0, .3)",
                width: "30%",
                maxWidth: "220px",
              }}
              size="small"
              floated="left"
              src={cv.jobseeker?.image?.imageUrl}
              circular
            ></Image>
            {myProfile && (
              <Popup
                trigger={<button className="ui button">Upload</button>}
                modal
              >
                <ImageUpdate cvId={cv.cvId} updateCvValues={updateCvValues} />
              </Popup>
            )}

            <Card.Header
              style={{
                marginTop: "1.1em",
                fontFamily: "Arial",
                fontSize: "30px",
              }}
            >
              {cv.jobseeker?.firstName + " " + cv.jobseeker?.lastName}
            </Card.Header>
            <br />
            
            <br />
            
            <Card.Description>
              
              <Table celled color={"black"}>
                <Table.Header>
                  <Table.Row textAlign="center" backGroundColor="grey">
                    <Table.HeaderCell
                      style={{
                        background: "#ddd",
                        textAlign: "center",
                      }}
                    >
                      Joobseker
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      style={{
                        background: "#ddd",
                        textAlign: "center",
                      }}
                    >
                      Details
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>First Name</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {cv.jobseeker?.firstName}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Last Name</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {cv.jobseeker?.lastName}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>BirthDay</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {cv.jobseeker?.dateOfBirth}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>E-Mail</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {cv.jobseeker?.email}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <a
                            href={cv.githubAddress}
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <Button secondary disabled={!cv.githubAddress}>
                              <Icon name="github" /> Github
                            </Button>
                          </a>
                          {myProfile && (
                            <Popup
                              trigger={
                                <button className="ui button"> Update </button>
                              }
                              modal
                            >
                              <GitHubUpdate
                                cvId={cv.cvId}
                                updateCvValues={updateCvValues}
                              />
                            </Popup>
                          )}
                          {myProfile && (
                            <Button
                              color="red"
                              circular
                              icon="x"
                              onClick={() => handleGithubDelete(cv.cvId)}
                              disabled={!cv.githubAddress}
                            ></Button>
                          )}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {cv.githubAddress}
                    </Table.Cell>
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
                            <Button
                              color="linkedin"
                              disabled={!cv.linkedinAddress}
                            >
                              <Icon name="linkedin" /> LinkedIn
                            </Button>
                          </a>
                          {myProfile && (
                            <Popup
                              trigger={
                                <button className="ui button"> Update </button>
                              }
                              modal
                            >
                              <LinkedinUpdate
                                cvId={cv.cvId}
                                updateCvValues={updateCvValues}
                              />
                            </Popup>
                          )}
                          {myProfile && (
                            <Button
                              color="red"
                              icon="x"
                              circular
                              disabled={!cv.linkedinAddress}
                              onClick={() => handleLinkedinDelete(cv.cvId)}
                            ></Button>
                          )}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {cv.linkedinAddress}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card.Description>
          </Card.Content>
          <Card.Content extra></Card.Content>
        </Card>
      </Card.Group>

      <Card fluid color={"black"} 
          style={{
            background: "#6d7f8c"
          }}>
        <Card.Content
        >
                        
          <Card.Header  style={{
            color:"white",
            margin: "18px 0 0 0"
          }}>
            Education
            {myProfile && (
              <Popup
                trigger={
                  <button className="ui button" style={{ marginLeft: "1em" }}>
                    {" "}
                    Update{" "}
                  </button>
                }
                modal
              >
                <EducationUpdate
                  cvId={cv.cvId}
                  updateCvValues={updateCvValues}
                />
              </Popup>
            )}
          </Card.Header>
        </Card.Content>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row
              style={{
                textAlign: "center",
              }}
            >
              <Table.HeaderCell
                style={{
                  background: "#ddd",
                  textAlign: "center",
                }}
              >
                School Name
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{
                  background: "#ddd",
                  textAlign: "center",
                }}
              >
                Department
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{
                  background: "#ddd",
                  textAlign: "center",
                }}
              >
                Start Year
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{
                  background: "#ddd",
                  textAlign: "center",
                }}
              >
                End Year
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv.educations?.map((education) => (
              <Table.Row textAlign="center" key={education.educationId}>
                <Table.Cell>{education.schoolName}</Table.Cell>
                <Table.Cell>{education.department}</Table.Cell>
                <Table.Cell>{education.startYearOfSchool}</Table.Cell>
                <Table.Cell>
                  {education.endYearOfSchool ? (
                    education.endYearOfSchool
                  ) : (
                    <p>Devam Ediyor</p>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <Card fluid style={{
            background: "#6d7f8c"
          }}>
      <Card.Content
          
        >
                        
          <Card.Header style={{
            color:"white",
            margin: "18px 0 0 0"
          }}>
            Experiences
            {myProfile && (
              <Popup
                trigger={
                  <button className="ui button" style={{ marginLeft: "1em" }}>
                    {" "}
                    Update{" "}
                  </button>
                }
                modal
              >
                <ExperienceUpdate
                  cvId={cv.cvId}
                  updateCvValues={updateCvValues}
                />
              </Popup>
            )}
          </Card.Header>
        </Card.Content>
        <Table celled color={"black"} textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                style={{
                  background: "#ddd",
                  textAlign: "center",
                }}
              >
                Company
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{
                  background: "#ddd",
                  textAlign: "center",
                }}
              >
                Position
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{
                  background: "#ddd",
                  textAlign: "center",
                }}
              >
                Start Year
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{
                  background: "#ddd",
                  textAlign: "center",
                }}
              >
                End Year
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {cv.experiences?.map((experience) => (
              <Table.Row key={experience.experienceId}>
                <Table.Cell>{experience.workingPlace}</Table.Cell>

                <Table.Cell>
                  {experience.position}{" "}
                  {myProfile && (
                    <Popup
                      trigger={<button className="ui button"> Update </button>}
                      modal
                    >
                      <PositionUpdate
                        cvId={cv.cvId}
                        updateCvValues={updateCvValues}
                      />
                    </Popup>
                  )}
                  {myProfile && (
                    <Button
                      color="red"
                      circular
                      icon="x"
                      onClick={() =>
                        handlePositionDelete(cv.experience?.experienceId)
                      }
                      disabled={!cv.experience?.position}
                    ></Button>
                  )}
                </Table.Cell>
                <Table.Cell>{experience.startYearOfWork}</Table.Cell>
                <Table.Cell>
                  {experience.endYearOfWork ? (
                    experience.endYearOfWork
                  ) : (
                    <p>Devam Ediyor</p>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Card fluid color={"black"} 
          style={{
            background: "#6d7f8c"
          }}>
      <Card.Content
        >
                        
          <Card.Header style={{
            color:"white",
            margin: "18px 0 0 0"
          }}>
            Languages
            {myProfile && (
              <Popup
                trigger={
                  <button className="ui button" style={{ marginLeft: "1em" }}>
                    {" "}
                    Update{" "}
                  </button>
                }
                modal
              >
                <LanguageUpdate
                  cvId={cv.cvId}
                  updateCvValues={updateCvValues}
                />
              </Popup>
            )}
          </Card.Header>
        </Card.Content>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                style={{
                  background: "#ddd",
                  textAlign: "center",
                }}
              >
                Language
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{
                  background: "#ddd",
                  textAlign: "center",
                }}
              >
                Level
              </Table.HeaderCell>
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

      <Card  style={{
           background: "#6d7f8c"
         }}fluid color={"black"}>
        
         <Card.Content
        
       >
                       
         <Card.Header style={{
            color:"white",
          }}>
            Skills
            {myProfile && (
              <Popup
                trigger={
                  <button className="ui button" style={{ marginLeft: "1em" }}>
                    {" "}
                    Update{" "}
                  </button>
                }
                modal
              >
                <SkillUpdate cvId={cv.cvId} updateCvValues={updateCvValues} />
              </Popup>
            )}
          </Card.Header>
        </Card.Content>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                style={{
                  background: "#ddd",
                  textAlign: "center",
                }}
              >
                Skills
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv.skills?.map((skill) => (
              <Table.Row key={cv.skill?.skillId}>
                <Table.Cell textAlign="center">{skill.skillName}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <Card fluid color={"black"}>
        <Card.Content
          style={{
            background: "#6d7f8c",
          }}
        >
          <Card.Header style={{
            color:"white",
            margin: "10px 0 0 0"
          }}>
            Personal Info
            {myProfile && (
              <Popup
                trigger={
                  <button className="ui button" style={{ marginLeft: "1em" }}>
                    Update{" "}
                  </button>
                }
                modal
              >
                <BiographyUpdate
                  cvId={cv.cvId}
                  updateCvValues={updateCvValues}
                  curentBiography={cv.coverLetter}
                />
              </Popup>
            )}
          </Card.Header>
        </Card.Content>
        <Card.Content description={cv.coverLetter} />
      </Card>
    </div>
  );
}
