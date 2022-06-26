import React from 'react'

import ProfilePic from '../profile-pic/ProfilePic';

import defaultPic from '../../img/default.png';

import { IoCamera } from 'react-icons/io5';
import { Form } from 'react-bootstrap';

const FormProfilePic = ({ profilePic, profilePicURL, uploadedFile, cName, functionChange, functionBlur, hasTouched, hasError }) => {
    return (
        <Form.Group className={`form-input ${cName}`} controlId="profilePic">
            <div className="field">
                <Form.Control
                    name="profilePic"
                    title="Profile Picture"
                    type="file"
                    accept='image/*'
                    onChange={functionChange}
                    onSelect={functionChange}
                    onBlur={functionBlur}
                    className={hasTouched && hasError ? 'hasError' : (profilePic !== "" ? 'noError' : '')}
                    placeholder=""
                required />
                <div className='img-holder'>
                    <ProfilePic image={profilePicURL ? (uploadedFile && !hasError ? profilePicURL : defaultPic) : defaultPic} outline={true} />
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