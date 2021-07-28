import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import EmployeeService from "../../../services/employeeService";
import { Button, Card, Input, Form, Message } from "semantic-ui-react";
import HrmsLabel from "../../../utilities/formControls/HrmsLabel";
import * as Yup from "yup";

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
export default function EmployeeUpdate() {

  const {authItem} = useSelector(state => state.auth)
  let {userId} = useParams()
  const [employee, setEmployee] = useState({});

  useEffect((userId) => {
    let employeeService = new EmployeeService();
    employeeService.getEmployeeId(authItem[0].user.userId).then((result) => {
      setEmployee(result.data.data);
    });
  }, [userId]);

  const formik = useFormik({
    initialValues: {
      userId:employee?.userId,
      firstName: employee?.firstName,
      lastName: employee?.lastName,
      email: employee?.email,
      password: employee?.password,
      passwordAgain: employee?.passwordAgain,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is not null"),
      lastName: Yup.string().required("Last name is not null"),
      email: Yup.string().required("Email is not null"),
      password: Yup.string().required("Password is not null"),
      passwordAgain: Yup.string().required("Password Again is not null"),
    }),
    onSubmit: (userId) => {
        let employeeService = new EmployeeService();
       employeeService.update(userId).then((result)=>{window.location.reload()})
    },
    enableReinitialize: true,
  });
  return (
    <div  >
      <Card fluid>
        
        <Form
          style={{
            marginLeft: "15px",
            marginRight: "15px",
            marginTop: "15px",
            marginBottom: "15px",
            
          }}
        >
          <HrmsLabel name="First Name" /> <br />
          <Input
            fluid
            name="firstName"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            value={formik.values.firstName}
          />
          {formik.errors.firstName && formik.touched.firstName ? (
            <Message pointing color="red">
              {formik.errors.firstName}
            </Message>
          ) : null}
          <br />
          <HrmsLabel name="Last Name" /> <br />
          <Input
            fluid
            name="lastName"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            value={formik.values.lastName}
          />
          {formik.errors.lastName && formik.touched.lastName ? (
            <Message pointing color="red">
              {formik.errors.lastName}
            </Message>
          ) : null}
          <br />
          <HrmsLabel name="Email" /> <br />
          <Input
            fluid
            name="email"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <Message pointing color="red">
              {formik.errors.email}
            </Message>
          ) : null}
          <br />
          <HrmsLabel name="Password" /> <br />
          <Input
            fluid
            name="password"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <Message pointing color="red">
              {formik.errors.password}
            </Message>
          ) : null}
          <br />
          <HrmsLabel name="Password Again" /> <br />
          <Input
            fluid
            name="passwordAgain"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            value={formik.values.passwordAgain}
          />
          {formik.errors.passwordAgain && formik.touched.passwordAgain ? (
            <Message pointing color="red">
              {formik.errors.passwordAgain}
            </Message>
          ) : null}
          <br /></Form>
          <Button textAlign="center"   positive onClick={formik.handleSubmit} type="submit">
            Update 
          </Button>
        
      </Card>
    </div>
  );
}