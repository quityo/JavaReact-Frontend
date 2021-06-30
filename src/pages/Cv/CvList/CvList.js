import React, { useEffect, useState } from 'react'
import CvService from "../../../services/cvService"
import {Button,
    Card,
    Icon,
    Image,
    Label,
    Popup,
    Rating,
    Segment} from 'semantic-ui-react'
import SkillService from "../../../services/jobseeker/skillService"
import LanguageService from "../../../services/jobseeker/languageService"


export default function CvList() {
    const [cv, setCvs] = useState([]);
    useEffect(() => {
      let cvService = new CvService();
      cvService
        .getAll()
        .then((result) => setCvs(result.data.data));
    }, []);
  
    const [languages, setLanguages] = useState([]);
    useEffect(() => {
      let languageService = new LanguageService();
      languageService
        .getLanguages()
        .then((result) => setLanguages(result.data.data));
    }, []);
  
    const [skills, setSkills] = useState([]);
    useEffect(() => {
      let skillService = new SkillService();
      skillService
        .getSkills()
        .then((result) => setSkills(result.data.data));
    }, []);
  
    return (
      <div>
        <Segment raised padded textAlign="left">
          <Card.Group itemsPerRow={2}>
            {cv.map((cv) => (
              <Card key={cv.cvId}>
                <Card.Content>
                  <Image
                    floated="left"
                    size="tiny"
                    src={cv.imageUrl}
                  />
                  <Card.Header>
                    {cv.jobseeker.firstName +
                      " " +
                      cv.jobseeker.lastName}
                  </Card.Header>
                  <Card.Meta textAlign="left">
                    <span>Created in {cv.createDate}</span>
                  </Card.Meta>
                  <Segment basic floated="left" compact>
                    <Popup
                      trigger={
                        <Label icon="globe" content="Languages" color="blue" />
                      }
                    >
                      <Popup.Header>
                        <Icon name="globe" color="blue" />
                        Languages
                      </Popup.Header>
                      <Popup.Content>
                        {languages
                          .filter(
                            (language) =>
                              language.cv.cvId === cv.cvId
                          )
                          .map((language) => (
                            <Segment.Inline key={language.languageId}>
                              {language.language}
                              <Rating
                                disabled
                                rating={language.level}
                                maxRating={5}
                              />
                            </Segment.Inline>
                          ))}
                      </Popup.Content>
                    </Popup>
                    <Popup
                      trigger={
                        <Label
                          icon="thumbtack"
                          content="Technology Knowledges"
                          color="blue"
                        />
                      }
                    >
                      <Popup.Header>
                        <Icon name="thumbtack" color="blue" />
                        Skills
                      </Popup.Header>
                      <Popup.Content>
                        {skills
                          .filter(
                            (Skill) =>
                            Skill.cv.cvId ===
                              cv.cvId
                          )
                          .map((Skill) => (
                            <Segment.Inline key={Skill.skillId}>
                              {Skill.skillName}
                            </Segment.Inline>
                          ))}
                      </Popup.Content>
                    </Popup>
                  </Segment>
  
                  <Card.Description textAlign="left">
                      <p>{cv.coverLetter}</p>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button.Group fluid>
                    <Button color="blue" animated="fade">
                      <Button.Content visible>
                        <Icon name="eye" />
                      </Button.Content>
                      <Button.Content hidden>View Detail</Button.Content>
                    </Button>
                    <Button.Or />
                    <Button color="orange" animated="fade">
                      <Button.Content visible>
                        <Icon name="edit" />
                      </Button.Content>
                      <Button.Content hidden>Edit</Button.Content>
                    </Button>
                    <Button.Or />
                    <Button color="red" animated="fade">
                      <Button.Content visible>
                        <Icon name="trash" />
                      </Button.Content>
                      <Button.Content hidden>Delete</Button.Content>
                    </Button>
                  </Button.Group>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Segment>
      </div>
    );
  }