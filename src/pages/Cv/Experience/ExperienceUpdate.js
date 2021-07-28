import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Card, Table, Button, Form, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import ExperienceService from "../../../services/jobseeker/experienceService"

export default function ExperienceUpdate({cvId,updateCvValues}) {

    let [experiences, setExperiences] = useState([])

    let experienceService = new ExperienceService();
    useEffect(() => {
        let experienceService = new ExperienceService();
        experienceService.getByCvId(cvId).then((result) => {
            setExperiences(result.data.data)
        })
    },[cvId])

    let experienceAddSchema = Yup.object().shape({
        workingPlace: Yup.string().required("Bu alan zorunludur").min(2,"En az 2 karakter uzunlugunda olmalıdır"),
        position: Yup.string().required("Bu alan zorunludur").min(2,"En az 2 karakter uzunlugunda olmalıdır"),
        startYearOfWork: Yup.date().required("Bu alan zorunludur"),
        endYearOfWork: Yup.date(),
    })

    const formik = useFormik({
        initialValues: {
            workingPlace:"",
            position:"",
            startYearOfWork:"",
            endYearOfWork:"",
        },
        validationSchema: experienceAddSchema,
        onSubmit:(values)=>{
            values.cvId=cvId;
            experienceService.add(values).then((result) => {
                toast.success(result.data.message)
                experienceService.getByCvId(cvId).then((result) => {
                    setExperiences(result.data.data)
                })
                updateCvValues();
            }).catch((result) => {
                toast.error(result.response.data.message)
            })
        }
    })

    const handleDeleteExperience = (experienceId) => {
        experienceService.delete(experienceId).then((result) => {
            toast.success(result.data.message);
            experienceService.getByCvId(cvId).then((result) => {
                setExperiences(result.data.data)
            })
            updateCvValues();
        }).catch((result) => {
            toast.error(result.response.data.message)
        })
    }

    return (
        <div>
            <Card fluid color={"black"}>
                <Card.Content header="Tecrübeler" />
                <Table celled color={"black"}>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                    <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                    <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
                    <Table.HeaderCell>Bitiş Tarihi</Table.HeaderCell>
                    <Table.HeaderCell>Sil</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {experiences?.map((experience) => (
                        <Table.Row key={experience.experienceId}>
                            <Table.Cell>{experience.workingPlace}</Table.Cell>
                            <Table.Cell>{experience.position}</Table.Cell>
                            <Table.Cell>{experience.startYearOfWork}</Table.Cell>
                            <Table.Cell>{experience.endYearOfWork ? experience.endYearOfWork:<p>Devam ediyor</p>}</Table.Cell>
                            <Table.Cell>
                            <Button color="red" icon="x" circular onClick={() => handleDeleteExperience(experience.experienceId)}>
                            </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                </Table>
            </Card>
            <Card fluid color={"black"}>
                <Card.Content header="Tecrübe Ekle"/>
                <Card.Content>
                <Form onSubmit={formik.handleSubmit}>
                    <Grid>
                        <Grid.Column width={8}>
                            <div>
                            <label><b>Şirket Adı</b></label>
                            <Form.Input
                                fluid
                                placeholder="Şirket Adı"
                                type="text"
                                name="workingPlace"
                                value={formik.values.workingPlace}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errorsworkingPlace && formik.touched.workingPlace && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.workingPlace}
                                </div>
                            )}
                            </div>
                            <label><b>Başlangıç Tarihi</b></label>
                            <Form.Input
                                fluid
                                type="date"
                                name="startYearOfWork"
                                value={formik.values.startYearOfWork}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.startYearOfWork&& formik.touched.startYearOfWork && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.startYearOfWork}
                                </div>
                            )}
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <div>
                                <label><b>Pozisyon</b></label>
                                <Form.Input
                                    fluid
                                    placeholder="Pozisyon"
                                    type="text"
                                    name="position"
                                    value={formik.values.position}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.position && formik.touched.position && (
                                    <div className={"ui pointing red basic label"}>
                                        {formik.errors.position}
                                    </div>
                                )}
                            </div>
                            <label><b>Bitiş Tarihi</b></label>
                            <Form.Input
                                fluid
                                type="date"
                                name="endYearOfWork"
                                value={formik.values.endYearOfWork}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.endYearOfWork && formik.touched.endYearOfWork && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.endYearOfWork}
                                </div>
                            )}
                        </Grid.Column>
                    </Grid>
                    <div style={{marginTop:"1em"}}>
                    <Button fluid color="green" type="submit">Ekle</Button>
                    </div>
                </Form>
                </Card.Content>
            </Card>
        </div>
    )
}