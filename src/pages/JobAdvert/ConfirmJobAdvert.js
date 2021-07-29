import React, { useEffect, useState } from "react";
import JobAdvertService from "../../services/jobAdvertService";
import { Button, Card, Image } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export default function ConfirmJobAdvert() {
  let jobAdvertService = new JobAdvertService();
  const [jobAdverts, setJobAdverts] = useState([]);
  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService
      .getByConfirmFalse()
      .then((result) => setJobAdverts(result.data.data));
  }, []);

  const confirm = (jobAdvertId) => {
    jobAdvertService
      .confirm(jobAdvertId)
      .then(toast.success("İLAN ONAYLANDI"), window.location.reload());
  };
  return (
    <div style={{ margin: "auto" }}>
      <Card.Group>
        {jobAdverts.map((j) => (
          <Card fluid key={j.jobAdvertId}>
            <Card.Content style={{ backgroundColor: "#F2F4F4" }}>
              <Card.Header>{j.jobPosition.jobTitle}</Card.Header>
              <Image
                floated="left"
                size="tiny"
                circular
                src={j.employer?.image?.imageUrl}
              ></Image>
              <Card.Meta style={{ marginRight: "13%" }}>
                {j.employer?.companyName}
              </Card.Meta>
              <Card.Meta style={{ marginRight: "13%" }}>
                {j.city?.name}
              </Card.Meta>
              <Card.Meta style={{ marginRight: "13%" }}>
                {j.workTime?.title}
              </Card.Meta>
              <Card.Meta style={{ marginRight: "13%" }}>
                {j.description}
              </Card.Meta>
              <Card.Description></Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  onClick={() => confirm(j.jobAdvertId)}
                  inverted
                  color="green"
                >
                  ONAYLA
                </Button>
                <Button
                  as={NavLink}
                  to={`/examinejobadvert/${j.jobAdvertId}`}
                  inverted
                  color="blue"
                >
                  İNCELE
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}
