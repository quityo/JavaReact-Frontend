import React from "react";
import { Grid,Divider } from "semantic-ui-react";
import Cities from "./Filter/Cities";
import Footer from "./Footer";
import JobPositions from "./Filter/JobPositions";
import Section from "./Section";
import SideBar from "./SideBar";
import WorkTypes from "./Filter/WorkTypes";
import WorkTimes from "./Filter/WorkTimes";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <SideBar/>
          </Grid.Column>
          <Grid.Column  width={11}>
            <Section/>
          </Grid.Column>
          <Grid.Column  width={3}>
           <Cities/>
           <Divider />
           <JobPositions/>
           <Divider />
           <WorkTypes/>
           <Divider />
           <WorkTimes/>
           <Divider />
                </Grid.Column>
        </Grid.Row>
        <Grid.Column fluid width={16}>
        <Footer/>
        </Grid.Column>
      </Grid>
    </div>
  );
}