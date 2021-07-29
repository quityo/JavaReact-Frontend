import React, { useEffect, useState } from "react";
import JobPositionService from "../../services/jobPositionService";
import { Table, Header, Button, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
export default function JobPositionList() {
  const [jobPositions, setJobPositions] = useState([]);
  useEffect(() => {
    let jobPositionService = new JobPositionService();
    jobPositionService
      .getByAsc()
      .then((result) => setJobPositions(result.data.data));
  }, []);

  return (
    <div
      style={{
        margin: "auto",
        alignItems: "center",
        width: "60%",
      }}
    >
      <Header as="h2" textAlign="center">
        Job Position List
      </Header>
      <Table color="blue" key="blue">
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell textAlign="center">Job Titles</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobPositions.map((position) => (
            <Table.Row textAlign="center" key={position.jobPositionId}>
              <Popup
                content={position.jobDescription}
                mouseEnterDelay={100}
                mouseLeaveDelay={100}
                position="right center"
                on="hover"
                trigger={
                  <Table.Cell>
                    <Button style={{ background: `transparent` }}>
                      <Link to={`/jobpositions/${position.jobPositionId}`}>
                        {position.jobTitle}
                      </Link>
                    </Button>
                  </Table.Cell>
                }
              />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
