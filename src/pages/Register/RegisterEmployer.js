import { useFormik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import * as Yup from "yup";
import EmployerService from "../../services/employerService";

export default function RegisterEmployer() {
  /*return (
            <div>
              <Grid
                textAlign="center"
                style={{ height: "100vh" }}
                verticalAlign="middle"
              >
                <Grid.Column style={{ maxWidth: 450 }}>
                  <Header as="h2" inverted color="red" textAlign="center">
                    <Header.Content>
                      <Header.Content>İşveren Yeni Üyelik Oluştur</Header.Content>
                    </Header.Content>
                  </Header>
                  <Form size="large">
                    <Segment textAlign="left" color="red" stacked>
                      <Form.Input
                        fluid
                        icon="warehouse"
                        iconPosition="left"
                        label="Şirket Adı"
                        placeholder="Şirket adı"
                        type="companyName"
                      />
                      <Form.Input
                        fluid
                        icon="phone"
                        iconPosition="left"
                        label="Telefon Numarası"
                        placeholder="Telefon numarası"
                        type="phoneNumber"
                      />
        
                      <Form.Input
                        fluid
                        icon="world"
                        iconPosition="left"
                        label="Web Sitesi"
                        placeholder="Web Sitesi"
                        type="website"
                      />
                      <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        label="E-posta Adresi"
                        placeholder="E-posta adresi"
                        type="email"
                      />
                      <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        label="Şifre Oluştur"
                        placeholder="Şifre"
                        type="password"
                      />
                      <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        label="Şifre Tekrar"
                        placeholder="Şifre tekrar"
                        type="password_again"
                      />
        
                      <Button primary fluid size="large">
                        KAYIT OL
                      </Button>
                    </Segment>
                  </Form>
                  <Message>
                    Zaten üye misin?{" "}
                    <Button as={NavLink} to="/loginemployer" color="green">
                      GİRİŞ YAP
                    </Button>
                  </Message>
                </Grid.Column>
              </Grid>
            </div>
          );*/

  let employerService = new EmployerService();
  const employerRegisterSchema = Yup.object().shape({
    companyName: Yup.string()
      .required("Şirket adı zorunludur")
      .min(2, "Şirket adı en az iki uzunlukta olmalıdır"),
    phoneNumber: Yup.string()
      .required("Telefon numarası zorunludur")
      .length(10, "Telefon numarası hatalı '0' olmadan yazınız")
      .matches(/^[0-9]+$/, "Sadece rakam girilmelidir"),
    password: Yup.string()
      .required("Şifre zorunludur")
      .min(6, "Şifre en az 6 karakter uzunluğunda olmalıdır"),
    passwordAgain: Yup.string()
      .required("Şifre tekrar zorunludur")
      .oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor"),
    website: Yup.string()
      .required("Web sitesi zorunludur")
      .test("Http olmadan yazınız", function () {
        let site = this.parent["website"];
        if (site) {
          return site.startsWith("http") ? false : true;
        }
      }),
    email: Yup.string()
      .required("Email zorunludur")
      .email("Geçerli bir email değil")
      .test("Email domaini ile web sitesi domaini aynı olmalıdır", function () {
        let site = this.parent["website"];
        let email = this.parent["email"];
        if (site && email) {
          return email.endsWith(site) ? true : false;
        }
      }),
    reEmail: Yup.string()
      .required("Email Tekrar zorunludur")
      .oneOf(
        [Yup.ref("email"), null],
        "Email bilgileri birbiri ile eşleşmıyor"
      ),
  });

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      companyName: "",
      password: "",
      passwordAgain: "",
      website: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: employerRegisterSchema,
    onSubmit: (values) => {
      employerService
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
    <div>
      <Header as="h2" color="teal" textAlign="center">
        Register For Company
      </Header>
      <Form size="large" onSubmit={formik.handleSubmit}>
        <Segment stacked>
          <div style={{ marginTop: "1.5em" }}>
            <label margin="auto">
              <b>Company</b>
            </label>
            <Form.Input
              fluid
              placeholder="Company name.."
              type="text"
              value={formik.values.companyName}
              name="companyName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.companyName && formik.touched.companyName && (
              <div className={"ui pointing red basic label"}>
                {formik.errors.companyName}
              </div>
            )}
          </div>
          <Grid stackable>
            <Grid.Column width={8}>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Telephone</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Tel no.."
                  type="text"
                  value={formik.values.phoneNumber}
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.phoneNumber}
                  </div>
                )}
              </div>

              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Email</b> (domain)
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
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Şifre</b>
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
                  <b>Website</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="www."
                  type="text"
                  name="website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.website && formik.touched.website && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.website}
                  </div>
                )}
              </div>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Email Again</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Email again.."
                  type="email"
                  name="reEmail"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.reEmail && formik.touched.reEmail && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.reEmail}
                  </div>
                )}
              </div>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Password Again</b>
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

          <br />
          <Button color="teal" fluid size="large" type="submit">
            Register
          </Button>
        </Segment>
      </Form>
      <Message warning>
        İşveren kayıtları sistem çalışanları tarafından onaylandıktan sonra
        aktif hale gelmektedir!
      </Message>
    </div>
  );
}
