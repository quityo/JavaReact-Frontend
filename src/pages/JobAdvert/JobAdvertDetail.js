import React, { useState, useEffect } from "react";
import {
  Table,
  Image,
  Icon,
  Segment,
  Divider,
  Button,
} from "semantic-ui-react";
import JobAdvertService from "../../services/jobAdvertService";
import JobPositionService from "../../services/jobPositionService";
import EmployerService from "../../services/employerService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FavoriteService from "../../services/FavoriteService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
export default function JobAdvertDetail() {
  let { jobAdvertId } = useParams();
  let { userId } = useParams();
  let [favorite, setFavorites] = useState([]);
  const [jobAdverts, setJobAdverts] = useState([]);
  const [jobPosition, setPosition] = useState([]);
  const [employer, setEmployers] = useState([]);
  const { authItem } = useSelector((state) => state.auth);

  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    let favoriteService = new FavoriteService();
    jobAdvertService
      .getById(jobAdvertId)
      .then((result) => setJobAdverts([result.data.data]));
    if (authItem[0].loggedIn === true && authItem[0].user.userType === 1) {
      favoriteService
        .getByJobseekerId(authItem[0].user.userId)
        .then((result) => {
          setFavorites(
            result.data.data.map((fav) => fav.jobAdvert.jobAdvertId)
          );
        });
    }
  }, [userId, authItem, jobAdvertId]);

  useEffect(() => {
    let jobPositionService = new JobPositionService();
    jobPositionService
      .getJobPositions()
      .then((result) => setPosition(result.data.data));
  }, []);

  useEffect(() => {
    let employerService = new EmployerService();
    employerService
      .getEmployers()
      .then((result) => setEmployers(result.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddFavorites = (jobAdvertId) => {
    let favoriteService = new FavoriteService();
    favoriteService
      .addFavorite(authItem[0].user.userId, jobAdvertId)
      .then((result) => {
        toast.success(result.data.message);
        favorite.push(jobAdvertId);
        setFavorites([...favorite]);
      });
  };
  return (
    <div
      style={{
        margin: "auto",
        alignItems: "center",
        width: "60%",
      }}
    >
      {jobAdverts.map((jobAdvert) => (
        <div>
          <Segment color="green" textAlign="center">
            Job Advert Details
          </Segment>
          <Image
            centered
            size="tiny"
            src={jobAdvert.employer?.image?.imageUrl}
          ></Image>
          <Divider />
          {jobAdvert.employer?.companyName}
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center" colSpan="2">
                  Company Details
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Icon name="warehouse" /> Company
                </Table.Cell>
                <Table.Cell textAlign="center" key={employer.userId}>
                  <Link to={`/employers/${jobAdvert.employer?.userId}`}>
                    {jobAdvert.employer?.companyName}
                  </Link>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Icon name="world" />
                  Website
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
                  Tel-No
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {jobAdvert.employer?.phoneNumber}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Icon name="map marker alternate" />
                  City
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {jobAdvert.city?.name}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table color="yellow" celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center" colSpan="2">
                  Work Details
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Position</Table.Cell>
                <Table.Cell textAlign="center" key={jobPosition.jobPositionId}>
                  <Link
                    to={`/jobpositions/${jobAdvert.jobPosition?.jobPositionId}`}
                  >
                    {jobAdvert.jobPosition?.jobTitle}
                  </Link>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell collapsing>A????k Pozisyon Say??s??</Table.Cell>
                <Table.Cell textAlign="center">
                  {jobAdvert.openPositionCount}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Work Type</Table.Cell>
                <Table.Cell textAlign="center">
                  {jobAdvert.workType?.type}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Work Time</Table.Cell>
                <Table.Cell textAlign="center">
                  {jobAdvert.workTime?.title}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table color="green" celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center" colSpan="4">
                  Price Details
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Min Salary</Table.Cell>
                <Table.Cell positive>{jobAdvert.salaryMin} TL</Table.Cell>
                <Table.Cell>Max Salary</Table.Cell>
                <Table.Cell positive>{jobAdvert.salaryMax} TL</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table color="blue">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center" colSpan="4">
                  A??IKLAMA
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center">
                  {jobAdvert.description}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table color="black">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center" colSpan="4">
                  DeadLine 
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center" negative>
                  {jobAdvert.deadline}
                </Table.Cell>
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
            <Table.Cell>
              {authItem[0].loggedIn && authItem[0].user.userType === 1 && (
                <Button
                  fluid
                  color={
                    favorite.includes(jobAdvert.jobAdvertId) ? "red" : "green"
                  }
                  onClick={() => handleAddFavorites(jobAdvert.jobAdvertId)}
                >
                  <Icon
                    name={
                      favorite.includes(jobAdvert.jobAdvertId)
                        ? "heart"
                        : "heart outline"
                    }
                  />
                  {favorite.includes(jobAdvert.jobAdvertId)
                    ? "??lan Favorilerinizde"
                    : "??lan?? Favorilerine Ekle"}
                </Button>
              )}
            </Table.Cell>
          </Table>
        </div>
      ))}
    </div>
  );
}
