import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';
import { clearContactMeEmail, sendContactMeEmail } from '../../services/index';

import contactImage from '../../img/contact-me.gif';
import './contact_me_section.scss';

import { contactMeValidation } from '../../validation/validationMsg';

import FormName from '../form-fields/FormName';
import FormEmail from '../form-fields/FormEmail';
import FormTextarea from '../form-fields/FormTextarea';
import ButtonNormal from '../buttons/ButtonNormal';
import { Col, Container, Row, Image, Form } from 'react-bootstrap';

const ContactMeSection = ({ sectionRef }) => {
    const { loading, contactMeMailSend } = useSelector(state => state.contactMe);

    const contactMeForm = useRef();
    const validate = contactMeValidation;
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            comment: ""
        },
        validate,
        onSubmit: values => {
            if(values.comment !== "") {
                dispatch(sendContactMeEmail(contactMeForm.current));
            }
            else {
                toast.info("Your thoughts would be appreciated 🤗");
            }
        },
    });

    useEffect(() => {
        if (contactMeMailSend === true) {
            formik.resetForm();
            dispatch(clearContactMeEmail());
        }
    }, [contactMeMailSend, dispatch, formik]);

    return (
        <section className='contact' id='Contact-me' ref={sectionRef}>
            <Container>
                <div className='text'>
                    <span>Contact Me</span>
                    <h1>Questions? Get In Touch</h1>
                </div>
                <Row>
                    <Col className='left'>
                        <div className='img_container'>
                            <Image src={contactImage} alt="" />
                        </div>
                    </Col>
                    <Col className='right' xl={7} lg={8} md={12}>
                        <Form className="contact-form" ref={contactMeForm} onSubmit={formik.handleSubmit} method="post" noValidate>
                            <FormName name={formik.values.name} functionChange={formik.handleChange} functionBlur={formik.handleBlur}  hasTouched={formik.touched.name} hasError={formik.errors.name} Mandatory={true} />
                            <FormEmail email={formik.values.email} functionChange={formik.handleChange} functionBlur={formik.handleBlur} hasTouched={formik.touched.email} hasError={formik.errors.email} Mandatory={true} />
                            <FormTextarea description={formik.values.comment} functionChange={formik.handleChange} name="comment" height="180px" label="Your Thought"/>
                            <Form.Group className="action_button mt-1">
                                <ButtonNormal type="submit" name="send" id="Send" cName="form_submit fill px-5" value="Send" loading={loading} />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ContactMeSection