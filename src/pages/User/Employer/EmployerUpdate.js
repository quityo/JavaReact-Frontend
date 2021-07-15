
import { Button, Card, Input, Form, Modal, Label, Icon, Container, Segment, Grid, Dropdown} from "semantic-ui-react";
import * as Yup from "yup";

import swal from "sweetalert";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import EmployerService from '../../../services/employerService';

  export default function EmployerUpdate() {
    const {authItem} = useSelector(state => state.auth)
    let {userId} = useParams()
  const [employer, setEmployer] = useState({});
  useEffect((userId) => {
    let employerService = new EmployerService();
    employerService.getEmployerId(authItem[0].user.userId).then((result) => {
      setEmployer(result.data.data);
    });
  }, [userId]);

  const formik = useFormik({
    initialValues: {
      userId: employer?.userId,
      companyName: employer?.companyName,
      email:employer?.email,
      phoneNumber:employer?.phoneNumber,
      password:employer?.password,
      website:employer?.website,
      employerUpdate:employer?.employerUpdate,
      
    },

    validationSchema: Yup.object({
        companyName: Yup.string().required("Şirket adı boş bırakılamaz!"),
        email:Yup.string().required("Mail adresi boş bırakılamaz!"),
        phoneNumber:Yup.string().required("Telefon Numarası boş bırakılamaz!"),
        password:Yup.string().required("Şifre bilgisi boş bırakılamaz!"),
        website:Yup.string().required("Şirket web adresi boş bırakılamaz!")
      }),
      onSubmit: (userId) => {
        let employerService = new EmployerService();
       employerService.update(userId).then((result) => console.log(result.data.data));
       swal("Başarılı!", "Güncelleme isteği alındı.Sistem personeli tarafından onaylandıktan sonra bilgileriniz güncellenecektir!", "success");
     },
    enableReinitialize: true,
  });
  const [employers, setEmployers] = useState([])

      useEffect(() => {
          let employerService=new EmployerService();
          employerService.getEmployers().then(result=>setEmployers(result.data.data))
      }, [])

      const getEmployers = employers.map((employer, index) => ({
        key: index,
        text: employer.companyName,
        value: employer,
      }));

    
      const handleChangeSemantic = (value, fieldName) => {
        formik.setFieldValue(fieldName, value);
      };
  const [open, setOpen] = React.useState(false)
    return (
        <div style={{
          margin: "auto"
        }}>
             <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
            <Button
                type="submit"
                inverted
                color="green"
                size="massive"
                style={{ marginBottom: "1em" }}
              >
                <Button.Content visible>Şirken Bilgilerinizi Güncelleyin</Button.Content>
                <Button.Content hidden>
                </Button.Content>
              </Button>
        }
      >
        <Modal.Header>Şirket Bilgi Güncelleme</Modal.Header>
        <Modal.Description>
        <Container>
            <Segment circle="true" vertical style={{ padding: "3em 0em" }}>
              <Grid>
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={14}>
                  <Card fluid color="orange">
                    <Card.Content>
                      <Form onSubmit={formik.handleSubmit}>
                      <Form.Field style={{ marginBottom: "1rem" }}>
                        <Label basic color="orange">
                        Company Name
                          </Label>
                          <Input
                            style={{ marginRight: "1em", marginTop: "1em" }}
                            placeholder="Company Name"
                            value={formik.values.companyName}
                            name="companyName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          ></Input>
                          {formik.errors.companyName && formik.touched.companyName && (
                            <div className={"ui pointing red basic label"}>
                              {formik.errors.companyName}
                            </div>
                          )}
                        </Form.Field>
                        <Form.Field style={{ marginBottom: "1rem" }}>
                        <Label basic color="orange">
                            Mail:
                          </Label>
                          <Input
                            style={{ marginRight: "1em", marginTop: "1em" }}
                            placeholder="EMail..."
                            value={formik.values.email}
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          ></Input>
                          {formik.errors.email && formik.touched.email && (
                            <div className={"ui pointing red basic label"}>
                              {formik.errors.email}
                            </div>
                          )}
                        </Form.Field>
                        <Form.Field style={{ marginBottom: "1rem" }}>
                        <Label basic color="orange">
                             Şifre:
                          </Label>
                          <Input
                            style={{ marginRight: "1em", marginTop: "1em" }}
                            placeholder="Şifre..."
                            value={formik.values.password}
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          ></Input>
                          {formik.errors.password && formik.touched.password && (
                            <div className={"ui pointing red basic label"}>
                              {formik.errors.password}
                            </div>
                          )}
                        </Form.Field>
                        <Form.Field style={{ marginBottom: "1rem" }}>
                        <Label basic color="orange">
                             Telefon Numarası:
                          </Label>
                          <Input
                            style={{ marginRight: "1em", marginTop: "1em" }}
                            placeholder="Telefon..."
                            value={formik.values.phoneNumber}
                            name="phoneNumber"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          ></Input>
                          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                            <div className={"ui pointing red basic label"}>
                              {formik.errors.phoneNumber}
                            </div>
                          )}
                        </Form.Field>
                        <Form.Field style={{ marginBottom: "1rem" }}>
                        <Label basic color="orange">
                             Web Adresi:
                          </Label>
                          <Input
                            style={{ marginRight: "1em", marginTop: "1em" }}
                            placeholder="Web..."
                            value={formik.values.website}
                            name="website"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          ></Input>
                          {formik.errors.website && formik.touched.website && (
                            <div className={"ui pointing red basic label"}>
                              {formik.errors.website}
                            </div>
                          )}
                        </Form.Field>
                       
                        <Modal.Actions>
                          <Button
                            onClick={() => setOpen(false)}
                            animated
                            basic
                            color="orange"
                            size="massive"
                            style={{
                              marginBottom: "0.4em",
                              marginLeft: "19.8em",
                            }}
                          >
                            <Button.Content visible>Vazgeç</Button.Content>
                            <Button.Content hidden>
                              <Icon name="delete" />
                            </Button.Content>
                          </Button>
                          <Button
                            type="submit"
                            animated
                            basic
                            color="orange"
                            size="massive"
                            style={{
                              marginBottom: "0.4em",
                              marginRigth: "10em",
                            }}
                          >
                            <Button.Content visible>Kaydet</Button.Content>
                            <Button.Content hidden>
                              <Icon name="check" />
                            </Button.Content>
                          </Button>
                        </Modal.Actions>
                      </Form>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid>
            </Segment>
          </Container>

        </Modal.Description>
      </Modal>
        </div>
    )
}