import React, { useEffect, useState } from "react";
import {  Dropdown,  Button } from "semantic-ui-react";
import CityService from "../services/cityService";
import WorkTimeService from "../services/workTimeService";
import JobPositionService from "../services/jobPositionService";
import WorkTypeService from "../services/workTypeService";
import EmployerService from "../services/employerService"; 

export default function Filter({ clickEvent }) {
  const [jobPositions, setJobPositions] = useState([]);
  const [cities, setCities] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);
  const [workTimes, setWorkTimes] = useState([]);
  const [employers, setEmployers] = useState([]); 

  useEffect(() => {
    let jobPositionService = new JobPositionService();
    jobPositionService
      .getByAsc()
      .then((result) => setJobPositions(result.data.data));

    let cityService = new CityService();
    cityService.getCities().then((result) => setCities(result.data.data));

    let workTypeService = new WorkTypeService();
    workTypeService
      .getWorkTypes().then((result) => setWorkTypes(result.data.data));

     let employerService = new EmployerService();
      employerService
        .getByAsc()
        .then((result) => setEmployers(result.data.data)); 

    let workTimeService = new WorkTimeService();
    workTimeService
      .getWorkTimes()
      .then((result) => setWorkTimes(result.data.data));
  }, []);

  const jobPositonOptions = jobPositions.map((jobPosition) => ({
    key: jobPosition.jobPositionId,
    text: jobPosition.jobTitle,
    value: jobPosition.jobPositionId,
  }));

  const cityOptions = cities.map((city) => ({
    key: city.cityId,
    text: city.name,
    value: city.cityId,
  }));

 const employerOptions = employers.map((employer) => ({
    key: employer.userId,
    text: employer.companyName,
    value: employer.userId,
  })); 
  const workTypeOptions = workTypes.map((workType) => ({
    key: workType.workTypeId,
    text: workType.type,
    value: workType.workTypeId,
  }));

  const workTimeOptions = workTimes.map((workTime) => ({
    key: workTime.workTimeId,
    text: workTime.title,
    value: workTime.workTimeId,
  }));

  const [jobPositionId, setJobPositionId] = useState([]);
  const handleChangeJobPositionId = (event, { value }) => {
    setJobPositionId(value);
  };

  const [cityId, setCityId] = useState([]);
  const handleChangeCityId = (event, { value }) => {
    setCityId(value);
  };
  const [workTypeId, setWorkTypeId] = useState([]);
  const handleChangeWorkTypeId = (event, { value }) => {
    setWorkTypeId(value);
  };
  const [workTimeId, setWorkTimeId] = useState([]);
  const handleChangeWorkTimeId = (event, { value }) => {
    setWorkTimeId(value);
  };

   const [userId, setUserId] = useState([]);
  const handleChangeUserId = (event, { value }) => {
    setUserId(value);
  }; 
  return (
    <div 
     >
          <Dropdown 
          placeholder="Company"
          multiple
          selection
          options={employerOptions}
          value={userId}
          onChange={handleChangeUserId}
        />
      
        <Dropdown 
          placeholder="Position"
          multiple
          selection
          options={jobPositonOptions}
          value={jobPositionId}
          onChange={handleChangeJobPositionId}
        />
        <Dropdown
          placeholder="City"
          multiple
          selection
          options={cityOptions}
          value={cityId}
          onChange={handleChangeCityId}
        ></Dropdown>

        <Dropdown
          placeholder="Work Type"
          multiple
          selection
          options={workTypeOptions}
          value={workTypeId}
          onChange={handleChangeWorkTypeId}
        ></Dropdown>

        <Dropdown
          
          placeholder="Work Time"
          multiple
          selection
          options={workTimeOptions}
          value={workTimeId}
          onChange={handleChangeWorkTimeId}
        ></Dropdown>
        <Button 
          fluid
          type="button"
          size="large"
          color="green"
          onClick={() =>
            clickEvent({
              jobPositionId,
              cityId,
              workTypeId,
              workTimeId,
              userId 
            })
          }
        >
          Search
        </Button>
      
    </div>
  );
}
