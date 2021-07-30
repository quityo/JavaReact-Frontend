import React, { useEffect } from "react";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from "semantic-ui-react";
import { toast } from "react-toastify";
import ExperienceService from "../../../services/jobseeker/experienceService";

export default function PositionUpdate({ cvId, updateCvValues,experienceId }) {
    let [experiences, setExperiences] = useState([]);
    let experienceService = new ExperienceService();
    useEffect(() => {
        let experienceService = new ExperienceService();
        experienceService.getByCvId(cvId).then((result) => {
          setExperiences(result.data.data);
        });
      }, [cvId]);
    const positionUpdateSchema = Yup.object().shape({
        position: Yup.string().required("Zorunlu"),
    });
  
    const formik = useFormik({
      initialValues: {
    position: "",
      },
      validationSchema: positionUpdateSchema,
      onSubmit: (values) => {
        experienceService
          .updatePosition(experienceId, values.position)
          .then((result) => {
            toast.success(result.data.message);
            updateCvValues();
          })
          .catch((result) => {
            toast.error(result.response.data.message);
          });
      },
    });
  
    return (
      <div>
        <Form size="large" onSubmit={formik.handleSubmit}>
          <label>
            <b>Position</b>
          </label>
          <div style={{ marginTop: "1em", marginBottom: "1em" }}>
            <Form.Input
              fluid
              placeholder="Position"
              type="text"
              value={formik.values.position}
              name="position"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.position && formik.touched.position && (
              <div className={"ui pointing red basic label"}>
                {formik.errors.position}
              </div>
            )}
          </div>
          <Button color="green" fluid size="large" type="submit">
            Güncelle
          </Button>
        </Form>
      </div>
    );
  }
  