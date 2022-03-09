import React, { useState} from 'react'

import { Header, FormAddress, FormName, FormEmail, FormTextarea, RequiredStatement, FormCompany, FormCountry, FormDOB, FormMobileNo, FormNickName, FormProfilePic } from '../../components';

import HeaderImg from '../../img/pcm_add_contact.png';

import { Container, Row, Col, Form } from 'react-bootstrap';

const AddContact = () => {
    const [value, setValue] = useState(null)
    console.log(value)
    return (
        <Container fluid className='add-contact'>
            <Header image={HeaderImg} text={'Add Contact'} />

            <Row className="mx-auto b">
                <Col md={8} className="mx-auto b">

                    <Form className="contact-form" id="contact-form" action="/user/process_contact" method="post">
                        <RequiredStatement />
                        <Form.Group className="input-field-all position-relative">
                            <Row className="m-2 b">
                                {/* <div className="form-group form-input col-6">
                                        <input name="name" type="text" id="Name" required />
                                        <label for="Name" className="form-label"><i className="fas fa-user me-2"></i>Name</label>
                                        <span className="e_msg error_form ms-2 ps-1" id="name_error_message"></span>
                                    </div> */}
                                <FormName name={''} cName="col-6 px-4" Mandatory={true}/>
                                <FormAddress address={''} cName="col-6 px-4" Mandatory={false}/>
                                <FormCompany company={''} cName="col-6 px-4" Mandatory={false}/>
                                <FormCountry country={''} cName="col-6 px-4" value={value} onChange={val => setValue(val)} defaultText='select Country' Mandatory={false}/>
                                <FormDOB dob={''} cName="col-6 px-4" Mandatory={false}/>
                                <FormMobileNo mobileNo={''} cName="col-6 px-4" Mandatory={true}/>
                                <FormNickName nickName={''} cName="col-6 px-4" Mandatory={false}/>
                                <FormProfilePic profilePic={''} cName="col-6 px-4" />

                                {/* <div className="form-group form-input col-6">
                                    <input name="company" type="text" id="Company" required />
                                    <label for="Company" className="form-label"><i className="fas fa-user-tag me-2"></i>Company Name</label>
                                    <span className="e_msg error_form ms-2 ps-1" id="company_error_message"></span>
                                </div> */}
                            </Row>

                            <div className="row m-2">
                                <div className="form-group form-input col-6">
                                    <input name="phone" type="number" id="Phone" required />
                                    <label for="Phone" className="form-label"><i className="fas fa-phone-alt me-2"></i>Phone Number</label>
                                    <span className="e_msg error_form ms-2 ps-1" id="phone_error_message"></span>
                                </div>
                                <div className="form-group form-input col-6">
                                    <input name="email" type="email" id="Email" required />
                                    <label for="Email" className="form-label"><i className="fas fa-at me-2"></i>Email Address</label>
                                    <span className="e_msg error_form ms-2 ps-1" id="email_error_message"></span>
                                </div>
                            </div>

                            <div className="row m-2 mb-0">
                                <div className="form-group form-input col-6">
                                    <input name="work" type="text" id="Work" required />
                                    <label for="Work" className="form-label"><i className="fas fa-briefcase me-2"></i>Work Details</label>
                                    <span className="e_msg error_form ms-2 ps-1" id="work_error_message"></span>
                                </div>

                                <div className="img-upload-form form-input col-6">
                                    <h5 className="form-label-pic mb-1">Choose Profile Picture</h5>
                                    <input name="profileImage" type="file" className="form-control-file" id="Profile" />
                                    <span className="e_msg error_form ms-2 ps-1" id="profileimage_error_message"></span>
                                </div>
                            </div>
                        </Form.Group>


                        <div className="row ms-3 me-3">
                            <textarea name="description" className="form-control" id="Description" rows="10" placeholder="Enter Contact Description"></textarea>
                        </div>

                        <div className="text-center mt-2">
                            <div className="form-button">
                                <button type="submit" className="form-submit" >Save</button>
                            </div>
                        </div>

                    </Form>

                </Col>
            </Row>
        </Container>
    )
}

export default AddContact