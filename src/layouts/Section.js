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
import CvList from "../pages/Cv/CvList/CvList";

import EmployerDetail from "../pages/User/Employer/EmployerDetail";
import HomeDetail from "../pages/Home/HomeDetail";
import ExamineJobAdvertDetail from"../pages/JobAdvert/ExamineJobAdvertDetail";
import JobAdvertDetail from "../pages/JobAdvert/JobAdvertDetail";
import CvDetail from "../pages/Cv/CvDetail/CvDetail";

import JobAdvertAdd from "../pages/JobAdvert/JobAdvertAdd";
import ConfirmJobAdvert from "../pages/JobAdvert/ConfirmJobAdvert";

import LoginEmployer from "../pages/Login/LoginEmployer";
import LoginJobseeker from "../pages/Login/LoginJobseeker";
import RegisterEmployer from "../pages/Register/RegisterEmployer";
import RegisterJobseeker from "../pages/Register/RegisterJobseeker";

import AboutUs from "./Corporate/AboutUs";
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
            <Route exact path="/cvDetail" component={CvDetail}/>
            <Route exact path ="/filter" component={Filter}/>
            </GridColumn>
          
            <Route exact path="/loginemployer" component={LoginEmployer}></Route>
            
            <Route exact path="/registeremployer" component={RegisterEmployer}></Route>
                        
            <Route exact path="/loginjobseeker" component={LoginJobseeker}/>
            <Route exact path="/registerjobseeker" component={RegisterJobseeker}/>

            <Route exact path="/jobadverts" component={JobAdvertList} />
            
            <Route exact path="/jobadverts/add" component={JobAdvertAdd}/>
            <Route exact path="/confirmjobadvert" component={ConfirmJobAdvert}/>
            <Route exact path="/jobadverts/:jobAdvertId" component={JobAdvertDetail} />
            <Route exact path="/jobadverts/:employerId" component={JobAdvertDetail} />
            <Route exact path="/examinejobadvert/:jobAdvertId" component={ExamineJobAdvertDetail}/>

            <Route exact path="/jobpositions" component={JobPositionList} />
            <Route exact path="/cvList" component={CvList}/>
           
          
        </Grid.Row>
      </Grid>
    </div>
  );
}