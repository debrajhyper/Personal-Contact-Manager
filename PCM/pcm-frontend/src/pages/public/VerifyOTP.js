import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useFormik } from 'formik';

import { DASHBOARD_LINK } from '../../Route';

import { useSelector, useDispatch } from 'react-redux';
import { clearVerifyOTP, sendOTP, verifyOTP } from '../../services/index';

import { OtpValidate } from '../../validation/validationMsg';

import { FormOTP, ButtonNormal, Counter } from '../../components/index';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

const VerifyOTP = () => {
    useDocumentTitle('Verify OTP');
    const { isLoggedIn } = useSelector(state => state.auth);
    const { sendOTPMessage, generatedOTP, email, maxInActiveInterval } = useSelector(state => state.sendOTP);
    const { loading, verifiedOTP, verifyOTPError } = useSelector(state => state.verifyOTP);
    
    const validate = OtpValidate;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || DASHBOARD_LINK;
    
    const [timeRemaining, setTimeRemaining] = useState(maxInActiveInterval);

    const formik = useFormik({
        initialValues: {
            otp: "",
        },
        validate,
        onSubmit: values => {
            dispatch(verifyOTP(email, values.otp, generatedOTP));
        },
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate(from, { replace: true });
        }
    }, [isLoggedIn, navigate, from]);
    
    useEffect(() => {
        if(email === "") {
            navigate("/forgot-password");
        }
    }, [email, navigate]);

    useEffect(() => {
        if(verifiedOTP) {
            navigate("/reset-password");
        }
    }, [verifiedOTP, navigate]);

    useEffect(() => {
        dispatch(clearVerifyOTP());
    }, [dispatch])

    useEffect(() => {
        if(timeRemaining <= 0) {
            dispatch(clearVerifyOTP());
        }
    }, [timeRemaining, dispatch])
    
    useEffect(() => {
        setTimeRemaining(maxInActiveInterval);
    }, [maxInActiveInterval])
    
    const resendOTP = (e) => {
        e.preventDefault();
        dispatch(sendOTP(email));
    }

    return (
        <section className="login">
            <Container className="form-container" fluid>
                <Row className="login-content">
                    <Col className="login-form">

                        <Container className="text d-flex flex-column justify-content-center align-items-center mt-3">
                            <h2 className="form-title">OTP Verification</h2>
                        </Container>

                        {
                            verifyOTPError 
                            ? <Alert className="alert-user-already-exists" variant="danger">{verifyOTPError}</Alert>
                            : sendOTPMessage && <Alert className="alert-user-already-exists" variant="success">{sendOTPMessage}</Alert>
                        }

                        <Container className='details pt-4 p-2'>
                            <h5 className='m-0'>A One Time Passcode has been sent to <strong>{email}</strong></h5>
                            <br/>
                            <p className='m-0'> 
                                Please enter the OTP below to verify your Email Address. If you 
                                cannot see the email from "projectnotification2021" in your inbox,
                                make sure to check your SPAM folder.
                            </p>
                        </Container>
                        
                        <Form className="register-form" onSubmit={formik.handleSubmit} method="post" noValidate>
                            <FormOTP otp={formik.values?.otp} functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.otp} hasError={formik.errors.otp} Mandatory={true} />
                            
                            <Form.Group className='resend-otp'>
                                <h5 className={`${maxInActiveInterval !== 0 ? 'disabled' : ''}`} onClick={(e) => resendOTP(e)}>Resend OTP</h5>
                                <Counter timeRemaining={timeRemaining} setTimeRemaining={setTimeRemaining} />
                            </Form.Group>

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

export default VerifyOTP