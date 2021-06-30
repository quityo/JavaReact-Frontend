import React, { useState } from 'react'
import { useEffect } from 'react';
import WorkTimeService from '../services/workTimeService';
import {Dropdown} from "semantic-ui-react";

const WorkTime = () => {
    const [workTimes, setWorkTimes] = useState([]);
    useEffect(() => {
        let workTimeService = new WorkTimeService();
        workTimeService
            .getWorkTimes()
            .then((result) => setWorkTimes(result.data.data));
    }, []);
    const workTimeOption = workTimes.map((workTime, index) => ({
        key: index,
        text: workTime.title,
        value: workTime.workTimeId,
    }));
    return (
        <div>
            Çalışma Zamanı
            <br />
            <br />
            <Dropdown
                style={{ textAlign: "center" ,color:"teal"}}
                pointing={"left"}
                clearable
                item
                placeholder="Çalışma Zamanı"
                options={workTimeOption}
                onChange={(event, data) => {
                    window.localStorage.setItem("workTimeId",data.value)
                }}
            />
        </div>
    );
};

export default WorkTime;
