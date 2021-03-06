import React from "react";
import { useDispatch } from "react-redux";
import UserService from "../../services/userService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, Header, Message, Segment } from "semantic-ui-react";
import { userLogin } from "../../Store/action/authAction";

export default function Login() {
  const dispatch = useDispatch();
  const handleLogin = (user) => {
    dispatch(userLogin(user));
  };

  const history = useHistory();

  let userService = new UserService();
  const userLoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Bu alan doldurulmak zorunda")
      .email("Geçerli bir email adresi giriniz"),
    password: Yup.string().required("Bu alan doldurulmak zorundadır"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userLoginSchema,
    onSubmit: (values) => {
      userService.login(values).then((result) => {
        handleLogin(result.data.data);
        history.push("/");
      });
    },
  });
  return (
    <div style={{ margin: "auto" }}>
      <Header as="h2" color="teal" textAlign="center">
        {" "}
        Giriş Yap
      </Header>
      <Form size="large" onSubmit={formik.handleSubmit}>
        <Segment stacked>
          <div>
            <label>
              <b>E-Mail</b>
            </label>
            <Form.Input
              fluid
              placeholder="E-mail address"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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

          <Button
            color="teal"
            fluid
            size="large"
            type="submit"
            style={{ marginTop: "1em" }}
          >
            Enter
          </Button>
        </Segment>
      </Form>
      <Message info color="black">
      You're not registered? - 
        <b>
          <Link to={"/register"} > Register Now</Link>
        </b>
      </Message>
    </div>
  );
}
