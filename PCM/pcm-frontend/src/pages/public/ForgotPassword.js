import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';

import { useSelector, useDispatch } from 'react-redux';
import { sendOTP } from '../../services/index';

import { ForgotPasswordValidate } from '../../validation/validationMsg';

import { FormEmail, ButtonNormal } from '../../components/index';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

const validate = ForgotPasswordValidate;

const ForgotPassword = () => {
    const { loading, emailSent, generatedOTP, error } = useSelector(state => state.sendOTP);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate,
        onSubmit: values => {
            dispatch(sendOTP(values));
        },
    });

    useEffect(() => {
        if(emailSent) {
            navigate("/verify-otp")
        }
    }, [emailSent, navigate])

    return (
        <>
            <section className="public_pages login">
                <Container className="form-container" fluid>
                    <Row className="login-content">
                        <Col className="login-form">

                            <Container className="text d-flex flex-column justify-content-center align-items-center mt-3">
                                <h2 className="form-title">PCM</h2>
                                <h3 className="form-title mt-5">Enter Your Registered Email Address</h3>
                            </Container>

                            {error && <Alert className="alert-user-already-exists" variant="danger">{error}</Alert>}

                            <Form className="register-form" onSubmit={formik.handleSubmit} method="post" noValidate>
                                <FormEmail email={formik.values?.email} functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.email} hasError={formik.errors.email} Mandatory={true} />

                                <Form.Group className="action_button center">
                                    <ButtonNormal type="submit" name="otp" id="Otp" cName="form_submit fill px-5" value="Send OTP" loading={loading} />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default ForgotPassword