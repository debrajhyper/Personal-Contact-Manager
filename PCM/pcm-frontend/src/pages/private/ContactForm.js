import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import '../../components/form-fields/form_fields.scss';

import useForm from '../../validation/useForm';
import { excluded, contactValidate } from '../../validation/validationMsg';

import { FormAddress, FormName, FormEmail, RequiredStatement, FormCompany, FormCountry, FormDOB, FormMobileNo, FormNickName, FormProfilePic, FormRelationship, FormTags, ModalProfilePic, FormTelephoneNo, FormTitle, FormZodiacSign, FormWebsite, FormSocialLinks, FormNote, FormFavorite, ButtonNormal } from '../../components/index';
import { Row, Col, Form } from 'react-bootstrap';

const ContactForm = () => {
    const { loading } = useSelector(state => state.addContact);

    const {
        values,
        handleClick,
        handleEnter,
        handleChange,
        handleChangeFile, handleChangeFileCancel, handleChangeFileUpload,
        handleChangeMobileNumber,
        handleChangeTelephoneNumber,
        handleChangeSelect,
        handleChangeAddTags, handleChangeRemoveTags,
        handleChangeSocial,
        handleChangeNote,

        handleBlur,
        handleBlurMobileNumber,
        handleBlurTelephoneNumber,
        handleBlurSocial,

        handleReset,
        handleSubmit,
        uploadedFile, touched, errors
    } = useForm(contactValidate);
    const [modalProfilePicShow, setModalProfilePicShow] = useState(true);


    useEffect(() => {
        setModalProfilePicShow(true);
    }, [values.profilePic, touched.profilePic]);

    return (
        <Form onSubmit={handleSubmit} onReset={handleReset} className="contact-form" id="contact-form" method="post" encType="multipart/form-data" noValidate>
            <RequiredStatement />
            <Form.Group className="input-field-all position-relative">
                <Row>
                    <Col className='col-xl-3 col-sm-6 col-12'>
                        <Row className='d-flex flex-column align-items-center'>
                            <FormProfilePic profilePic={values?.profilePic} profilePicURL={values?.profilePicURL} uploadedFile={uploadedFile} cName="col-auto px-md-4" functionChange={handleChangeFile} excluded={excluded} hasTouched={touched.profilePic} hasError={errors.profilePic} />
                            <FormFavorite favorite={values?.favorite} cName="col-auto py-0 px-0" functionClick={handleClick} hasTouched={touched.favorite} hasError={errors.favorite} Mandatory={false} />
                        </Row>
                    </Col>
                    <Col className='col-xl-4 col-sm-6 col-12'>
                        <Row>
                            <FormName name={values?.name} cName="col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} functionKeyDown={handleEnter} excluded={excluded} hasTouched={touched.name} hasError={errors.name} Mandatory={true} />
                            <FormNickName nickName={values?.nickName} cName="col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} functionKeyDown={handleEnter} excluded={excluded} hasTouched={touched.nickName} hasError={errors.nickName} Mandatory={false} />
                            <FormTitle title={values?.title} cName="col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} functionKeyDown={handleEnter} excluded={excluded} hasTouched={touched.title} hasError={errors.title} Mandatory={false} />
                            <FormCompany company={values?.company} cName="col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} functionKeyDown={handleEnter} excluded={excluded} hasTouched={touched.company} hasError={errors.company} Mandatory={false} />
                        </Row>
                    </Col>
                    <Col className='upper-social-links col-xl-5 col-12 p-4'>
                        <fieldset>
                            <legend>Social Links</legend>
                            <Row className='py-xl-0 py-md-4'>
                                <FormSocialLinks socialLinks={values?.socialLinks} cName="col-xl-6 col-md-4 col-6 px-3" functionChange={handleChangeSocial} functionBlur={handleBlurSocial} functionKeyDown={handleEnter} excluded={excluded} hasTouched={touched.socialLinks} hasError={errors.socialLinks} Mandatory={false} />
                                <FormWebsite website={values?.website} cName="col-xl-6 col-md-4 col-6 px-3" functionChange={handleChange} functionBlur={handleBlur} functionKeyDown={handleEnter} excluded={excluded} hasTouched={touched.website} hasError={errors.website} Mandatory={false} />
                            </Row>
                        </fieldset>
                    </Col>
                </Row>
                <Row className='py-md-4'>
                    <FormEmail email={values?.email} cName="col-md-4 col-sm-6 col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} functionKeyDown={handleEnter} excluded={excluded} hasTouched={touched.email} hasError={errors.email} Mandatory={true} />
                    <FormMobileNo mobileNumber={values?.mobileNumber} countryCode={values.country?.no} cName="col-md-4 col-sm-6 col-12 px-sm-4" functionChange={handleChangeMobileNumber} functionBlur={handleBlurMobileNumber} functionKeyDown={handleEnter} excluded={excluded} hasTouched={touched.mobileNumber} hasError={errors.mobileNumber} Mandatory={true} />
                    <FormTelephoneNo telephoneNumber={values?.telephoneNumber} countryCode={values.country?.no} cName="col-md-4 col-sm-12 col-12 px-sm-4" functionChange={handleChangeTelephoneNumber} functionBlur={handleBlurTelephoneNumber} functionKeyDown={handleEnter} excluded={excluded} hasTouched={touched.telephoneNo} hasError={errors.telephoneNo} Mandatory={false} />
                </Row>
                <Row className='py-md-4'>
                    <FormCountry country={values?.country} cName="col-md-4 col-sm-6 col-12 px-sm-4" functionChange={(name, val) => handleChangeSelect(name, val)} functionBlur={handleBlur} functionKeyDown={handleEnter} excluded={excluded} hasTouched={touched.country} hasError={errors.country} Mandatory={false} />
                    <FormDOB dob={values?.dateOfBirth} cName="col-md-4 col-sm-6 col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} functionKeyDown={handleEnter} excluded={excluded} hasTouched={touched.dateOfBirth} hasError={errors.dateOfBirth} Mandatory={false} />
                    <FormAddress address={values?.address} cName="col-md-4 col-sm-12 col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} functionKeyDown={handleEnter} excluded={excluded} hasTouched={touched.address} hasError={errors.address} Mandatory={false} />
                </Row>
                <Row className='py-md-4'>
                    <FormRelationship relationship={values?.relationship} cName="col-md-4 col-sm-6 col-12 px-sm-4" functionChange={(name, val) => handleChangeSelect(name, val)} functionBlur={handleBlur} functionKeyDown={handleEnter} excluded={excluded} hasTouched={touched.relationship} hasError={errors.relationship} Mandatory={false} />
                    <FormZodiacSign zodiacSign={values?.zodiacSign} cName="col-md-4 col-sm-6 col-12 px-sm-4" functionChange={(name, val) => handleChangeSelect(name, val)} functionBlur={handleBlur} functionKeyDown={handleEnter} excluded={excluded} hasTouched={touched.zodiacSign} hasError={errors.zodiacSign} Mandatory={false} />
                    <FormTags tags={values?.tags} cName="col-md-4 col-sm-12 col-12 px-sm-4" functionAddTags={handleChangeAddTags} functionRemoveTags={handleChangeRemoveTags} handleSubmit={handleSubmit} functionKeyDown={handleEnter} excluded={excluded} hasTouched={touched.tags} hasError={errors.tags} Mandatory={false} />
                    <Col className='lower-social-links col-xl-5 col-12 p-2'>
                        <fieldset>
                            <legend>Social Links</legend>
                            <Row className='py-xl-0 py-md-4'>
                                <FormSocialLinks socialLinks={values?.socialLinks} cName="col-xl-6 col-md-4 col-6 px-3" functionChange={handleChangeSocial} functionBlur={handleBlurSocial} functionKeyDown={handleEnter} excluded={excluded} hasTouched={touched.socialLinks} hasError={errors.socialLinks} Mandatory={false} />
                                <FormWebsite website={values?.website} cName="col-xl-6 col-md-4 col-6 px-3" functionChange={handleChange} functionBlur={handleBlur} excluded={excluded} hasTouched={touched.website} functionKeyDown={handleEnter} hasError={errors.website} Mandatory={false} />
                            </Row>
                        </fieldset>
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <FormNote description={values?.description} cName="col-md-10 col-12 px-md-4" functionChange={handleChangeNote} hasTouched={touched.note} hasError={errors.note} Mandatory={false} />
                </Row>
            </Form.Group>
            <Form.Group className='action_button center pb-5'>
                <ButtonNormal type="submit" name="add-contact" id="ADD-Contact" cName="form_submit fill px-5 me-5" value="Save" loading={loading} />
                <ButtonNormal type="reset" name="reset" id="reset" cName="form_reset px-4" value="Reset" />
            </Form.Group>
            {
                values?.profilePic && values?.profilePicURL &&
                <ModalProfilePic modalProfilePicShow={modalProfilePicShow} setModalProfilePicShow={setModalProfilePicShow} profilePic={values.profilePic} profilePicURL={values.profilePicURL} functionCancel={handleChangeFileCancel} functionUpload={handleChangeFileUpload} hasError={errors.profilePic} />
            }
        </Form>
    )
}

export default ContactForm