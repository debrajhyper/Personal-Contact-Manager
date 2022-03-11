import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import useForm from '../../components/form-fields/useForm';

import { contactValidate } from '../../components/form-fields/validationMsg';
import { Header, FormAddress, FormName, FormEmail, FormTextarea, RequiredStatement, FormCompany, FormCountry, FormDOB, FormMobileNo, FormNickName, FormProfilePic, FormRelationship, FormTags, ModalProfilePic } from '../../components';

import HeaderImg from '../../img/pcm_add_contact.png';

import '../../components/form-fields/form_fields.scss';

import { Container, Row, Col, Form } from 'react-bootstrap';

const validate = contactValidate;

const AddContact = () => {

    const [modalProfilePicShow, setModalProfilePicShow] = useState(true);

    const [countryValue, setCountryValue] = useState('');

    const { values, handleChange, handleChangeSelect, handleChangeFile, handleChangeFileCancel, handleChangeFileUpload, handleBlur, handleSubmit, uploadedFile, touched, errors } = useForm(contactValidate);


    useEffect(() => {
        setModalProfilePicShow(true);
    }, [values.profilePic]);

    // const formik = useFormik({
    //     initialValues: {
    //         name: "",
    //         nickName: "",
    //         title: "",
    //         company: "",
    //         email: "",
    //         telephoneNo: null,
    //         mobileNo: null,
    //         address: "",
    //         profilePic: "",
    //         country: "",
    //         dob: "",
    //         zodiacSign: "",
    //         relationship: "",
    //         tags: [],
    //         favorite: false,
    //         socialLinks: {
    //             facebook: "",
    //             twitter: "",
    //             linkedin: "",
    //             instagram: "",
    //             youtube: "",
    //         },
    //         website: "",
    //         note: "",
    //     },
    //     validate,
    //     enableReinitialize: true,
    // })

    // console.log(formik.values)


    // const selectedTags = tags => {
    // 	console.log(tags);
    // };
    return (
        <Container fluid className='add-contact'>
            <Header image={HeaderImg} text={'Add Contact'} />

            <Row className="mx-auto b">
                <Col md={8} className="mx-auto b">

                    <Form onSubmit={handleSubmit} className="contact-form" id="contact-form" action="/user/process_contact" method="post" noValidate>
                        <RequiredStatement />
                        <Form.Group className="input-field-all position-relative">
                            <Row className="m-2 b">
                                {/* <div className="form-group form-input col-6">
                                        <input name="name" type="text" id="Name" required />
                                        <label for="Name" className="form-label"><i className="fas fa-user me-2"></i>Name</label>
                                        <span className="e_msg error_form ms-2 ps-1" id="name_error_message"></span>
                                        onChange={val => setCountryValue(val)}
                                    </div> */}
                                {/* <FormName name={formik.values.name} cName="col-6 px-4" functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.name} hasError={formik.errors.name} Mandatory={true}/> */}
                                {/* <FormAddress address={formik.values.address} cName="col-6 px-4" functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.address} hasError={formik.errors.address} Mandatory={false}/> */}
                                {/* <FormCompany company={formik.values.company} cName="col-6 px-4" functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.company} hasError={formik.errors.company} Mandatory={false}/> */}
                                {/* <FormCountry country={countryValue} onChange={val => setCountryValue(val)} cName="col-6 px-4"  Mandatory={false}/> */}
                                {/* <FormDOB dob={formik.values.dob}  cName="col-6 px-4" functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.name} hasError={formik.errors.name} Mandatory={false}/> */}
                                {/* <FormMobileNo mobileNo={formik.values.mobileNo}  cName="col-6 px-4" functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.name} hasError={formik.errors.name} Mandatory={true}/> */}
                                {/* <FormNickName nickName={formik.values.nickName}  cName="col-6 px-4" functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.name} hasError={formik.errors.name} Mandatory={false}/> */}
                                {/* <FormProfilePic profilePic={formik.values.profilePic}  cName="col-6 px-4" functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.name} hasError={formik.errors.name} /> */}
                                {/* <FormRelationship relationship={formik.values.relationship}  cName="col-6 px-4" functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.name} hasError={formik.errors.name} Mandatory={false}/> */}
                                {/* <FormTags selectedTags={selectedTags}  tagsV={['Nodejs', 'MongoDB']} cName="col-6 px-4" Mandatory={false}/> */}


                                <FormName name={values.name} cName="col-6 px-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.name} hasError={errors.name} Mandatory={true} />
                                <FormEmail email={values.email} cName="col-6 px-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.email} hasError={errors.email} Mandatory={true} />
                                <FormAddress address={values.address} cName="col-6 px-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.address} hasError={errors.address} Mandatory={false} />
                                <FormCompany company={values.company} cName="col-6 px-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.company} hasError={errors.company} Mandatory={false} />
                                <FormCountry country={values.country} cName="col-6 px-4" functionChange={(name, val) => handleChangeSelect(name, val)} functionBlur={handleBlur} hasTouched={touched.country} hasError={errors.country} Mandatory={false} />
                                <FormDOB dob={values.dob} cName="col-6 px-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.dob} hasError={errors.dob} Mandatory={false} />
                                <FormMobileNo mobileNo={values.mobileNo} countryCode={values.country} cName="col-6 px-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.mobileNo} hasError={errors.mobileNo} Mandatory={true} />
                                <FormNickName nickName={values.nickName} cName="col-6 px-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.nickName} hasError={errors.nickName} Mandatory={false} />
                                <FormProfilePic profilePic={values.profilePic} profilePicURL={values.profilePicURL} uploadedFile={uploadedFile} cName="col-6 px-4" functionChange={handleChangeFile} hasTouched={touched.profilePic} hasError={errors.profilePic} />
                            </Row>
                        </Form.Group>

                        <div className="text-center mt-2">
                            <div className="form-button">
                                <button type="submit" className="form-submit" >Save</button>
                            </div>
                        </div>

                    </Form>

                </Col>
            </Row>

            {
                values.profilePic && values.profilePicURL &&

                <ModalProfilePic modalProfilePicShow={modalProfilePicShow} setModalProfilePicShow={setModalProfilePicShow} profilePic={values.profilePic} profilePicURL={values.profilePicURL} functionCancel={handleChangeFileCancel} functionUpload={handleChangeFileUpload} hasError={errors.profilePic} />
            }
        </Container>


    )
}

export default AddContact