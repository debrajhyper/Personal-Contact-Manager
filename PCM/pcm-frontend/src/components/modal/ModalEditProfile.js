import React, { useState, useEffect } from 'react';

import './modal.scss';
import '../../components/form-fields/form_fields.scss';

import useForm from '../../validation/useForm';
import { userValidate } from '../../validation/validationMsg';

import { FormName, FormEmail, RequiredStatement, FormCountry, FormDOB, FormMobileNo, FormProfilePic, ModalProfilePic, FormZodiacSign, FormWebsite, FormSocialLinks, FormNote, ButtonNormal } from '../../components/index';
import { Modal, Row, Col, Form } from 'react-bootstrap';

const ModalEditProfile = ({ modalEditProfile, handleModalEditProfile }) => {
    const {
        values,
        handleChange,
        handleChangeFile, handleChangeFileCancel, handleChangeFileUpload,
        handleChangeMobileNumber,
        handleChangeSelect,
        handleChangeSocial,
        handleChangeNote,

        handleBlur,
        handleBlurMobileNumber,
        handleBlurSocial,

        handleReset,
        handleSubmit,
        uploadedFile, touched, errors,
        profileEdit, setProfileEdit
    } = useForm(userValidate);

    const [modalProfilePicShow, setModalProfilePicShow] = useState(true);

    useEffect(() => {
        setModalProfilePicShow(true);
    }, [values.profilePic, touched.profilePic]);

    useEffect(() => {
        if (modalEditProfile) {
            setProfileEdit(true);
        } else {
            setProfileEdit(false);
        }
    }, [profileEdit, setProfileEdit, modalEditProfile]);

    return (
        <Modal className='edit-profile' dialogClassName='EditProfile' show={modalEditProfile} onHide={handleModalEditProfile} centered animation={true} autoFocus={true} id="modal">
            <Form onSubmit={handleSubmit} onReset={handleReset} className="contact-form" id="contact-form" method="post" encType="multipart/form-data" noValidate>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="flex-prop editProfile">
                    <RequiredStatement />
                    <Form.Group className="input-field-all w-100 position-relative">
                        <Row className='d-flex justify-content-center'>
                            <Col className='col-xl-auto col-sm-6 col-12'>
                                <Row className='d-flex flex-column align-items-center'>
                                    <FormProfilePic profilePic={values?.profilePic} profilePicURL={values?.profilePicURL} uploadedFile={uploadedFile} cName="col-auto px-md-4" functionChange={handleChangeFile} hasTouched={touched?.profilePic} hasError={errors?.profilePic} />
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row className='py-1'>
                                    <FormName name={values?.name} cName="col-sm-6 col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched?.name} hasError={errors?.name} Mandatory={true} />
                                    <FormEmail email={values?.email} cName="col-sm-6 col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched?.email} hasError={errors?.email} Mandatory={true} />
                                </Row>
                                <Row className='py-2'>
                                    <FormMobileNo mobileNumber={values?.mobileNumber} countryCode={values?.country?.no} cName="col-sm-6 col-12 px-sm-4" functionChange={handleChangeMobileNumber} functionBlur={handleBlurMobileNumber} hasTouched={touched?.mobileNumber} hasError={errors?.mobileNumber} Mandatory={false} />
                                    <FormCountry country={values?.country} cName="col-sm-6 col-12 px-sm-4" functionChange={(name, val) => handleChangeSelect(name, val)} functionBlur={handleBlur} hasTouched={touched?.country} hasError={errors?.country} Mandatory={false} />
                                </Row>
                                <Row className='py-1'>
                                    <FormDOB dob={values?.dateOfBirth} cName="col-sm-6 col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched?.dateOfBirth} hasError={errors?.dateOfBirth} Mandatory={false} />
                                    <FormZodiacSign zodiacSign={values?.zodiacSign} cName="col-sm-6 col-12 px-sm-4" functionChange={(name, val) => handleChangeSelect(name, val)} functionBlur={handleBlur} hasTouched={touched?.zodiacSign} hasError={errors?.zodiacSign} Mandatory={false} />
                                </Row>
                            </Col>
                            <Col className='social-links col-xl-5 col-12 p-sm-2 p-0'>
                                <fieldset>
                                    <legend>Social Links</legend>
                                    <Row className='py-xl-0 py-md-2'>
                                        <FormSocialLinks socialLinks={values?.socialLinks} cName="col-xl-6 col-md-4 col-6 px-3" functionChange={handleChangeSocial} functionBlur={handleBlurSocial} hasTouched={touched?.socialLinks} hasError={errors?.socialLinks} Mandatory={false} />
                                        <FormWebsite website={values?.website} cName="col-xl-6 col-md-4 col-6 px-3" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched?.website} hasError={errors?.website} Mandatory={false} />
                                    </Row>
                                </fieldset>
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <FormNote description={values?.description} cName="col-xl-10 col-12 px-md-4" functionChange={handleChangeNote} hasTouched={touched?.description} hasError={errors?.description} Mandatory={false} />
                        </Row>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="action_button center pb-5 m-0">
                    <div className='three d-flex justify-content-evenly'>
                        <ButtonNormal type="submit" name="add-contact" id="ADD-Contact" cName="form_submit fill px-5" value="Save" action={handleSubmit} />
                        <ButtonNormal type="reset" name="reset" id="reset" cName="form_reset px-4" value="Reset" action={handleReset} />
                        <ButtonNormal type='reset' name='cancelBtn' id='CancelBtn' cName='form_cancel danger' value='Cancel' action={handleModalEditProfile} />
                    </div>
                </Modal.Footer>
                {
                    values?.profilePic && values?.profilePicURL &&
                    <ModalProfilePic modalProfilePicShow={modalProfilePicShow} setModalProfilePicShow={setModalProfilePicShow} profilePic={values.profilePic} profilePicURL={values.profilePicURL} functionCancel={handleChangeFileCancel} functionUpload={handleChangeFileUpload} hasError={errors.profilePic} />
                }
            </Form>
        </Modal>
    )
}

export default ModalEditProfile