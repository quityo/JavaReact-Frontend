import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header, Image, Table, Button, Icon } from "semantic-ui-react";
import CvService from "../../services/cvService";

export default function CvList() {
  const [cvs, setCvs] = useState([]);

  useEffect(() => {
    let cvService = new CvService();
    cvService.getAll().then((result) => setCvs(result.data.data));
  }, []);

  return (
    <div
      style={{
        margin: "auto",
        alignItems: "center",
      }}
    >
      <Header as="h2" textAlign="center">
        Jobseekers CV-List
      </Header>
      <Table celled color={"black"}>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>Name</Table.HeaderCell>
            {/*<Table.HeaderCell>Skills</Table.HeaderCell> 
            <Table.HeaderCell>Language</Table.HeaderCell> */}
            <Table.HeaderCell>Github</Table.HeaderCell>
            <Table.HeaderCell>Linkedin</Table.HeaderCell>
            <Table.HeaderCell>Details</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {cvs.map((cv) => (
            <Table.Row key={cv.cvId}>
              <Table.Cell>
                <Header as="h4" image>
                  <Header.Content>
                    {cv.jobseeker.firstName + " " + cv.jobseeker.lastName}
                    {/*  <Header.Subheader>
                      {cv.jobseeker.dateOfBirth}
                    </Header.Subheader> */}
                  </Header.Content>
                </Header>
              </Table.Cell>
              {/*   <Table.Cell>
                {cv.skills.map((skill) => (
                  <p key={skill.skillId}>{skill.skillName}</p>
                ))}
              </Table.Cell> */}

              {/* <Table.Cell>
                {cv.languages.map((lang) => (
                  <p key={lang.languageId}>{lang.language + " Seviye: " + lang.level}</p>
                ))}
              </Table.Cell> */}

              <Table.Cell>
                <a
                  href={cv.githubAddress}
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  <Button secondary disabled={!cv.githubAddress}>
                    <Icon name="github" /> Github
                  </Button>
                </a>
              </Table.Cell>

              <Table.Cell>
                <a
                  href={cv.linkedinAddress}
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  <Button color="linkedin" disabled={!cv.linkedinAddress}>
                    <Icon name="linkedin" /> LinkedIn
                  </Button>
                </a>
              </Table.Cell>

              <Table.Cell>
                <Button
                  color="green"
                  animated
                  as={Link}
                  to={`/cvlist/${cv.jobseeker.userId}`}
                >
                  <Button.Content visible>Details</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
