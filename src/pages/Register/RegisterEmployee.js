import { useFormik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import EmployeeService from "../../services/employeeService";

export default function RegisterEmployee() {
  let employeeService = new EmployeeService();
  const employeeRegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("Kullanıcı adı zorunludur")
      .min(2, "Kullanıcı adı en az iki uzunlukta olmalıdır"),
    lastName: Yup.string()
      .required("Kullanıcı soyadı zorunludur")
      .min(2, "Kullanıcı soy adı en az iki uzunlukta olmalıdır"),
    password: Yup.string()
      .required("Şifre zorunludur")
      .min(6, "Şifre en az 6 karakter uzunluğunda olmalıdır"),
    passwordAgain: Yup.string()
      .required("Şifre tekrar zorunludur")
      .oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor"),
    email: Yup.string()
      .required("Email zorunludur")
      .email("Geçerli bir email değil"),
  });

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      password: "",
      passwordAgain: "",
      email: "",
    },
    validationSchema: employeeRegisterSchema,
    onSubmit: (values) => {
      employeeService
        .add(values)
        .then((result) => {
          toast.success(result.data.message);
          history.push("/login");
        })
        .catch((result) => {
          toast.error(result.response.data.message);
        });
    },
  });

  return (
    <div style={{ margin: "auto" }}>
      <Header as="h2" color="teal" textAlign="center">
        Register For Employee
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
                  placeholder="First Name.."
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
                  <b>Password</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Password"
                  type="text"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.password}
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
                  name="lastName"
                  value={formik.values.lastName}
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
                  <b>Re-Password</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Password again"
                  type="text"
                  name="passwordAgain"
                  value={formik.values.passwordAgain}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.passwordAgain &&
                  formik.touched.passwordAgain && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.passwordAgain}
                    </div>
                  )}
              </div>
            </Grid.Column>
          </Grid>
          <div style={{ marginTop: "1.5em" }}>
            <label margin="auto">
              <b>Email</b>
            </label>

            <Form.Input
              fluid
              placeholder="Email"
              type="email"
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <div className={"ui pointing red basic label"}>
                {formik.errors.email}
              </div>
            )}
          </div>
          <br />
          <Button color="teal" fluid size="large" type="submit">
            Register
          </Button>
        </Segment>
      </Form>
    </div>
  );
}
