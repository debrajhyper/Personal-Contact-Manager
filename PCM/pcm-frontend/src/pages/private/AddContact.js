import React, { useState, useEffect } from 'react'

import { Header, FormAddress, FormName, FormEmail, RequiredStatement, FormCompany, FormCountry, FormDOB, FormMobileNo, FormNickName, FormProfilePic, FormRelationship, FormTags, ModalProfilePic, FormTelephoneNo, FormTitle, FormZodiacSign, FormWebsite, FormSocialLinks, FormNote, FormFavorite } from '../../components';
import { contactValidate } from '../../components/form-fields/validationMsg';
import useForm from '../../components/form-fields/useForm';

import HeaderImg from '../../img/pcm_add_contact.png';

import '../../components/form-fields/form_fields.scss';

import { Container, Row, Col, Form } from 'react-bootstrap';

const AddContact = () => {

    const { values, handleClick, handleChange, handleChangeSelect, handleChangeFile, handleChangeFileCancel, handleChangeFileUpload, handleChangeRemoveTags, handleChangeAddTags, handleChangeSocial, handleChangeNote, handleBlur, handleBlurSocial, handleSubmit,  uploadedFile, touched, errors } = useForm(contactValidate);
    const [modalProfilePicShow, setModalProfilePicShow] = useState(true);

    useEffect(() => {
        setModalProfilePicShow(true);
    }, [values.profilePic]);

    return (
        <Container fluid className='add-contact'>
            <Header image={HeaderImg} text={'Add Contact'} />

            <Row className="mx-auto b">
                <Col md={8} className="mx-auto b">

                    <Form onSubmit={handleSubmit} className="contact-form" id="contact-form" action="/user/process_contact" method="post" noValidate>
                        <RequiredStatement />
                        <Form.Group className="input-field-all position-relative">
                            <Row className="m-2 b">

                                <FormName name={values.name} cName="col-6 px-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.name} hasError={errors.name} Mandatory={true} />
                                <FormEmail email={values.email} cName="col-6 px-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.email} hasError={errors.email} Mandatory={true} />
                                <FormAddress address={values.address} cName="col-6 px-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.address} hasError={errors.address} Mandatory={false} />
                                <FormCompany company={values.company} cName="col-6 px-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.company} hasError={errors.company} Mandatory={false} />
                                <FormCountry country={values.country} cName="col-6 px-4" functionChange={(name, val) => handleChangeSelect(name, val)} functionBlur={handleBlur} hasTouched={touched.country} hasError={errors.country} Mandatory={false} />
                                <FormDOB dob={values.dob} cName="col-6 px-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.dob} hasError={errors.dob} Mandatory={false} />
                                <FormMobileNo mobileNo={values.mobileNo} countryCode={values.country?.no} cName="col-6 px-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.mobileNo} hasError={errors.mobileNo} Mandatory={true} />
                                <FormTelephoneNo telephoneNo={values.telephoneNo} countryCode={values.country?.no} cName="col-6 px-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.telephoneNo} hasError={errors.telephoneNo} Mandatory={false} />
                                <FormNickName nickName={values.nickName} cName="col-6 px-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.nickName} hasError={errors.nickName} Mandatory={false} />
                                <FormProfilePic profilePic={values.profilePic} profilePicURL={values.profilePicURL} uploadedFile={uploadedFile} cName="col-6 px-4" functionChange={handleChangeFile} hasTouched={touched.profilePic} hasError={errors.profilePic} />
                                <FormRelationship relationship={values.relationship} cName="col-6 px-4" functionChange={(name, val) => handleChangeSelect(name, val)} functionBlur={handleBlur} hasTouched={touched.relationship} hasError={errors.relationship} Mandatory={false} />
                                <FormTags tags={values.tags} cName="col-6 px-4" functionAddTags={handleChangeAddTags} functionRemoveTags={handleChangeRemoveTags} hasTouched={touched.tags} hasError={errors.tags} Mandatory={false} />
                                <FormTitle title={values.title} cName="col-6 px-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.title} hasError={errors.title} Mandatory={false} />
                                <FormZodiacSign zodiacSign={values.zodiacSign} cName="col-6 px-4" functionChange={(name, val) => handleChangeSelect(name, val)} functionBlur={handleBlur} hasTouched={touched.zodiacSign} hasError={errors.zodiacSign} Mandatory={false} />
                                <FormWebsite website={values.website} cName="col-6 px-4" functionChange={handleChange} functionBlur={handleBlur} hasTouched={touched.website} hasError={errors.website} Mandatory={false} />
                                <FormSocialLinks socialLinks={values.socialLinks} cName="col-6 px-4" functionChange={handleChangeSocial} functionBlur={handleBlurSocial} hasTouched={touched.socialLinks} hasError={errors.socialLinks} Mandatory={false} />
                                <FormFavorite favorite={values.favorite} cName="col-6 px-4" functionClick={handleClick} hasTouched={touched.favorite} hasError={errors.favorite} Mandatory={false} />
                                <FormNote note={values.note} cName="col-6 px-4" functionChange={handleChangeNote} hasTouched={touched.note} hasError={errors.note} Mandatory={false} />
                                
                            </Row>
                        </Form.Group>

                        <div className="text-center mt-2">
                            <div className="form-button">
                                <button type="submit" className="form-submit" >Save</button>
                            </div>
                        </div>

                    </Form>

                </Col>
            </Row>
            {
                values.profilePic && values.profilePicURL &&
                <ModalProfilePic modalProfilePicShow={modalProfilePicShow} setModalProfilePicShow={setModalProfilePicShow} profilePic={values.profilePic} profilePicURL={values.profilePicURL} functionCancel={handleChangeFileCancel} functionUpload={handleChangeFileUpload} hasError={errors.profilePic} />
            }
        </Container>


    )
}

export default AddContact