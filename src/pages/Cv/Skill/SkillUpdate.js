import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import SkillService from "../../../services/jobseeker/skillService";
import { Card, Table, Button, Form, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function SkillUpdate({ cvId, updateCvValues }) {
  let [skills, setSkills] = useState([]);

  let skillService = new SkillService();
  useEffect(() => {
    let skillService = new SkillService();
    skillService.getByCvId(cvId).then((result) => {
      setSkills(result.data.data);
    });
  }, [cvId]);

  let skillAddSchema = Yup.object().shape({
    skillName: Yup.string()
      .required("Bu alan zorunludur")
      .min(2, "Minimum 2 karakter uzunlugunda olmalıdır"),
  });

  const formik = useFormik({
    initialValues: {
      skillName: "",
    },
    validationSchema: skillAddSchema,
    onSubmit: (values) => {
      values.cvId = cvId;
      skillService
        .add(values)
        .then((result) => {
          toast.success(result.data.message);
          skillService.getByCvId(cvId).then((result) => {
            setSkills(result.data.data);
          });
          updateCvValues();
        })
        .catch((result) => {
          toast.error(result.response.data.message);
        });
    },
  });

  const handleDeleteSkill = (skillId) => {
    skillService
      .delete(skillId)
      .then((result) => {
        toast.success(result.data.message);
        skillService.getByCvId(cvId).then((result) => {
          setSkills(result.data.data);
        });
        updateCvValues();
      })
      .catch((result) => {
        toast.error(result.response.data.message);
      });
  };

  return (
    <div>
      <Grid stackable>
        <Grid.Column width={8}>
          <Card fluid color={"black"}>
            <Card.Content header={"Teknoloji Ekle"} />
            <Card.Content>
              <Form onSubmit={formik.handleSubmit}>
                <label>
                  <b>Teknoloji Adı</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Teknoloji Adı"
                  type="text"
                  name="skillName"
                  value={formik.values.skillName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.skillName && formik.touched.skillName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.skillName}
                  </div>
                )}
                <Button fluid color="green" type="submit">
                  Ekle
                </Button>
              </Form>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={8}>
          <Table celled color={"black"}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Teknoloji</Table.HeaderCell>
                <Table.HeaderCell>Sil</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {skills?.map((skill) => (
                <Table.Row key={skill.skillId}>
                  <Table.Cell>{skill.skillName}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="red"
                      icon="x"
                      circular
                      onClick={() => handleDeleteSkill(skill.skillId)}
                    ></Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    </div>
  );
}
