import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useFormik } from 'formik';

import { DASHBOARD_LINK, FORGOT_PASSWORD_LINK, LOGIN_LINK } from '../../Route';

import { useSelector, useDispatch } from 'react-redux';
import { resetPassword } from '../../services/index';

import { passwordValidation } from '../../validation/validationMsg';

import { ButtonNormal, FormPassword } from '../../components/index';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

const ResetPassword = () => {
    useDocumentTitle('Reset Password');
    const { isLoggedIn } = useSelector(state => state.auth);
    const { email } = useSelector(state => state.sendOTP);
    const { verifiedOTP } = useSelector(state => state.verifyOTP);
    const { loading, passwordReset, resetPasswordError } = useSelector(state => state.resetPassword)

    const validate = passwordValidation;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || DASHBOARD_LINK;

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validate,
        onSubmit: values => {
            dispatch(resetPassword(email, values?.confirmPassword));
        },
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate(from, { replace: true });
        }
    }, [isLoggedIn, navigate, from]);

    useEffect(() => {
        if (passwordReset) {
            navigate(LOGIN_LINK)
        }
    }, [passwordReset, navigate])

    useEffect(() => {
        if (email === "" || verifiedOTP === false) {
            navigate(FORGOT_PASSWORD_LINK);
        }
    }, [email, verifiedOTP, navigate]);

    return (
        <section className="login">
            <Container className="form-container" fluid>
                <Row className="login-content">
                    <Col className="login-form">

                        <Container className="text d-flex flex-column justify-content-center align-items-center mt-3">
                            <h2 className="form-title">Reset Password</h2>
                        </Container>

                        {
                            resetPasswordError && <Alert className="alert-user-already-exists" variant="danger">{resetPasswordError}</Alert>
                        }

                        <Container className='details pt-4 p-2'>
                            <h5 className='m-0'>In order to <strong>protect your account,</strong> make sure your password:</h5>
                            <br />
                            <ul>
                                <li>Is longer than 7 characters.</li>
                                <li>Does not match or significantly contain your username, e.g. do not use 'username123'.</li>
                                <li>Is not a member of this <strong><a href='https://en.wikipedia.org/wiki/List_of_the_most_common_passwords' target="blank">list of common passwords</a>  </strong>.</li>
                                <li>Is not a member of the <strong><a href='https://haveibeenpwned.com/Passwords' target="blank">Have I Been Pwned</a></strong> breach database.</li>
                            </ul>
                        </Container>

                        <Form className="register-form" onSubmit={formik.handleSubmit} method="post" noValidate>
                            <FormPassword label="New Password" name="password" password={formik.values?.password} functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.password} hasError={formik.errors.password} Mandatory={true} />
                            <FormPassword label="Confirm New Password" name="confirmPassword" password={formik.values?.confirmPassword} functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.confirmPassword} hasError={formik.errors.confirmPassword} Mandatory={true} />

                            <Form.Group className="action_button center">
                                <ButtonNormal type="submit" name="otp" id="Otp" cName="form_submit fill px-5" value="Verify OTP" loading={loading} />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ResetPassword