import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';

import { DASHBOARD_LINK, FORGOT_PASSWORD_LINK, SIGNUP_LINK } from '../../Route';

import { useSelector, useDispatch } from 'react-redux';
import { authenticationUser, clearResetPassword, clearSendOTP, clearVerifyOTP } from '../../services/index';

import '../../sass/public/login.scss';
import '../../components/form-fields/form_fields.scss';

import { loginValidate } from '../../validation/validationMsg';

import { FormEmail, FormPassword, ButtonNormal } from '../../components/index';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

const Login = () => {
    const { loading, isLoggedIn, logInError } = useSelector(state => state.auth);
    const { resetPasswordMessage } = useSelector(state => state.resetPassword);
    
    const validate = loginValidate;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || DASHBOARD_LINK;

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate,
        onSubmit: values => {
            dispatch(authenticationUser(values.email, values.password));
        },
    });
    
    useEffect(() => {
        if (isLoggedIn) {
            navigate(from, { replace: true });
        }
    }, [isLoggedIn, navigate, from]);

    useEffect(() => {
        if(resetPasswordMessage !== '') {
            dispatch(clearSendOTP());
            dispatch(clearVerifyOTP());
            setTimeout(() => {
                dispatch(clearResetPassword());
            }, 10000);
        }
    }, [resetPasswordMessage, dispatch])

    return (
        <section className="login">
            <Container className="form-container" fluid>
                <Row className="login-content">
                    <Col className="login-form">

                        <Container className="text d-flex justify-content-center align-items-center mt-3">
                            <h2 className="form-title">Log in to PCM</h2>
                        </Container>

                        {
                            resetPasswordMessage
                            ? <Alert className="alert-user-already-exists" variant="success">{resetPasswordMessage}</Alert>
                            : logInError && <Alert className="alert-user-already-exists" variant={`${logInError === 'User successfully logged out' ? 'success' : 'danger'}`}>{logInError}</Alert>
                        }

                        <Form className="register-form" onSubmit={formik.handleSubmit} method="post" noValidate>
                            <FormEmail email={formik.values?.email} functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.email} hasError={formik.errors.email} Mandatory={true} />
                            <FormPassword password={formik.values?.password} functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.password} hasError={formik.errors.password} Mandatory={true} />

                            <Container className="forgot-pass-link">
                                <Form.Group className="form-input-agreement" style={{ display: "inline-block" }}>
                                    <div className="form-input-line">
                                        <Form.Check name="agreement" type="checkbox" control="checkbox" className="agree-term-box" style={{ display: "inline-block" }} />
                                        <Form.Label className="label-agree-term m-0">Remember Me</Form.Label>
                                    </div>
                                </Form.Group>
                                <Link to={FORGOT_PASSWORD_LINK} className="underline">Forgot Password?</Link>
                            </Container>

                            <Form.Group className="action_button center">
                                <ButtonNormal type="submit" name="login" id="Login" cName="form_submit fill px-5" value="Login" loading={loading} />
                            </Form.Group>

                            <Container className="signup-link text-center mt-5 mb-3">
                                <Link to={SIGNUP_LINK} className="underline">Signup for PCM</Link>
                            </Container>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Login;