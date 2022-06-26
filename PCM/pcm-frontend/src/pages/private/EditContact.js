import React, { useState, useEffect } from 'react'

import { FormAddress, FormName, FormEmail, RequiredStatement, FormCompany, FormCountry, FormDOB, FormMobileNo, FormNickName, FormProfilePic, FormRelationship, FormTags, ModalProfilePic, FormTelephoneNo, FormTitle, FormZodiacSign, FormWebsite, FormSocialLinks, FormNote, FormFavorite, ButtonNormal } from '../../components/index';
import { contactValidate } from '../../validation/validationMsg';
import useForm from '../../validation/useForm';

import '../../components/form-fields/form_fields.scss';

import { Row, Col, Form } from 'react-bootstrap';

const EditContact = () => {
    const { values, handleClick, handleChange,handleChangeTelephoneNumber,handleBlurTelephoneNumber,handleChangeCountry, handleChangeSelect, handleChangeFile, handleChangeFileCancel, handleChangeFileUpload, handleChangeRemoveTags, handleChangeAddTags, handleChangeSocial, handleChangeNote, handleBlur, handleBlurSocial, handleReset, handleSubmit, uploadedFile, touched, errors } = useForm(contactValidate);
    const [modalProfilePicShow, setModalProfilePicShow] = useState(true);

    useEffect(() => {
        setModalProfilePicShow(true);
    }, [values.profilePic]);

    console.log(values);
    return (
        <Form onSubmit={handleSubmit} className="contact-form" id="contact-form" action="/add-contact" method="post" encType="multipart/form-data" noValidate>
            <RequiredStatement />
            <Form.Group className="input-field-all position-relative">
                <Row>
                    <Col className='col-xl-3 col-sm-6 col-12'>
                        <Row className='d-flex flex-column align-items-center'>
                            <FormProfilePic profilePic={values.profilePic} profilePicURL={values.profilePicURL} uploadedFile={uploadedFile} cName="col-auto px-md-4" functionChange={handleChangeFile} hasTouched={touched.profilePic} hasError={errors.profilePic} />
                            <FormFavorite favorite={values.favorite} cName="col-auto py-0 px-0" functionClick={handleClick} hasTouched={touched.favorite} hasError={errors.favorite} Mandatory={false} />
                        </Row>
                    </Col>
                    <Col className='col-xl-4 col-sm-6 col-12'>
                        <Row>
                            <FormName name={values.name} cName="col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.name} hasError={errors.name} Mandatory={true} />
                            <FormNickName nickName={values.nickName} cName="col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.nickName} hasError={errors.nickName} Mandatory={false} />
                            <FormTitle title={values.title} cName="col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.title} hasError={errors.title} Mandatory={false} />
                            <FormCompany company={values.company} cName="col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.company} hasError={errors.company} Mandatory={false} />
                        </Row>
                    </Col>
                    <Col className='upper-social-links col-xl-5 col-12 p-4'>
                        <fieldset>
                            <legend>Social Links</legend>
                            <Row className='py-xl-0 py-md-4'>
                                <FormSocialLinks socialLinks={values.socialLinks} cName="col-xl-6 col-md-4 col-6 px-3" functionChange={handleChangeSocial} functionBlur={handleBlurSocial} hasTouched={touched.socialLinks} hasError={errors.socialLinks} Mandatory={false} />
                                <FormWebsite website={values.website} cName="col-xl-6 col-md-4 col-6 px-3" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.website} hasError={errors.website} Mandatory={false} />
                            </Row>
                        </fieldset>
                    </Col>
                </Row>
                <Row className='py-md-4'>
                    <FormEmail email={values.email} cName="col-md-4 col-sm-6 col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.email} hasError={errors.email} Mandatory={true} />
                    {/* <FormMobileNo mobileNo={values.mobileNumber} countryCode={values.country?.no} cName="col-md-4 col-sm-6 col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.mobileNo} hasError={errors.mobileNo} Mandatory={true} /> */}
                    <FormTelephoneNo telephoneNumber={values.telephoneNumber} countryCode={values.country?.no} cName="col-md-4 col-sm-12 col-12 px-sm-4" functionChange={handleChangeTelephoneNumber} functionBlur={handleBlurTelephoneNumber} hasTouched={touched.telephoneNo} hasError={errors.telephoneNo} Mandatory={false} />
                </Row>
                <Row className='py-md-4'>
                    <FormCountry country={values.country} cName="col-md-4 col-sm-6 col-12 px-sm-4" functionChange={(name, val) => handleChangeSelect(name, val)} functionBlur={handleBlur} hasTouched={touched.country} hasError={errors.country} Mandatory={false} />
                    <FormDOB dob={values.dateOfBirth} cName="col-md-4 col-sm-6 col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.dateOfBirth} hasError={errors.dateOfBirth} Mandatory={false} />
                    <FormAddress address={values.address} cName="col-md-4 col-sm-12 col-12 px-sm-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.address} hasError={errors.address} Mandatory={false} />
                </Row>
                <Row className='py-md-4'>
                    <FormRelationship relationship={values.relationship} cName="col-md-4 col-sm-6 col-12 px-sm-4" functionChange={(name, val) => handleChangeSelect(name, val)} functionBlur={handleBlur} hasTouched={touched.relationship} hasError={errors.relationship} Mandatory={false} />
                    <FormZodiacSign zodiacSign={values.zodiacSign} cName="col-md-4 col-sm-6 col-12 px-sm-4" functionChange={(name, val) => handleChangeSelect(name, val)} functionBlur={handleBlur} hasTouched={touched.zodiacSign} hasError={errors.zodiacSign} Mandatory={false} />
                    <FormTags tags={values.tags} cName="col-md-4 col-sm-12 col-12 px-sm-4" functionAddTags={handleChangeAddTags} functionRemoveTags={handleChangeRemoveTags} hasTouched={touched.tags} hasError={errors.tags} Mandatory={false} />
                    <Col className='lower-social-links col-xl-5 col-12 p-2'>
                        <fieldset>
                            <legend>Social Links</legend>
                            <Row className='py-xl-0 py-md-4'>
                                <FormSocialLinks socialLinks={values.socialLinks} cName="col-xl-6 col-md-4 col-6 px-3" functionChange={handleChangeSocial} functionBlur={handleBlurSocial} hasTouched={touched.socialLinks} hasError={errors.socialLinks} Mandatory={false} />
                                <FormWebsite website={values.website} cName="col-xl-6 col-md-4 col-6 px-3" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.website} hasError={errors.website} Mandatory={false} />
                            </Row>
                        </fieldset>
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <FormNote description={values.description} cName="col-md-10 col-12 px-md-4" functionChange={handleChangeNote} hasTouched={touched.note} hasError={errors.note} Mandatory={false} />
                </Row>
            </Form.Group>
            <Form.Group className='action_button d-flex justify-content-center align-items-center pb-5'>
                <ButtonNormal type="reset" name="reset" id="reset" cName="form_reset px-4" value="Reset" action={handleReset} />
                <ButtonNormal type="submit" name="add-contact" id="ADD-Contact" cName="form_submit px-5" value="Save" action={handleSubmit} />
            </Form.Group>
            {
                values.profilePic && values.profilePicURL &&
                <ModalProfilePic modalProfilePicShow={modalProfilePicShow} setModalProfilePicShow={setModalProfilePicShow} profilePic={values.profilePic} profilePicURL={values.profilePicURL} functionCancel={handleChangeFileCancel} functionUpload={handleChangeFileUpload} hasError={errors.profilePic} />
            }
        </Form>
    )
}

export default EditContact