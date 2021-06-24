import React, { useState } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import JobPositionList from "../pages/JobPosition/JobPositionList";
import EmployerList from "../pages/User/Employer/EmployerList";
import EmployerDetail from "../pages/User/Employer/EmployerDetail";
import JobseekerList from "../pages/User/Jobseeker/JobseekerList";
import HomeDetail from "../pages/Home/HomeDetail";
import { Route } from "react-router";
import JobAdvertList from "../pages/JobAdvert/JobAdvertList";
import EmployeeList from "../pages/User/Employee/EmployeeList";
import UserList from "../pages/User/UserList";
import JobAdvertAdd from "../pages/JobAdvert/JobAdvertAdd";
import ConfirmJobAdvert from "../pages/JobAdvert/ConfirmJobAdvert";
import LoginEmployer from "../pages/Login/LoginEmployer";
import RegisterEmployer from "../pages/Register/RegisterEmployer";
import LoginJobseeker from "../pages/Login/LoginJobseeker";
import RegisterJobseeker from "../pages/Register/RegisterJobseeker";
import AboutUs from "./Corporate/AboutUs";
import JobAdvertDetail from "../pages/JobAdvert/JobAdvertDetail";
import ExamineJobAdvertDetail from"../pages/JobAdvert/ExamineJobAdvertDetail";
export default function Section() {

 
  return (
    <div>
      <Grid>
        <Grid.Row>
          <GridColumn position="right"size={14}>
          <Route exact path="/" component={HomeDetail} />
            <Route exact path="/jobseekers" component={JobseekerList} />
            <Route exact path="/employers" component={EmployerList} />
            <Route exact path="/employers/:userId" component={EmployerDetail} />
            <Route exact path="/jobpositions" component={JobPositionList} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/employees" component={EmployeeList} />
            <Route exact path="/users" component={UserList} /> </GridColumn>
            <Route exact path="/loginemployer" component={LoginEmployer}></Route>
                        
            <Route exact path="/loginjobseeker" component={LoginJobseeker}/>
            <Route exact path="/registerjobseeker" component={RegisterJobseeker}/>

            <Route exact path="/jobadverts" component={JobAdvertList} />
            <Route exact path="/jobadverts/add" component={JobAdvertAdd}/>
            <Route exact path="/confirmjobadvert" component={ConfirmJobAdvert}/>
            <Route exact path="/jobadverts/:jobAdvertId" component={JobAdvertDetail} />
            <Route exact path="/examinejobadvert/:jobAdvertId" component={ExamineJobAdvertDetail}
            
           ></Route>
     
          <Route
            exact
            path="/registeremployer"
            component={RegisterEmployer}
          ></Route>
          
        </Grid.Row>
      </Grid>
    </div>
  );
}