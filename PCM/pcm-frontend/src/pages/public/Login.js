import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import { FormEmail, FormPassword, SignupButtons } from '../../components';
import { loginValidate } from '../../components/form-fields/validationMsg';

import '../../sass/public/login.scss';
import '../../components/form-fields/form_fields.scss';

import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

import LoginServices from '../../services/LoginServices';
import AuthServices from '../../services/AuthServices';

const validate = loginValidate;

const Login = () => {
    const [alert, setAlert] = useState("")

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validate,
        onSubmit: values => {
            //console.log(values);
            setAlert("");

            LoginServices.generateToken(values)
            .then(response => {
                //console.log("LOGIN SUCCESS -> ", response.data)
                LoginServices.setToken(response.data.token);

                AuthServices.getCurrentUser()
                .then(res => {
                    //console.log("GET CURRENT USER SUCCESS -> ", res.data);
                    AuthServices.setUser(res.data);

                    if(AuthServices.getUserRole() === "ADMIN") {
                        window.location = "/admin";
                    }
                    else if (AuthServices.getUserRole() === "NORMAL") {
                        window.location = "/user";
                    }
                    else {
                        LoginServices.logout();
                        window.location = "/login";
                    }
                })
                .catch(err => {
                    //console.log("GET CURRENT USER ERROR -> ", err.response);
                    setAlert(err.response.data.message);
                })
            })
            .catch(error => {
                //console.log("LOGIN ERROR -> ", error.response);
                setAlert(error.response.data.message);
            })
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

                            {alert && <Alert className="alert-user-already-exists" variant="danger">{alert}</Alert>}

                            <Form className="register-form" onSubmit={formik.handleSubmit} method="post" noValidate>
                                <FormEmail fieldName="username" email={formik.values.username} functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.username} hasError={formik.errors.username}/>
                                <FormPassword password={formik.values.password} functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.password} hasError={formik.errors.password}/>
                                
                                <Container className="forgot-pass-link">
                                    <Form.Group className="form-input-agreement" controlId="agree-term" style={{display:"inline-block"}}>
                                        <div className="form-input-line">
                                            <Form.Check name="agreement" type="checkbox"control="checkbox"className="agree-term-box" style={{display:"inline-block"}}/>
                                            <Form.Label className="label-agree-term m-0">Remember Me</Form.Label>
                                        </div>
                                    </Form.Group>
                                    <Link to="/forgot" className="underline">Forgot Password?</Link>
                                </Container>
                                
                                <Form.Group className="action_button">
                                    <SignupButtons type="submit" name="login" id="Login" cName="form_submit m-0 ps-5 pe-5" value="Login"/>
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

export default Login
