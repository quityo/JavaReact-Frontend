import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from "semantic-ui-react";
import { toast } from "react-toastify";
import CvService from "../../../services/cvService";
export default function BiographyUpdate({
  cvId,
  updateCvValues,
  curentBiography,
}) {
  let cvService = new CvService();
  const updateBiographySchema = Yup.object().shape({
    coverLetter: Yup.string().required("Zorunlu"),
  });

  const formik = useFormik({
    initialValues: {
      coverLetter: curentBiography,
    },
    validationSchema: updateBiographySchema,
    onSubmit: (values) => {
      cvService
        .updateBiography(cvId, values.coverLetter)
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
          <b>Biyografi</b>
        </label>
        <div style={{ marginTop: "1em", marginBottom: "1em" }}>
          <Form.TextArea
            placeholder="Biyografi..."
            type="text"
            value={formik.valuescoverLetter}
            name="coverLetter"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ minHeight: 200 }}
          />
          {formik.errors.coverLetter && formik.touched.coverLetter && (
            <div className={"ui pointing red basic label"}>
              {formik.errors.coverLetter}
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
