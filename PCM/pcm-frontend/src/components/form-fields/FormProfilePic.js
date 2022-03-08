import React from 'react'

import { IoCamera } from 'react-icons/io5';
import { Form } from 'react-bootstrap';

const FormProfilePic = ({ profilePic, cName, functionChange, functionBlur, hasTouched, hasError, Mandatory }) => {
    return (
        <Form.Group className={`form-input ${cName}`} controlId="ProfilePic">
            <div className="field">
                <Form.Control
                    name="profilePic"
                    type="file"
                    value={profilePic}
                    onChange={functionChange}
                    onBlur={functionBlur}
                    className={hasTouched && hasError ? 'hasError' : (profilePic !== "" ? 'noError' : '')}
                    placeholder=" "
                    required />
                <Form.Label><IoCamera className="me-2" />Profile Picture{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
            </div>
            {hasTouched && hasError &&
                <Form.Text className="e_msg error_form" id="name_error_message">
                    {hasError}
                </Form.Text>
            }
        </Form.Group>
    )
}

export default FormProfilePic