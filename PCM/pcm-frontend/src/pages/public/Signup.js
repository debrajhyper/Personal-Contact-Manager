import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import guest_signup_register from '../../img/guest_signup_register.png';
import guest_signup_register_left from '../../img/guest_signup_register_left.png';

import { FormName, FormEmail, FormPassword, FormTextarea, FormAgrement, SignupButtons, ModalHelper, RequiredStatement } from '../../components';
import { signupValidate } from '../../components/form-fields/validationMsg';

import '../../sass/public/signup.scss';
import '../../components/form-fields/form_fields.scss';

import { Container, Image, Form, Row, Col, Alert } from 'react-bootstrap';

import RegisterServices from '../../services/RegisterServices';


const validate = signupValidate;

const Signup = () => {
    const [message, setMessage] = useState({
        msg: "",
        msgContent: "",
        type: ""
    })

    const [alert, setAlert] = useState("")

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            about: "",
            agreement: false
        },
        validate,
        onSubmit: values => {
            // console.log(values)
            setMessage({
                msg: "",
                msgContent: "",
                type: ""
            })
            setAlert("")

            RegisterServices.doRegister(values)
            .then(response => {
                formik.resetForm();
                setMessage({
                    msg: "Success",
                    msgContent: "Successfully Registered",
                    type: "success"
                })
                //console.log("SUCCESS -> " , response.data)
            })
            .catch(error => {
                if(error.response.status === 409) {
                    setAlert(error.response.data.message)
                }
                else {
                    setMessage({
                        msg: "Problem",
                        msgContent: "Something Went Wrong !!",
                        type: "error"
                    })
                }
                //console.log("ERROR -> " , error.response)
            });
        },
    });

    return (
        <>
            <section className="public_pages signup">
                {message.msg && <ModalHelper message={message.msg} content={message.msgContent} type={message.type}/>}

                <Container className="form-container" fluid>
                    <Row className="signup-content">
                        <Col className="signup-form" sm={6} xs={12}>
                        
                            <Container className="text d-flex justify-content-start align-items-end">
                                <Image className="header_img" src={guest_signup_register} alt="Register"/>
                                <h2 className="form-title">Register Here</h2>
                            </Container>

                            {alert && <Alert className="alert-user-already-exists" variant="danger">{alert}</Alert>}

                            <Form className="register-form" onSubmit={formik.handleSubmit} method="post" noValidate>
                                <RequiredStatement />
                                <FormName name={formik.values.name} functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.name} hasError={formik.errors.name} Mandatory={true}/>
                                <FormEmail fieldName="email" email={formik.values.email} functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.email} hasError={formik.errors.email} Mandatory={true}/>
                                <FormPassword password={formik.values.password} functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.password} hasError={formik.errors.password} Mandatory={true}/>
                                <FormTextarea about={formik.values.about} functionChange={formik.handleChange}/>
                                <FormAgrement agreement={formik.values.agreement} functionChange={formik.handleChange} hasTouched={formik.touched.agreement} hasError={formik.errors.agreement} Mandatory={true}/>
                                <Form.Group className="action_button">
                                    <SignupButtons type="submit" name="signup" id="Signup" cName="form_submit" value="Register"/>
                                    <SignupButtons type="reset" name="reset" id="reset" cName="form_reset" value="Reset" action={formik.resetForm}/>
                                </Form.Group>
                            </Form>

                        </Col>
                        <Col className="signup_image text-center">
                            <Image className="reg_left" src={guest_signup_register_left} alt="sing up"/>
                            <Link to="/login" className="signup-image-link underline">I am already a member</Link>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Signup