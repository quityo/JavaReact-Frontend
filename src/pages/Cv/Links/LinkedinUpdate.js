import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from "semantic-ui-react";
import { toast } from "react-toastify";
import CvService from "../../../services/cvService";
export default function LinkedinUpdate({ cvId, updateCvValues }) {
  let cvService = new CvService();
  const updateLinkedinSchema = Yup.object().shape({
    linkedinAddress: Yup.string().required("Zorunlu"),
  });

  const formik = useFormik({
    initialValues: {
      linkedinAddress: "",
    },
    validationSchema: updateLinkedinSchema,
    onSubmit: (values) => {
      cvService
        .updateLinkedin(cvId, values.linkedinAddress)
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
          <b>Linkedin Link</b>
        </label>
        <div style={{ marginTop: "1em", marginBottom: "1em" }}>
          <Form.Input
            fluid
            placeholder="Linkedin Link"
            type="text"
            value={formik.values.linkedinAddress}
            name="linkedinAddress"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errorslinkedinAddress && formik.touched.linkedinAddress && (
            <div className={"ui pointing red basic label"}>
              {formik.errors.linkedinAddress}
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
