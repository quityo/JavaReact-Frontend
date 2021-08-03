import React, { useEffect, useState } from "react";
import { Label, Dropdown, Segment, Button, Menu } from "semantic-ui-react";
import CityService from "../services/cityService";
import WorkTimeService from "../services/workTimeService";
import JobPositionService from "../services/jobPositionService";
import WorkTypeService from "../services/workTypeService";

export default function Filter({ clickEvent}) {
    const [jobPositions, setJobPositions] = useState([]);
    const [cities, setCities] = useState([]);
    const [workTypes, setWorkTypes] = useState([]);
    const [workTimes, setWorkTimes] = useState([]);
  
    useEffect(() => {
      let jobPositionService = new JobPositionService();
      jobPositionService
        .getByAsc()
        .then((result) => setJobPositions(result.data.data));
  
      let cityService = new CityService();
      cityService.getCities().then((result) => setCities(result.data.data));
  
      let workTypeService = new WorkTypeService();
      workTypeService
        .getWorkTypes()
        .then((result) => setWorkTypes(result.data.data));
  
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
    return (
      <div 
      style={{
        margin: "auto",
      }} >
          
          <Menu size="mini" 
          >
        <Dropdown
        
          placeholder="Position"
          multiple
          search
          selection
          options={jobPositonOptions}
          value={jobPositionId}
          onChange={handleChangeJobPositionId}
        />
          <Dropdown
            placeholder="City"
            multiple
            search
            selection
            options={cityOptions}
            value={cityId}
            onChange={handleChangeCityId}
          ></Dropdown>
        
          <Dropdown
            placeholder="Work Type"
            multiple
            search
            selection
            options={workTypeOptions}
            value={workTypeId}
            onChange={handleChangeWorkTypeId}
          ></Dropdown>
        
          <Dropdown
          size="mini"
            placeholder="Work Time"
            multiple
            search
            selection
            options={workTimeOptions}
            value={workTimeId}
            onChange={handleChangeWorkTimeId}
          ></Dropdown>
        
        <Button fluid
          type="button"
          position='right'
          size="mini"
          onClick={() =>
            clickEvent({
              jobPositionId,cityId, workTypeId,workTimeId,
            })
          }
         
          primary
          
        >
          Search
        </Button>
        </Menu>
      </div>
    )
  }