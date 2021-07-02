import React from "react";
import { useState, useEffect } from "react";
import CityService from "../../services/cityService"
import WorkTimeService from "../../services/workTimeService";
import WorkTypeService from "../../services/workTypeService";
import JobPositionService from "../../services/jobPositionService";
import JobAdvertService from "../../services/jobAdvertService";
import * as Yup from "yup";
import { Formik } from 'formik';
import EmployerService from "../../services/employer/employerService";
import swal from 'sweetalert';
import { Select, Button } from 'evergreen-ui';
import { Form,  Label, Container, TextArea, Grid, Segment } from "semantic-ui-react";

export default function JobAdvertAdd() {

    
  const validationSchema = Yup.object().shape({
      description: Yup.string().max(100,"Açıklama En fazla 100 karakter olabilir").required('Zorunlu Alan'),
      openPositionCount: Yup.number().min(1, 'En az 1 olabilir').max(10, 'En fazla 10 olabilir').required('Zorunlu Alan'),
      salaryMax: Yup.number().min(1, 'En az 1 olabilir').max(100000, 'En fazla 100000 olabilir'),
      salaryMin: Yup.number().min(1, 'En az 1 olabilir').max(100000, 'En fazla 100000 olabilir'),
    
      cityId: Yup.string().required("Zorunlu Alan").nullable(),
      deadline: Yup.date().required("Zorunlu Alan").nullable(),
      jobPositionId: Yup.string().required("Zorunlu Alan").nullable(),
      workTimeId: Yup.string().required("Zorunlu Alan").nullable(),
      workTypeId: Yup.string().required("Zorunlu Alan").nullable(),
  })

  const [city, setCity] = useState([])
  const [position, setPosition] = useState([])
  const [workType, setWorkTypes] = useState([])
  const [worktime, setWorkTimes] = useState([])
  const [employer, setEmployer] = useState([])


  useEffect(() => {
      let employerService = new EmployerService();
      employerService.getEmployers().then(result => setEmployer(result.data.data))
      let cityService = new CityService();
      cityService.getCities().then(result => setCity(result.data.data))
      let jobPositionService = new JobPositionService();
      jobPositionService.getJobPositions().then(result => setPosition(result.data.data))
      let workTypeService = new WorkTypeService();
      workTypeService.getWorkTypes().then(result => setWorkTypes(result.data.data))
      let workTimeService = new WorkTimeService();
      workTimeService.getWorkTimes().then(result => setWorkTimes(result.data.data))
  }, [])

  
  return (
      <Container>
          <Formik
              initialValues={{
                  description: "",
                  openPositionCount: "",
                  salaryMax: "",
                  salaryMin: "",
                  deadline: "",
                  cityId: "",
                  jobPositionId: "",
                  workTypeId: "",
                  workTimeId: "",
              

              }}


              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, setErrors, setFieldError, setStatus, resetForm }) => {
                  values.employerId=1
                  let jobAdvertService = new JobAdvertService();
                  jobAdvertService.add(values).then();
                  console.log(values);
                  swal("Ekleme Başarılı!", `${values.cityId}`, "success");


              }}
          >
              {({ handleSubmit, handleChange, values, errors, handleBlur }) => (
                  <Form style={{ background: "#f1f5f8", borderRadius: 20,position:"relative",alignItems:"center",display:"flex",flexDirection:"column"}} onSubmit={handleSubmit}>
                      <Grid columns={1} >
                          <Grid.Row>
                              <Grid.Column stretched>
                                  <Segment basic>
                                   
                                      <Form.Field>
                                          <TextArea rows={2} type="text"
                                              name="description"
                                              onChange={handleChange}
                                              value={values.description || ''}
                                               placeholder='İlan Açıklama' >

                                          </TextArea>
                                          {
                                              errors.description &&
                                              <Label basic color='red' pointing  >
                                                  {errors.description}
                                              </Label>
                                          }
                                      </Form.Field>
                                      <Form.Field>
                                          <input

                                              type="number"
                                              name="openPositionCount"
                                              placeholder="Açık Pozisyon Adedi"
                                              onChange={handleChange}
                                              value={values.openPositionCount || ''}
                                          />
                                          {
                                              errors.openPositionCount &&
                                              <Label basic color='red' pointing  >
                                                  {errors.openPositionCount}
                                              </Label>
                                          }
                                      </Form.Field>
                                      <Form.Field>
                                          <input
                                              type="number"
                                              name="salaryMin"
                                              min="0"
                                              placeholder="Minimum Maaş Miktarı"
                                              onChange={handleChange}
                                              value={values.salaryMin || ''}
                                          />
                                          {
                                              errors.salaryMin &&
                                              <Label basic color='red' pointing >
                                                  {errors.salaryMin}
                                              </Label>
                                          }
                                      </Form.Field>

                                      <Form.Field>
                                          <input
                                              type="number"
                                              name="salaryMax"
                                              min="0"
                                              placeholder="Maximum Maaş Miktarı"
                                              onChange={handleChange}
                                              value={values.salaryMax || ''}


                                          />
                                          {
                                              errors.salaryMax &&
                                              <Label basic color='red' pointing >
                                                  {errors.salaryMax}
                                              </Label>
                                          }
                                      </Form.Field>
                                      
                                      <Form.Field>
                                          <input
                                              type="date" 
                                              name="deadline"
                                              placeholder="İlan Bitiş Tarihi"
                                              onChange={handleChange}
                                              value={values.deadline || ''}


                                          />
                                          {
                                              errors.deadline &&
                                              <Label basic color='red' pointing >
                                                  {errors.deadline}
                                              </Label>
                                          }
                                      </Form.Field>
                                  </Segment>
                              </Grid.Column>
                              <Grid.Column>
                                  <Segment basic>
                                  
                                      <Form.Field>
                                          <Select
                                              name="cityId"
                                              onChange={handleChange}
                                              value={values.cityId || ''}
                                              onBlur={handleBlur}
                                              touched={values.cityId}

                                              style={{ display: 'block' }}
                                          >
                                              <option placeholder="Şehir Seçiniz" defaultValue>Şehir Seçiniz</option>
                                              {

                                                  city.map(c => (
                                                      <option key={c.cityId} value={c.cityId}   >
                                                          {c.name}
                                                      </option>

                                                  ))
                                              }

                                          </Select>
                                          {
                                              errors.cityId &&
                                              <Label basic color='red' pointing >
                                                  {errors.cityId}
                                              </Label>
                                          }
                                      </Form.Field>
                                      <Form.Field>
                                          <Select
                                              name="jobPositionId"
                                              value={values.jobPositionId || ''}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              touched={values.jobPositionId}
                                              style={{ display: 'block' }}
                                          >
                                              <option placeholder="Pozisyon Seçiniz" defaultValue    >Pozisyon Seçiniz</option>
                                              {

                                                  position.map(p => (
                                                      <option key={p.jobPositionId} value={p.jobPositionId}   >
                                                          {p.jobTitle}
                                                      </option>

                                                  ))
                                              }

                                          </Select>
                                          {
                                              errors.jobPositionId &&
                                              <Label basic color='red' pointing >
                                                  {errors.jobPositionId}
                                              </Label>
                                          }

                                      </Form.Field>
                                  </Segment>
                              </Grid.Column>
                              <Grid.Column stretched>
                                  <Segment basic>
                                      <Form.Field>
                                          <Select
                                              name="workTypeId"
                                              value={values.workTypeId}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              touched={values.workTypeId}
                                              style={{ display: 'block' }}
                                          >
                                              <option placeholder="Çalışma Türü Seçiniz" defaultValue    >Çalışma Türü Seçiniz</option>
                                              {

                                                  workType.map(wow => (
                                                      <option key={wow.workTypeId} value={wow.workTypeId}   >
                                                          {wow.type}
                                                      </option>

                                                  ))
                                              }

                                          </Select>
                                          {
                                              errors.workTypeId &&
                                              <Label basic color='red' pointing >
                                                  {errors.workTypeId}
                                              </Label>
                                          }
                                      </Form.Field>
                                      <Form.Field>
                                          <Select
                                              name="workTimeId"
                                              value={values.workTimeId}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              touched={values.workTimeId}
                                              style={{ display: 'block' }}
                                          >
                                              <option placeholder="Çalışma Zamanı Seçiniz" defaultValue>Çalışma Zamanı Seçiniz</option>
                                              {

                                                  worktime.map(wt => (
                                                      <option key={wt.workTimeId} value={wt.workTimeId}   >
                                                          {wt.title}
                                                      </option>

                                                  ))
                                              }

                                          </Select>
                                          {
                                              errors.workTimeId &&
                                              <Label basic color='red' pointing >
                                                  {errors.workTimeId}
                                              </Label>
                                          }
                                      </Form.Field>


                                      <Button type="submit">İlanı Kaydet</Button>
                                  </Segment>
                              </Grid.Column>
                          </Grid.Row>
                      </Grid>
                  </Form>

              )}
          </Formik>
      </Container>
  );
}