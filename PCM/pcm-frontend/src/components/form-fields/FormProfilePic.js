import React from 'react'

import ProfilePic from '../profile-pic/ProfilePic';

import defaultPic from '../../img/default.png';

import { IoCamera } from 'react-icons/io5';
import { Form } from 'react-bootstrap';

const FormProfilePic = ({ profilePic, profilePicURL, uploadedFile, cName, functionChange, functionBlur, hasTouched, hasError }) => {
    return (
        <Form.Group className={`form-input ${cName}`} controlId="ProfilePic">
            <div className="field">
                <Form.Control
                    name="profilePic"
                    type="file"
                    accept='image/*'
                    // value={profilePic}
                    onChange={functionChange}
                    onSelect={functionChange}
                    onBlur={functionBlur}
                    className={hasTouched && hasError ? 'hasError' : (profilePic !== "" ? 'noError' : '')}
                    placeholder=""
                required />
                <div className='img-holder'>
                    <ProfilePic image={uploadedFile ? profilePicURL : defaultPic} outline={true} />
                    <Form.Label title='upload'><IoCamera /></Form.Label>
                </div>
            </div>
            {
                hasTouched && hasError &&
                <Form.Text className="e_msg error_form" id="name_error_message">
                    {hasError}
                </Form.Text>
            }
        </Form.Group>
    )
}

export default FormProfilePic