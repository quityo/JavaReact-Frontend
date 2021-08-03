import React, { useEffect, useState } from "react";
import {
  Card,
  Image,
  Table,
  Pagination,
  Header,
  Divider,
  Button,
} from "semantic-ui-react";
import JobAdvertService from "../../services/jobAdvertService";
import {  Link } from "react-router-dom";
import Filter from "../../layouts/Filter";
import ImageService from "../../services/imageService";
import { useParams } from "react-router-dom";
export default function JobAdvertList() {
  let [jobAdverts, setJobAdverts] = useState([]);
  let { userId, imageId } = useParams();

  let [activePage, setActivePage] = useState(1);
  let [filterOption, setFilterOption] = useState({});
  let [pageSize, setPageSize] = useState(2);
  let [totalPageSize, setTotalPageSize] = useState(0);
  let [image, setImage] = useState({});
  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService
      .getPageableAndFilterJobPostings(activePage, pageSize, filterOption)
      .then((result) => {
        setJobAdverts(result.data.data);
        setTotalPageSize(parseInt(result.data.message));
      });
  }, [filterOption, activePage, pageSize]);

  let imageService = new ImageService();
  useEffect(() => {
    imageService
      .getByImageId(imageId)
      .then((result) => setImage(result.data.data));
  }, [imageId]);
  const handleFilterClick = (filterOption) => {
    if (filterOption.cityId.length === 0) {
      filterOption.cityId = null;
    }
    if (filterOption.jobPositionId.length === 0) {
      filterOption.jobPositionId = null;
    }
    if (filterOption.workTypeId.length === 0) {
      filterOption.workTypeId = null;
    }
    if (filterOption.workTimeId.length === 0) {
      filterOption.workTimeId = null;
    }
    setFilterOption(filterOption);
    setActivePage(1);
  };

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };
  const handlePaginationSizeChange = (value) => {
    setPageSize(value);
    console.log(pageSize);
  };

  const paginationOptions = [
    { key: 2, text: "2 İlan", value: 2 },
    { key: 10, text: "10 İlan", value: 10 },
    { key: 25, text: "25 İlan", value: 25 },
    { key: 50, text: "50 İlan", value: 50 },
    { key: 100, text: "100 İlan", value: 100 },
  ];
  return (
    <div
      style={{
        margin: "auto",
        alignItems: "center",
      }}
    >
      <Card.Group>
        <Card fluid color={"black"}>
          <Filter clickEvent={handleFilterClick} />

          {jobAdverts.map((jobAdvert) => (
            <Card.Content>
              {" "}
              <Divider />
              <br />
              <Image
                style={{
                  padding: "5px",
                  background: " #fff",
                  margin: "0 0 30px 20%",
                  transform: "rotate(-4deg)",
                  boxShadow: "0 0 4px rgba(0, 0, 0, .3)",
                  width: "20%",
                  maxWidth: "150px",
                }}
                floated="left"
                src={jobAdvert.employer?.image?.imageUrl}
              ></Image>
              <Card.Header
                style={{
                  marginTop: "1.1em",
                  fontFamily: "Arial",
                  fontSize: "23px",
                  margin: "0 0 10px 0",
                }}
              >
                {jobAdvert.employer?.companyName}
              </Card.Header>
              <Card.Meta>
                <strong>{jobAdvert.employer?.website}</strong>
              </Card.Meta>
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
                        Company
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
                          <Header.Content>Company Name</Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell
                        textAlign="center"
                        key={jobAdvert.employer?.userId}
                      >
                        <Link to={`/employers/${jobAdvert.employer?.userId}`}>
                          {jobAdvert.employer?.companyName}
                        </Link>
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Header as="h4" image>
                          <Header.Content>Job Position</Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell
                        textAlign="center"
                        key={jobAdvert.jobPosition?.jobPositionId}
                      >
                        <Link
                          to={`/jobpositions/${jobAdvert.jobPosition?.jobPositionId}`}
                        >
                          {jobAdvert.jobPosition?.jobTitle}
                        </Link>
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Header as="h4" image>
                          <Header.Content>Work Time</Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {jobAdvert.workTime?.title}
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Header as="h4" image>
                          <Header.Content>Work Type</Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {jobAdvert.workType?.type}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Header as="h4" image>
                          <Header.Content>City</Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {jobAdvert.city?.name}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Divider />
                <Button
                  fluid
                  size="small"
                  color="green"
                  as={Link}
                  to={`/jobadverts/${jobAdvert.jobAdvertId}`}
                >
                  View Job Details
                </Button>
              </Card.Description>
            </Card.Content>
          ))}
        </Card>
      </Card.Group>

      <Pagination
        style={{ marginTop: "25pt" }}
        firstItem={null}
        lastItem={null}
        activePage={activePage}
        onPageChange={handlePaginationChange}
        totalPages={Math.ceil(totalPageSize / pageSize)}
      />
    </div>
  );
}
