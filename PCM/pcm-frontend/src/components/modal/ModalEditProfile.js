import React, { useState, useEffect } from 'react'

import { FormName, FormEmail, RequiredStatement, FormCountry, FormDOB, FormMobileNo, FormProfilePic, ModalProfilePic, FormZodiacSign, FormWebsite, FormSocialLinks, FormNote, ButtonNormal } from '../../components';
import { contactValidate } from '../../components/form-fields/validationMsg';
import useForm from '../../components/form-fields/useForm';

import './modal.scss';
import '../../components/form-fields/form_fields.scss';

import { Modal, Row, Col, Form } from 'react-bootstrap';

const ModalEditProfile = ({ modalEditProfile, handleModalEditProfile }) => {
    const { values, handleChange, handleChangeSelect, handleChangeFile, handleChangeFileCancel, handleChangeFileUpload, handleChangeSocial, handleChangeNote, handleBlur, handleBlurSocial, handleReset, handleSubmit, uploadedFile, touched, errors } = useForm(contactValidate);
    const [modalProfilePicShow, setModalProfilePicShow] = useState(true);

    useEffect(() => {
        setModalProfilePicShow(true);
    }, [values.profilePic]);

    return (
        <Modal className='edit-profile' dialogClassName='EditProfile' show={modalEditProfile} onHide={handleModalEditProfile} centered animation={true} autoFocus={true} id="modal">
            <Form onSubmit={handleSubmit} className="contact-form" id="contact-form" action="/user/process_contact" method="post" noValidate>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="flex-prop editProfile">
                    <RequiredStatement />
                    <Form.Group className="input-field-all w-100 position-relative">
                        <Row className='d-flex justify-content-center'>
                            <Col className='col-xl-auto col-sm-6 col-12'>
                                <Row className='d-flex flex-column align-items-center'>
                                    <FormProfilePic profilePic={values.profilePic} profilePicURL={values.profilePicURL} uploadedFile={uploadedFile} cName="col-auto px-md-4" functionChange={handleChangeFile} hasTouched={touched.profilePic} hasError={errors.profilePic} />
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row className='py-1'>
                                    <FormName name={values.name} cName="col-sm-6 col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.name} hasError={errors.name} Mandatory={true} />
                                    <FormEmail email={values.email} cName="col-sm-6 col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.email} hasError={errors.email} Mandatory={true} />
                                </Row>
                                <Row className='py-2'>
                                    <FormMobileNo mobileNo={values.mobileNo} countryCode={values.country?.no} cName="col-sm-6 col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.mobileNo} hasError={errors.mobileNo} Mandatory={true} />
                                    <FormCountry country={values.country} cName="col-sm-6 col-12 px-sm-4" functionChange={(name, val) => handleChangeSelect(name, val)} functionBlur={handleBlur} hasTouched={touched.country} hasError={errors.country} Mandatory={false} />
                                </Row>
                                <Row className='py-1'>
                                    <FormDOB dob={values.dob} cName="col-sm-6 col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.dob} hasError={errors.dob} Mandatory={false} />
                                    <FormZodiacSign zodiacSign={values.zodiacSign} cName="col-sm-6 col-12 px-sm-4" functionChange={(name, val) => handleChangeSelect(name, val)} functionBlur={handleBlur} hasTouched={touched.zodiacSign} hasError={errors.zodiacSign} Mandatory={false} />
                                </Row>
                            </Col>
                            <Col className='social-links col-xl-5 col-12 p-sm-2 p-0'>
                                <fieldset>
                                    <legend>Social Links</legend>
                                    <Row className='py-xl-0 py-md-2'>
                                        <FormSocialLinks socialLinks={values.socialLinks} cName="col-xl-6 col-md-4 col-6 px-3" functionChange={handleChangeSocial} functionBlur={handleBlurSocial} hasTouched={touched.socialLinks} hasError={errors.socialLinks} Mandatory={false} />
                                        <FormWebsite website={values.website} cName="col-xl-6 col-md-4 col-6 px-3" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.website} hasError={errors.website} Mandatory={false} />
                                    </Row>
                                </fieldset>
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <FormNote note={values.note} cName="col-xl-10 col-12 px-md-4" functionChange={handleChangeNote} hasTouched={touched.note} hasError={errors.note} Mandatory={false} />
                        </Row>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="action_button justify-content-evenly pb-5 pt-2 m-0">
                    <div className='three d-flex justify-content-evenly'>
                        <ButtonNormal type='reset' name='cancelBtn' id='CancelBtn' cName='btn form_reset red' value='Cancel' action={handleModalEditProfile} />
                        <ButtonNormal type="reset" name="reset" id="reset" cName="form_reset px-4" value="Reset" action={handleReset} />
                        <ButtonNormal type="submit" name="add-contact" id="ADD-Contact" cName="form_submit px-5" value="Save" action={handleSubmit} />
                    </div>
                </Modal.Footer>
                {
                    values.profilePic && values.profilePicURL &&
                    <ModalProfilePic modalProfilePicShow={modalProfilePicShow} setModalProfilePicShow={setModalProfilePicShow} profilePic={values.profilePic} profilePicURL={values.profilePicURL} functionCancel={handleChangeFileCancel} functionUpload={handleChangeFileUpload} hasError={errors.profilePic} />
                }
            </Form>
        </Modal>
    )
}

export default ModalEditProfile