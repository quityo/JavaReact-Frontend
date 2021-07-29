import React, { useEffect, useState } from "react";
import { Button, Menu } from "semantic-ui-react";
import CityList from "../pages/City/CityList";
import WorkTime from "../pages/WorkTime";
import JobPosition from "../pages/JobPosition/JobPosition";
const Filter = () => {
  const [workTimeId, setWorkTimeId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [jobPositionId, setJobPositionId] = useState(0);
  //const [, setJobAdvertisements] = useState([]);

  useEffect(() => {
    //let jobAdvertisementService = new JobAdvertisementService();
    // jobAdvertisementService
    //   .getByStatusIsTrueAndEmployer_IdAndCity_IdOrderByApplicationDeadlineAsc(
    //     employerId,
    //     cityId
    //   )
    //   .then((result) => setJobAdvertisements(result.data.data));
  }, [cityId, workTimeId, jobPositionId]);

  function handleWorkTimeId(workTimeId) {
    setWorkTimeId(workTimeId);
  }
  function handleCityId(cityId) {
    setCityId(cityId);
  }
  function handleJobPositionId(jobPositionId) {
    setJobPositionId(jobPositionId);
  }
  const handleOnClick = () => {
    let cityId = window.localStorage.getItem("cityId");
    let workTimeId = window.localStorage.getItem("workTimeId");
    let jobPositionId = window.localStorage.getItem("jobPositionId");
    console.log(cityId);
    console.log(workTimeId);
    console.log(jobPositionId);
  };
  return (
    <Menu vertical>
      <Menu.Item>
        <Menu.Header>Filtreler</Menu.Header>
      </Menu.Item>
      <Menu.Item>
        <JobPosition setJobPositionId={handleJobPositionId} />
      </Menu.Item>
      <Menu.Item>
        <WorkTime setWorkTimeId={handleWorkTimeId} />
      </Menu.Item>

      <Menu.Item>
        <CityList setCityId={handleCityId} />
      </Menu.Item>

      <Menu.Item>
        <Button
          color="green"
          onClick={() => {
            handleOnClick();
          }}
        >
          <Button.Content visible>UYGULA</Button.Content>
        </Button>
      </Menu.Item>
    </Menu>
  );
};

export default Filter;
