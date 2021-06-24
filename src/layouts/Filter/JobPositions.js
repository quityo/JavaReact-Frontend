import React, { useEffect, useState } from 'react'
import { Dropdown} from "semantic-ui-react";
import JobPositionService from '../../services/jobPositionService';


export default function JobPositions() {
    const [jobPositions, setJobPositions] = useState([]);

    useEffect(() => {
        let jobPositionService = new JobPositionService();
        jobPositionService.getJobPositions().then((result)=>setJobPositions(result.data.data))
      }, []);

      const jobPositonOptions=jobPositions.map((jobPosition)=>({
        key:jobPosition.jobPositionId,
        text:jobPosition.jobTitle,
        value:jobPosition.jobTitle,
      }))

    return (
        <div>
            <label>Pozisyon</label>
            <Dropdown placeholder="Pozisyon Seç" fluid multiple search selection options={jobPositonOptions} />
        </div>
    )
}