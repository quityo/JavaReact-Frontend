import React, { useEffect, useState } from "react";
import JobPositionService from "../../services/jobPositionService";

import { Select } from "evergreen-ui";

export default function JobPosition() {
  const [jobPosition, setJobPositions] = useState([]);

  useEffect(() => {
    let jobPositionService = new JobPositionService();
    jobPositionService
      .getJobPositions()
      .then((result) => setJobPositions(result.data.data));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <Select onChange={(event) => console.log(event.target.value)}>
        {jobPosition.map((j) => (
          <option
            key={j.jobPositionId}
            defaultValue="0"
            value={j.jobPositionId}
            data-key={j.jobPositionId}
          >
            {j.jobTitle}
          </option>
        ))}
      </Select>
    </div>
  );
}
