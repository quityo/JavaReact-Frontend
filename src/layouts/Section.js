import React from "react";
import { Route } from "react-router";

import Filter from "../layouts/Filter"

import { Grid, GridColumn } from "semantic-ui-react";
import JobPositionList from "../pages/JobPosition/JobPositionList";
import JobseekerList from "../pages/User/Jobseeker/JobseekerList";
import EmployerList from "../pages/User/Employer/EmployerList";
import JobAdvertList from "../pages/JobAdvert/JobAdvertList";
import EmployeeList from "../pages/User/Employee/EmployeeList";
import UserList from "../pages/User/UserList";


import HomeDetail from "../pages/Home/HomeDetail";
import ExamineJobAdvertDetail from"../pages/JobAdvert/ExamineJobAdvertDetail";
import JobAdvertDetail from "../pages/JobAdvert/JobAdvertDetail";
import JobPositionDetail from "../pages/JobPosition/JobPositionDetail";

import JobAdvertAdd from "../pages/JobAdvert/JobAdvertAdd";
import ConfirmJobAdvert from "../pages/JobAdvert/ConfirmJobAdvert";

import RegisterEmployer from "../pages/Register/RegisterEmployer";
import RegisterEmployee from "../pages/Register/RegisterEmployee";
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"

import AboutUs from "./Corporate/AboutUs";
import Favorite from "../pages/Favorite";

import EmployeeUpdate from "../pages/User/Employee/EmployeeUpdate";
import EmployerUpdate from "../pages/User/Employer/EmployerUpdate";
import EmployerDetail from "../pages/User/Employer/EmployerDetail";
import EmployeeDetail from "../pages/User/Employee/EmployeeDetail";
import EmployerUpdateConfirm from "../pages/User/Employer/EmployerUpdateConfirm";

export default function Section() {

 
  return (
    <div>
      <Grid>
        <Grid.Row>
          <GridColumn position="right"size={16}>
          <Route exact path="/" component={HomeDetail} />
            <Route exact path="/jobseekers" component={JobseekerList} />
            <Route exact path="/employers" component={EmployerList} />
            <Route exact path="/employers/:userId" component={EmployerDetail} />
            
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/employees" component={EmployeeList} />
            <Route exact path="/users" component={UserList} />
            <Route exact path ="/filter" component={Filter}/>
            </GridColumn>
            
            <Route exact path="/registeremployer" component={RegisterEmployer}></Route>
            <Route exact path="/registeremployee" component={RegisterEmployee}></Route>
            <Route exact path="/register" component={Register}></Route>         
            <Route exact path="/login" component={Login}/>

            <Route exact path="/jobadverts" component={JobAdvertList} />
            
            <Route exact path="/jobadverts/add" component={JobAdvertAdd}/>
            <Route exact path="/confirmjobadvert" component={ConfirmJobAdvert}/>
            <Route exact path="/jobadverts/:jobAdvertId" component={JobAdvertDetail} />
            <Route exact path="/jobadverts/:employerId" component={JobAdvertDetail} />
            <Route exact path="/examinejobadvert/:jobAdvertId" component={ExamineJobAdvertDetail}/>

            <Route exact path="/jobpositions" component={JobPositionList} />
            <Route exact path="/jobpositions/:jobPositionId" component={JobPositionDetail} />

            <Route exact path="/employeeUpdate/:userId" component={EmployeeUpdate} />
            <Route exact path="/employeeUpdate" component={EmployeeUpdate} />
            <Route exact path="/employees/:userId" component={EmployeeDetail} />
            <Route exact path="/employerupdateconfirm" component={EmployerUpdateConfirm} />
            <Route exact path="/favorites" component={Favorite}/>

            <Route exact path="/list" component={EmployerUpdate}/>
          
        </Grid.Row>
      </Grid>
    </div>
  );
}