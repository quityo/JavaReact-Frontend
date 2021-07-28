import React from 'react'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Button, Form } from "semantic-ui-react";
import { toast } from 'react-toastify';
import CvService from '../../../services/cvService';
export default function GitHubUpdate({cvId,updateCvValues}) {

    let cvService = new CvService();
    const updateGithubSchema = Yup.object().shape({
        githubAddress: Yup.string().required("Zorunlu")
    })

    const formik = useFormik({
        initialValues:{
            githubAddress:""
        },
        validationSchema: updateGithubSchema,
        onSubmit:(values) =>{
            cvService.updateGithub(cvId,values.githubAddress).then((result) =>{
                toast.success(result.data.message)
                updateCvValues();
            }).catch((result) => {
                toast.error(result.response.data.message)
            })
        }
    })

    return (
        <div>
            <Form size="large" onSubmit={formik.handleSubmit}>
                <label><b>GitHub Link</b></label>
                <div style={{marginTop :"1em" ,marginBottom:"1em"}}>
                <Form.Input
                    fluid
                    placeholder="Github Link"
                    type="text"
                    value={formik.values.githubAddress}
                    name="githubAddress"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {
                formik.errors.githubAddress && formik.touched.githubAddress && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.githubAddress}
                  </div>
                )
              }
              </div>
              <Button color="green" fluid size="large" type="submit">Güncelle</Button>
            </Form>
        </div>
    )
}