import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import { useSelector, useDispatch } from 'react-redux';
import { authenticationUser } from '../../services/index';

import { FormEmail, FormPassword, ButtonNormal } from '../../components/index';
import { loginValidate } from '../../validation/validationMsg';

import '../../sass/public/login.scss';
import '../../components/form-fields/form_fields.scss';

import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

const validate = loginValidate;

const Login = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

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

    return (
        <>
            <section className="public_pages login">
                <Container className="form-container" fluid>
                    <Row className="login-content">
                        <Col className="login-form">

                            <Container className="text d-flex justify-content-center align-items-center mt-3">
                                <h2 className="form-title">Log in to PCM</h2>
                            </Container>

                            {auth?.logInError && <Alert className="alert-user-already-exists" variant="danger">{auth.logInError}</Alert>}

                            <Form className="register-form" onSubmit={formik.handleSubmit} method="post" noValidate>
                                <FormEmail email={formik.values.email} functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.email} hasError={formik.errors.email} />
                                <FormPassword password={formik.values.password} functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.password} hasError={formik.errors.password} />

                                <Container className="forgot-pass-link">
                                    <Form.Group className="form-input-agreement" controlId="agree-term" style={{ display: "inline-block" }}>
                                        <div className="form-input-line">
                                            <Form.Check name="agreement" type="checkbox" control="checkbox" className="agree-term-box" style={{ display: "inline-block" }} />
                                            <Form.Label className="label-agree-term m-0">Remember Me</Form.Label>
                                        </div>
                                    </Form.Group>
                                    <Link to="/forgot" className="underline">Forgot Password?</Link>
                                </Container>

                                <Form.Group className="action_button">
                                    <ButtonNormal type="submit" name="login" id="Login" cName="form_submit m-0 ps-5 pe-5" value="Login" />
                                </Form.Group>

                                <Container className="signup-link text-center mt-5 mb-3">
                                    <Link to="/signup" className="underline">Signup for PCM</Link>
                                </Container>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Login;