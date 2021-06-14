import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import JobPositionList from "../pages/JobPosition/JobPositionList";
import EmployerList from "../pages/User/Employer/EmployerList";
import EmployerDetail from "../pages/User/Employer/EmployerDetail";
import JobseekerList from "../pages/User/Jobseeker/JobseekerList";
import HomeDetail from "../pages/Home/HomeDetail";
import { Route } from "react-router";
import JobAdvertList from "../pages/JobAdvert/JobAdvertList";
import EmployeeList from "../pages/User/Employee/EmployeeList";
import EmployerLogin from "../pages/Auth/EmployerLogin";

export default function Section() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <GridColumn position="right"size={14}>
          <Route exact path="/" component={HomeDetail} />
            <Route exact path="/jobseekers" component={JobseekerList} />
            <Route exact path="/employers" component={EmployerList} />
            <Route exact path="/employers/:id" component={EmployerDetail} />
            <Route exact path="/jobpositions" component={JobPositionList} />
            <Route exact path="/jobadverts" component={JobAdvertList} />
            <Route exact path="/employees" component={EmployeeList} />
            <Route exact path="/isveren/giris" component={EmployerLogin} />
          </GridColumn>
        </Grid.Row>
        
      </Grid>
    </div>
  );
}