import React from "react";
import { NavLink } from "react-router-dom";
import { Icon, Container, Divider, Button } from "semantic-ui-react";
import "./HomeDetail.css";

export default function HomeDetail() {
  return (
    <div className="home">
      <Container>
        <p>
          Human resource managers are the overseers of the H.R. department and
          insurers of the functions and tasks being carried out by the H.R.
          team.
        </p>
        <p>
          They are often seen as the link between an organization’s management
          and its employees, as their work runs the gamut from providing
          consultation on strategic planning with top executives to recruiting,
          interviewing, and hiring new staff.
        </p>
        <p>
          Serving to bring together employerd and job seekers, our company is an
          easy-to-use and goal-oriented website to help you find the job you're
          looking for and not waste more time advancing your career.
        </p>
        <p>
          For Emoloyers! They can easily identify their teammates, advertise
          them and communicate one-on-one without any intermediaries.
        </p>
        <p>
          To start your career, continue and achieve your goals, you can search
          by the city you want to live in. If you wish, you can see all the jobs
          that have been advertised and you can reach the details of the
          advertisements that you think are suitable for you.
        </p>
        <Divider />

        <Button fluid size="huge" color="green" as={NavLink} to="/jobadverts">
          <p2> Welcome to the business world</p2>
          <Icon name="right arrow" />
        </Button>
      </Container>
    </div>
  );
}
