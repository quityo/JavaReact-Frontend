import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dropdown,
  Input,
  TextArea,
  Card,
  Form,
  Grid,
  Message,
} from "semantic-ui-react";
import CityService from "../../services/cityService";
import WorkTimeService from "../../services/workTimeService";
import WorkTypeService from "../../services/workTypeService";
import JobPositionService from "../../services/jobPositionService";
import JobAdvertService from "../../services/jobAdvertService";
import EmployerService from "../../services/employerService";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SignedIn from "../../layouts/SignedIn";
import SignedOut from "../../layouts/SignedOut";
export default function JobAdvertAdd() {
  const { authItem } = useSelector((state) => state.auth);
  let jobAdvertService = new JobAdvertService();

  const ValidationSchema = Yup.object().shape({
    description: Yup.string()
      .max(100, "Açıklama En fazla 100 karakter olabilir")
      .required("Zorunlu Alan"),
    openPositionCount: Yup.number()
      .min(1, "En az 1 olabilir")
      .max(10, "En fazla 10 olabilir")
      .required("Zorunlu Alan"),
    salaryMax: Yup.number()
      .min(1, "En az 1 olabilir")
      .max(100000, "En fazla 100000 olabilir"),
    salaryMin: Yup.number()
      .min(1, "En az 1 olabilir")
      .max(100000, "En fazla 100000 olabilir"),

    cityId: Yup.string().required("Zorunlu Alan").nullable(),
    deadline: Yup.date().required("Zorunlu Alan").nullable(),
    jobPositionId: Yup.string().required("Zorunlu Alan").nullable(),
    workTimeId: Yup.string().required("Zorunlu Alan").nullable(),
    workTypeId: Yup.string().required("Zorunlu Alan").nullable(),
  });

  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      description: "",
      openPositionCount: "",
      salaryMax: "",
      salaryMin: "",
      deadline: "",
      cityId: "",
      jobPositionId: "",
      workTypeId: "",
      workTimeId: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      values.employerId = authItem[0].user.userId;
      jobAdvertService
        .add(values)
        .then((result) => {
          toast.success(result.data.message);
        })
        .catch((result) => {
          toast.error(result.response.data.message);
        });
      history.push("/confirmjobadvert");
    },
  });

  const [cities, setCity] = useState([]);
  const [positions, setPosition] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);
  const [workTimes, setWorkTimes] = useState([]);
  const [employers, setEmployer] = useState([]);

  useEffect(() => {
    let employerService = new EmployerService();
    let cityService = new CityService();
    let jobPositionService = new JobPositionService();
    let workTypeService = new WorkTypeService();
    let workTimeService = new WorkTimeService();

    employerService
      .getEmployers()
      .then((result) => setEmployer(result.data.data));
    cityService.getCities().then((result) => setCity(result.data.data));
    jobPositionService
      .getByAsc()
      .then((result) => setPosition(result.data.data));
    workTypeService
      .getWorkTypes()
      .then((result) => setWorkTypes(result.data.data));
    workTimeService
      .getWorkTimes()
      .then((result) => setWorkTimes(result.data.data));
  }, []);

  const cityOption = cities.map((city, index) => ({
    key: index,
    text: city.name,
    value: city.cityId,
  }));
  const positionOption = positions.map((position, index) => ({
    key: index,
    text: position.jobTitle,
    value: position.jobPositionId,
  }));
  const workTypeOption = workTypes.map((workType, index) => ({
    key: index,
    text: workType.type,
    value: workType.workTypeId,
  }));
  const workTimeOption = workTimes.map((workTime, index) => ({
    key: index,
    text: workTime.title,
    value: workTime.workTimeId,
  }));
  const employerOption = employers.map((employer, index) => ({
    key: index,
    text: employer.companyName,
    value: employer.userId,
  }));
  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div
      style={{
        margin: "auto",
      }}
    >
      {authItem[0].user.userType !== 2 && (
        <div className="ui negative message">
          <div className="header">Bu sayfayı görüntülemeye yetkiniz yok</div>
          <br />
          <p>
            Giriş yapmayı yada bir iş veren hesabı oluşturmayı deneyebilirsiniz
          </p>
          <Message info>
            <Link to={"/registerEmployer"}>
              <b>İşveren olarak kaydolmak için buraya tıkla</b>
            </Link>
          </Message>
          <Message info>
            <Link to={"/login"}>
              <b>Sistem Çalışanı olarak giriş yapmak için buraya tıkla</b>
            </Link>
          </Message>
        </div>
      )}
      {authItem[0].user.userType === 2 && (
        <Card fluid>
          <Card.Content header="Add New Job" />
          <Card.Content>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Field style={{ marginBottom: "1rem" }}>
                <label>Position</label>
                <Dropdown
                  clearable
                  item
                  placeholder="Position"
                  search
                  selection
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "jobPositionId")
                  }
                  onBlur={formik.onBlur}
                  id="jobPositionId"
                  value={formik.values.jobPositionId}
                  options={positionOption}
                />
                {formik.errors.jobPositionId &&
                  formik.touched.jobPositionId && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.jobPositionId}
                    </div>
                  )}
              </Form.Field>
              <Form.Field>
                <label>City</label>
                <Dropdown
                  clearable
                  item
                  placeholder="City"
                  search
                  selection
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "cityId")
                  }
                  onBlur={formik.onBlur}
                  id="cityId"
                  value={formik.values.cityId}
                  options={cityOption}
                />
                {formik.errors.cityId && formik.touched.cityId && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.cityId}
                  </div>
                )}
              </Form.Field>
              <Form.Field>
                <label>Work Type</label>
                <Dropdown
                  clearable
                  item
                  placeholder="Work Type"
                  search
                  selection
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "workTypeId")
                  }
                  onBlur={formik.onBlur}
                  id="workTypeId"
                  value={formik.values.workTypeId}
                  options={workTypeOption}
                />
                {formik.errors.workTypeId && formik.touched.workTypeId && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.workTypeId}
                  </div>
                )}
              </Form.Field>
              <Form.Field>
                <label>Work Time</label>
                <Dropdown
                  clearable
                  item
                  placeholder="Work Time"
                  search
                  selection
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "workTimeId")
                  }
                  onBlur={formik.onBlur}
                  id="workTimeId"
                  value={formik.values.workTimeId}
                  options={workTimeOption}
                />
                {formik.errors.workTimeId && formik.touched.workTimeId && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.workTimeId}
                  </div>
                )}
              </Form.Field>
              <Form.Field>
                <Grid stackable>
                  <Grid.Column width={8}>
                    <label style={{ fontWeight: "bold" }}>Salary Min.</label>
                    <Input
                      style={{ width: "100%" }}
                      type="number"
                      placeholder="Salary Min"
                      value={formik.values.salaryMin}
                      name="salaryMin"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></Input>
                    {formik.errors.salaryMin && formik.touched.salaryMin && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.salaryMin}
                      </div>
                    )}
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <label style={{ fontWeight: "bold" }}>Salary Max.</label>
                    <Input
                      style={{ width: "100%" }}
                      type="number"
                      placeholder="Salary Max"
                      value={formik.values.salaryMax}
                      name="salaryMax"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></Input>
                    {formik.errors.salaryMax && formik.touched.salaryMax && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.salaryMax}
                      </div>
                    )}
                  </Grid.Column>
                </Grid>
              </Form.Field>

              <Form.Field>
                <Grid stackable>
                  <Grid.Column width={8}>
                    <label style={{ fontWeight: "bold" }}>Open Position</label>
                    <Input
                      style={{ width: "100%" }}
                      id="openPositionCount"
                      name="openPositionCount"
                      error={Boolean(formik.errors.openPositionCount)}
                      onChange={formik.handleChange}
                      value={formik.values.openPositionCount}
                      onBlur={formik.handleBlur}
                      type="number"
                      placeholder="Open Position"
                    />
                    {formik.errors.openPositionCount &&
                      formik.touched.openPositionCount && (
                        <div className={"ui pointing red basic label"}>
                          {formik.errors.openPositionCount}
                        </div>
                      )}
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <label style={{ fontWeight: "bold" }}>DeadLine</label>
                    <Input
                      style={{ width: "100%" }}
                      type="date"
                      error={Boolean(formik.errors.deadline)}
                      onChange={(event, data) =>
                        handleChangeSemantic(data.value, "deadline")
                      }
                      value={formik.values.deadline}
                      onBlur={formik.handleBlur}
                      name="deadline"
                      placeholder="DeadLine"
                    />
                    {formik.errors.deadline && formik.touched.deadline && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.deadline}
                      </div>
                    )}
                  </Grid.Column>
                </Grid>
              </Form.Field>

              <Form.Field>
                <label>Description</label>
                <TextArea
                  placeholder="Description"
                  style={{ minHeight: 100 }}
                  error={Boolean(formik.errors.description).toString()}
                  value={formik.values.description}
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.description && formik.touched.description && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.description}
                  </div>
                )}
              </Form.Field>
              <Button fluid color="green" positive type="submit">
                Add Job
              </Button>
            </Form>
          </Card.Content>
        </Card>
      )}
    </div>
  );
}
