import React, { useEffect, useState } from "react";
import EmployerService from "../../../services/employerService";
import { Dropdown, Button } from "semantic-ui-react";

export default function EmployerFilter({ clickEvent }) {
  const [employers, setEmployers] = useState([]);
  useEffect(() => {
    let employerService = new EmployerService();
    employerService.getByAsc().then((result) => setEmployers(result.data.data));
  }, []);
  const employerOptions = employers.map((employer) => ({
    key: employer.userId,
    text: employer.companyName,
    value: employer.userId,
  }));

  const [userId, setEmployerId] = useState([]);
  const handleChangeEmployerId = (event, { value }) => {
    setEmployerId(value);
  };

  return (
    <div>
      <Dropdown
        placeholder="Company"
        multiple
        selection
        options={employerOptions}
        value={userId}
        onChange={handleChangeEmployerId}
      ></Dropdown>
      <Button
        fluid
        type="button"
        size="large"
        color="green"
        onClick={() =>
          clickEvent({
            userId,
          })
        }
      >
        Search
      </Button>
    </div>
  );
}
