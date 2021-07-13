import React from 'react'
import EmployerService from '../../../services/employerService';
import { Label, Form, Input, Message, Button, Accordion, Icon} from "semantic-ui-react";
import { useState } from "react";
import { useEffect } from "react";

import { useSelector } from 'react-redux';
import * as Yup from "yup";
import { useFormik } from "formik";
import HrmsLabel from "../../../utilities/formControls/HrmsLabel"
import EmployerUpdateService from '../../../services/EmployerUpdateService';

import { useParams } from "react-router-dom";
 
export default function EmployerUpdate() {

  let { userId } = useParams();
  
  const {authItem} = useSelector(state => state.auth)
  const [employer, setEmployer] = useState({});
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isConfirmed, setIsConfirmed] = useState(true);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    let employerService = new EmployerService();
    employerService.getEmployerId(authItem[0].user.userId).then((result) => {
      setEmployer(result.data.data);
    });

    let employerUpdateService = new EmployerUpdateService();
    employerUpdateService.getByStatusFalse(authItem[0].user.userId).then((result)=> {
      if (result.data.data!==null){setIsConfirmed(false)}
      else{setIsConfirmed(true)};
     })
  }, [userId]);

  const formik = useFormik({
    initialValues: {
      userId: employer.userId,
      email: employer.email,
      companyName: employer.companyName,
      website: employer.website,
      phoneNumber: employer.phoneNumber,
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is not null"),
      companyName: Yup.string().required("Company name is not null"),
      website: Yup.string().required("Website is not null"),
      phoneNumber: Yup.string().required("Phonenumber is not null"),
    }),
    onSubmit: (values) => {
      let contentModel ={
        content:{
          companyName:values.companyName,
          email:values.email,
          phoneNumber:values.phoneNumber,
          website:values.website,
        }
      }
      let employerUpdateService = new EmployerUpdateService();
      employerUpdateService.add(contentModel).then((result)=>(window.location.reload()));
      // let employersService = new EmployerService();
      // employersService.update(values).then((result) => {
      //   window.location.reload();
      // });
    },
    enableReinitialize: true,
    });

    return (
    <div>
      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={(e, props) => {
            handleClick(e, props);
          }}
        >
          <Icon name="dropdown" />
          Employer Informations
        </Accordion.Title>
        {isConfirmed? "" :<Label color="red" ribbon="right" size="large" >Onay bekleniyor</Label>}
        <Accordion.Content active={activeIndex === 0}>
            <Form 
              style={{
                marginLeft: "15px",
                marginRight: "15px",
                marginTop: "15px",
                marginBottom: "15px",
              }}
              
            >
              <HrmsLabel name="Company Name" /> <br />
              <Input 
                fluid
                name="companyName"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                value={formik.values.companyName}
              />
              {formik.errors.companyName && formik.touched.companyName ? (
                <Message pointing color="red">
                  {formik.errors.companyName}
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
              <HrmsLabel name="Website" /> <br />
              <Input
                fluid
                name="website"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                value={formik.values.website}
              />
              {formik.errors.website && formik.touched.website ? (
                <Message pointing color="red">
                  {formik.errors.website}
                </Message>
              ) : null}
              <br />
              <HrmsLabel name="Phone Number" /> <br />
              <Input
                fluid
                name="phoneNumber"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                value={formik.values.phoneNumber}
              />
              {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
                <Message pointing color="red">
                  {formik.errors.phoneNumber}
                </Message>
              ) : null}
              <br />
              {isConfirmed?<Button positive onClick={formik.handleSubmit} type="submit">
                Save
              </Button>:<Button positive disabled type="submit">
                Save
              </Button>}
            </Form>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          Change Password
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
            There are many breeds of dogs. Each breed varies in size and
            temperament. Owners often select a breed of dog that they find to be
            compatible with their own lifestyle and desires from a companion.
          </p>
        </Accordion.Content>
      </Accordion>
    </div>
  );
}