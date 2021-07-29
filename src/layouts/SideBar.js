import React from "react";
import { Link } from "react-router-dom";
import { Icon, List, Container, Divider } from "semantic-ui-react";
export default function SideBar() {
  return (
    <div>
      <Container textAlign="left">
        <List link aling="right" size="big">
          <List.Item as={Link} to="/jobseekers" name="hand spock">
            <Icon name="hand spock" />
            Job-Seeker
          </List.Item>

          <Divider />

          <List.Item as={Link} to="/employers" name="earlybirds">
            <Icon name="earlybirds" />
            Employer
          </List.Item>

          <Divider />

          <List.Item as={Link} to="/jobpositions" name="paw">
            <Icon name="paw" />
            J.Position
          </List.Item>

          <Divider />

          <List.Item as={Link} to="/jobadverts" name="angellist">
            <Icon name="angellist" />
            Job Advert
          </List.Item>

          <Divider />

          <List.Item as={Link} to="/employees" name="sticker mule">
            <Icon name="sticker mule" />
            Employee
          </List.Item>

          <Divider />

          <List.Item as={Link} to="/users" name="paw">
            <Icon name="paw" />
            Users
          </List.Item>

          <Divider />

          <List.Item as={Link} to="/jobAdvertConfirm" name="paw">
            <Icon name="paw" />
            Confirm
          </List.Item>
        </List>
      </Container>
    </div>
  );
}
