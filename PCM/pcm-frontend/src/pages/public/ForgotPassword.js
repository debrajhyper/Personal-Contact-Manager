import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';

import { DASHBOARD_LINK, VERIFY_OTP_LINK } from '../../Route';

import { useSelector, useDispatch } from 'react-redux';
import { sendOTP } from '../../services/index';

import { ForgotPasswordValidate } from '../../validation/validationMsg';

import { FormEmail, ButtonNormal } from '../../components/index';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

const ForgotPassword = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const { loading, emailSent, sendOTPError } = useSelector(state => state.sendOTP);
    
    const validate = ForgotPasswordValidate;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || DASHBOARD_LINK;

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate,
        onSubmit: values => {
            dispatch(sendOTP(values.email));
        },
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate(from, { replace: true });
        }
    }, [isLoggedIn, navigate, from]);

    useEffect(() => {
        if(emailSent) {
            navigate(VERIFY_OTP_LINK)
        }
    }, [emailSent, navigate])

    return (
        <>
            <section className="public_pages login">
                <Container className="form-container" fluid>
                    <Row className="login-content">
                        <Col className="login-form">

                            <Container className="text d-flex flex-column justify-content-center align-items-center mt-3">
                                <h2 className="form-title">Forgot Password?</h2>
                            </Container>

                            { sendOTPError && <Alert className="alert-user-already-exists" variant="danger">{sendOTPError}</Alert> }

                            <Container className='details pt-4 p-2'>
                                <h5 className='m-0'>That's okay, it happens!</h5>
                                <br/>
                                <p className='m-0'>
                                    Enter your email address you're using for your account below
                                    and we will send you a verification code.
                                </p>
                            </Container>

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