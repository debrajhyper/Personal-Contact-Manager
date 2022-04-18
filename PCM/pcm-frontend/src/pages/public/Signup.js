import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { ToastContainer } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../services/index';

import { FormName, FormEmail, FormPassword, FormTextarea, FormAgrement, ButtonNormal, RequiredStatement } from '../../components/index';
import { signupValidate } from '../../validation/validationMsg';

import guest_signup_register from '../../img/guest_signup_register.png';
import guest_signup_register_left from '../../img/guest_signup_register_left.png';

import '../../sass/public/signup.scss';
import '../../components/form-fields/form_fields.scss';

import { Container, Image, Form, Row, Col, Alert } from 'react-bootstrap';

const validate = signupValidate;

const Signup = () => {
    const auth = useSelector(state => state.auth);
    const userRegister = useSelector(state => state.register);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

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
            dispatch(registerUser(values));
        },
    });

    useEffect(() => {
        if (userRegister.isRegistered === true && userRegister.status === 200) {
            formik.resetForm();
        }
        if (auth.isLoggedIn) {
            navigate(from, { replace: true });
        }
    }, [auth, userRegister]);

    return (
        <>
            <section className="public_pages signup">

                <ToastContainer
                    theme='colored'
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                <Container className="form-container" fluid>
                    <Row className="signup-content">
                        <Col className="signup-form" sm={6} xs={12}>

                            <Container className="text d-flex justify-content-start align-items-end">
                                <Image className="header_img" src={guest_signup_register} alt="Register" />
                                <h2 className="form-title">Register Here</h2>
                            </Container>

                            {userRegister?.registerError && <Alert className="alert-user-already-exists" variant="danger">{userRegister.registerError}</Alert>}

                            <Form className="register-form" onSubmit={formik.handleSubmit} method="post" noValidate>
                                <RequiredStatement />
                                <FormName name={formik.values.name} functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.name} hasError={formik.errors.name} Mandatory={true} />
                                <FormEmail email={formik.values.email} functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.email} hasError={formik.errors.email} Mandatory={true} />
                                <FormPassword password={formik.values.password} functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.password} hasError={formik.errors.password} Mandatory={true} />
                                <FormTextarea about={formik.values.about} functionChange={formik.handleChange} />
                                <FormAgrement agreement={formik.values.agreement} functionChange={formik.handleChange} hasTouched={formik.touched.agreement} hasError={formik.errors.agreement} Mandatory={true} />
                                <Form.Group className="action_button">
                                    <ButtonNormal type="submit" name="signup" id="Signup" cName="form_submit" value="Register" loading={userRegister.loading} />
                                    <ButtonNormal type="reset" name="reset" id="reset" cName="form_reset" value="Reset" action={formik.resetForm} />
                                </Form.Group>
                            </Form>

                        </Col>
                        <Col className="signup_image text-center">
                            <Image className="reg_left" src={guest_signup_register_left} alt="sing up" />
                            <Link to="/login" className="signup-image-link underline">I am already a member</Link>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Signup