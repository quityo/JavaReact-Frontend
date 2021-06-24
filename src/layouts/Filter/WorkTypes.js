import React, { useEffect, useState } from 'react'
import { Dropdown} from "semantic-ui-react";
import WorkTypeService from '../../services/workTypeService';

export default function WorkTypes() {
    const [workTypes, setWorkTypes] = useState([]);

   useEffect(() => {
      let workTypeService = new WorkTypeService();
      workTypeService
        .getWorkTypes()
        .then((result) => setWorkTypes(result.data.data));
    }, []);
  
    const workTypeOptions = workTypes.map((workType) => ({
      key: workType.workTypeId,
      text: workType.type,
      value: workType.type,
    }));
  
    return (
      <div style={{ marginTop: "15pt" }}>
        <label>Çalışma Türü</label>
        <Dropdown
          placeholder="Çalışma Türü Seçin"
          fluid
          search
          selection
          options={workTypeOptions}
        ></Dropdown>
      </div>
    );
  }