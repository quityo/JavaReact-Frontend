import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import JobseekerService from "../../services/jobseeker/jobseekerService";

export default function Register() {
  let jobseekerService = new JobseekerService();
  const jobseekerRegisterSchema = Yup.object().shape({
    dateOfBirth: Yup.date().required("Doğum Tarihi zorunludur"),
    email: Yup.string()
      .required("Email alanı zorunludur")
      .email("Geçerli bir email değil"),
    reEmail: Yup.string()
      .oneOf([Yup.ref("email"), null], "Email bilgileri birbiri ile eşleşmıyor")
      .required("Email Tekrar zorunludur"),
    firstName: Yup.string().required("İsim zorunludur"),
    lastName: Yup.string().required("Soy isim zorunludur"),
    nationalId: Yup.string()
      .required("Kimlik numarası zorunludur")
      .length(11, "Kımlık numarası hatalı")
      .matches(/^[0-9]+$/, "Sadece rakam girilmelidir"),
    password: Yup.string()
      .required("Şifre zorunludur")
      .min(6, "Şifre en az 6 karakter uzunlugunda olmalıdır"),
    passwordAgain: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Şifreler eşleşmiyor"
    ),
  });

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      dateOfBirth: "",
      email: "",
      firstName: "",
      lastName: "",
      nationalId: "",
      password: "",
      passwordAgain: "",
    },
    validationSchema: jobseekerRegisterSchema,
    onSubmit: (values) => {
      jobseekerService.jobseekerAdd(values).then((result) => {
        toast.success(result.data.message);
        history.push("/login");
      });
    },
  });

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div style={{ margin: "auto" , marginLeft:"50px"}}>
      <Header as="h2" color="teal" textAlign="center">
        {" "}
        Register Form
      </Header>
      <Form size="large" onSubmit={formik.handleSubmit}>
        <Segment stacked>
          <Grid stackable>
            <Grid.Column width={8}>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>First Name</b>
                </label>

                <Form.Input
                  fluid
                  placeholder="First Name"
                  type="text"
                  value={formik.values.firstName}
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.firstName && formik.touched.firstName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.firstName}
                  </div>
                )}
              </div>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>E-Mail </b>
                </label>
                <Form.Input
                  fluid
                  placeholder="E-Mail "
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                />
                {formik.errors.email && formik.touched.email && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Password</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                />
                {formik.errors.password && formik.touched.password && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.password}
                  </div>
                )}
              </div>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Identity Number</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Identity No"
                  type="text"
                  value={formik.values.nationalId}
                  name="nationalId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.nationalId && formik.touched.nationalId && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.nationalId}
                  </div>
                )}
              </div>
            </Grid.Column>

            <Grid.Column width={8}>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Last Name</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Last Name"
                  type="text"
                  value={formik.values.lastName}
                  name="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.lastName && formik.touched.lastName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.lastName}
                  </div>
                )}
              </div>

              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Re-Email</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Re-Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="reEmail"
                />
                {formik.errors.reEmail && formik.touched.reEmail && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.reEmail}
                  </div>
                )}
              </div>

              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Re-Password</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Re-Password"
                  type="password"
                  value={formik.values.passwordAgain}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="passwordAgain"
                />
                {formik.errors.passwordAgain &&
                  formik.touched.passwordAgain && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.passwordAgain}
                    </div>
                  )}
              </div>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Birth Day</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Birth Day"
                  type="date"
                  error={Boolean(formik.errors.dateOfBirth)}
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "dateOfBirth")
                  }
                  value={formik.values.dateOfBirth}
                  onBlur={formik.handleBlur}
                  name="dateOfBirth"
                />
                {formik.errors.dateOfBirth && formik.touched.dateOfBirth && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.dateOfBirth}
                  </div>
                )}
              </div>
            </Grid.Column>
          </Grid>

          <br />
          <Button color="teal" fluid size="large" type="submit">
            Register
          </Button>
        </Segment>
      </Form>
      <Message info>
        <Link to={"/registerEmployer"}>
          <b>Click for Employer Register</b>
        </Link>
      </Message>
    </div>
  );
}
