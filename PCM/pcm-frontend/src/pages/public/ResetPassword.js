import React from 'react'
import { useFormik } from 'formik';

import { excluded, OtpValidate } from '../../validation/validationMsg';

import { ButtonNormal, Counter, FormPassword } from '../../components/index';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

const ResetPassword = () => {

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        // validate,
        onSubmit: values => {
            console.log(values)
            // dispatch(verifyOTP(values.otp, generatedOTP, email));
        },
    });

    console.log(formik.values)
    
    return (
        <>
            <section className="public_pages login">
                <Container className="form-container" fluid>
                    <Row className="login-content">
                        <Col className="login-form">

                            <Container className="text d-flex flex-column justify-content-center align-items-center mt-3">
                                <h2 className="form-title">Reset Password</h2>
                            </Container>

                            {/* {
                                verifyOTPError 
                                ? <Alert className="alert-user-already-exists" variant="danger">{verifyOTPError}</Alert>
                                : sendOTPMessage && <Alert className="alert-user-already-exists" variant="success">{sendOTPMessage}</Alert>
                            } */}

                            <Container className='details pt-4 p-2'>
                                <h5 className='m-0'>In order to <strong>protect your account,</strong> make sure your password:</h5>
                                <br/>
                                <ul>
                                    <li>Is longer than 7 characters.</li>
                                    <li>Does not match or significantly contain your username, e.g. do not use 'username123'.</li>
                                    <li>Is not a member of this <strong><a href='https://en.wikipedia.org/wiki/List_of_the_most_common_passwords' target="blank">list of common passwords</a>  </strong>.</li>
                                    <li>Is not a member of the <strong><a href='https://haveibeenpwned.com/Passwords' target="blank">Have I Been Pwned</a></strong> breach database.</li>
                                </ul>
                            </Container>
                            
                            <Form className="register-form" onSubmit={formik.handleSubmit} method="post" noValidate>
                                <FormPassword label="New Password" password={formik.values?.password} functionChange={formik.handleChange} functionBlur={formik.handleBlur} excluded={excluded} hasTouched={formik.touched.password} hasError={formik.errors.password} Mandatory={true} />
                                <FormPassword label="Confirm New Password" password={formik.values?.confirmPassword} functionChange={formik.handleChange} functionBlur={formik.handleBlur} excluded={excluded} hasTouched={formik.touched.confirmPassword} hasError={formik.errors.confirmPassword} Mandatory={true} />

                                <Form.Group className="action_button center">
                                    <ButtonNormal type="submit" name="otp" id="Otp" cName="form_submit fill px-5" value="Verify OTP" loading={false} />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default ResetPassword