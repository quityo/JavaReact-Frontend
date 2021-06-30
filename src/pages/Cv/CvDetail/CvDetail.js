import React, { useEffect, useState } from 'react'
import CvService from '../../../services/cvService';
import SkillService from '../../../services/jobseeker/skillService';
import LanguageService from '../../../services/jobseeker/languageService';
import EducationService from '../../../services/jobseeker/educationService';
import ExperienceService from '../../../services/jobseeker/experienceService';
import {
    Container,
    Divider,
    Grid,
    Icon,
    Image,
    List,
    Rating,
    Segment,
    Tab,
  } from "semantic-ui-react";
  import JobseekerInfo from '../CvDetail/JobseekerInfo';
export default function CvDetail() {
    const [cv, setCv] = useState({});
    useEffect(() => {
      let cvService = new CvService();
      cvService
        .getAll()
        .then((result) => setCv(result.data.data));
    }, []);
  

    const[educations, setEducation] = useState([]);
    useEffect(()=>{
        let educationService = new EducationService();
        educationService.getEducations().then(result => setEducation(result.data.data));
    }, []);

    const[skills, setSkill] = useState([]);
    useEffect(() =>{
    let skillService = new SkillService();
    skillService.getSkills().then(result => setSkill(result.data.data));
    }, []);

    const[languages, setLanguage] = useState([]);
    useEffect(() =>{
    let languageService = new LanguageService();
    languageService.getLanguages().then(result => setLanguage(result.data.data));
    }, []);

    const [experiences, setExperience] = useState([]);
    useEffect(() => {
        let experienceService = new ExperienceService();
        experienceService.getExperiences().then(result => setExperience(result.data.data));
    }, []);
    
    const educationsPane = {
        menuItem: {icon: "graduation", content: "Educations"},
        render: () => (
            <Tab.Pane >
                {educations.filter((education) => 
                education.cv.cvId === 1).map((education) => (
                    <div>
                        <List aniated ky={education.educationId}>
                            <List.Item icon="graduation" content={education.schoolName} />
                            <List.Item
                  icon="building outline"
                  content={education.department}
                />
                <List.Item
                  icon="calendar plus outline"
                  content={education.startYearOfSchool}
                />
                <List.Item
                  icon="calendar check outline"
                  content={education.endYearOfSchool}
                />
              </List>
              <Divider />
            </div>
          ))}
      </Tab.Pane>
    ),
  };
  const languagesPane = {
    menuItem: { icon: "world", content: "Languages" },
    render: () => (
      <Tab.Pane>
        {languages
          .filter((language) => language.cv.cvId === 1)
          .map((language) => (
            <div>
              <List animated key={language.languageId}>
                <List.Item icon="world" content={language.language} />
                <List.Item>
                  <span>
                    <Icon name="level up" />
                    <Rating
                      maxRating={5}
                      defaultRating={language.level}
                      disabled
                    />
                  </span>
                </List.Item>
              </List>
              <Divider />
            </div>
          ))}
      </Tab.Pane>
    ),
  };

  const experiencesPane = {
    menuItem:  { icon: "chart line", content: "Experiences" },
    render: () => (
      <Tab.Pane>
        {experiences
          .filter((experience) => experience.cv.cvId === 1)
          .map((experience) => (
            <div>
              <List animated key={experience.experienceId}>
                <List.Item
                  icon="map marker alternate"
                  content={experience.workingPlace}
                />
               
                <List.Item
                  icon="calendar plus outline"
                  content={experience.startYearOfWork}
                />
                <List.Item
                  icon="calendar check outline"
                  content={experience.endYearOfWork}
                />
              </List>
              <Divider />
            </div>
          ))}
      </Tab.Pane>
    ),
  };

  const skillsPane = {
    menuItem: { icon: "thumbtack", content: "Skills" },
    render: () => (
      <Tab.Pane>
        {skills
          .filter(
            (skill) =>
            skill.cv.cvId === 1
          )
          .map((skill) => (
            <div>
              <List animated>
                <List.Item
                  key={skill.skillId}
                  icon="thumbtack"
                  content={skill.skillName}
                />
              </List>
              <Divider />
            </div>
          ))}
      </Tab.Pane>
    ),
  };

  const panes = [
    educationsPane,
    languagesPane,
    experiencesPane,
    skillsPane,
  ];

  return (
    <div >
        
      <Segment raised piled padded >
        <Grid  >
          <Grid.Row >
            <Grid.Column width={3}>
            <Segment raised>
                <Image
                  size="medium"
                  centered
                  src={cv.imageLink}
                />
                </Segment>
                <Segment>
                <List animated verticalAlign="left">
                  <List.Item>
                    <List.Icon
                      name="github"
                      size="large"
                      verticalAlign="left"
                    />
                    <List.Content>
                      <a href={cv.githubAddress}>
                        {cv.githubAddress}
                      </a>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon
                      name="linkedin"
                      size="large"
                      verticalAlign="middle"
                    />
                    <List.Content>
                      <a href={cv.linkedinAddress}>
                        {cv.linkedinAddress}
                      </a>
                    </List.Content>
                  </List.Item>
                </List>
              </Segment>
            </Grid.Column>
            
            <Grid.Column width={7}>
            <Container textAlign="center">
             
              <JobseekerInfo />
              
              </Container>
            </Grid.Column>
            
          </Grid.Row>

          <Grid.Row >
            <Grid.Column >
              <Segment raised padded textAlign="left">
                <p>{cv.coverLetter}</p>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column> 
              <Segment raised padded textAlign="left">
                <Tab activeIndex={0} menu={{ secondary: true, pointing: true }} panes={panes} />
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column >
              <Container
                content={"Created in " + cv.createDate}
                textAlign="center"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      
    </div>
  );
}