import React from 'react'
import CityService from "../services/cityService";
import JobPositionService from "../services/jobPositionService";
import JobAdvertService from "../services/jobAdvertService";

 function JobAdvertDetail() {
    
    const [cities, setCities] = React.useState([]);
    const [position, setPosition] = React.useState([]);
    const [jobadverts, setJobAdverts] = React.useState([]);

    React.useEffect(()=>{
    let cityService = new CityService();
    let positionService = new JobPositionService(); 
    let jobAdvertService = new JobAdvertService()

    cityService.getAll().then((data) => {
        setCities(data.data.data);
    });
    positionService.getAll().then((data) => {
        setPosition(data.data.data);
    });
    jobAdvertService.getAll().then((data) => {
        setJobAdverts(data.data.data);
    });
    
},[]);

    return (
        <div>
           <select>
                  {cities.map((data) => (
                    <option value="">{data.cityName}</option>
                  ))}
                </select> 
        </div>
        
    );
     
}
