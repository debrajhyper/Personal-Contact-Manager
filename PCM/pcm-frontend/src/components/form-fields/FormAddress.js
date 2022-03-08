import React from 'react'

import { IoLocationSharp } from "react-icons/io5";
import { Form } from 'react-bootstrap';

const FormAddress = ({ address, cName, functionChange, functionBlur, hasTouched, hasError, Mandatory }) => {
    return (
        <Form.Group className={`form-input ${cName}`} controlId="Address">
            <div className="field">
                <Form.Control
                    name="address"
                    type="text"
                    value={address}
                    onChange={functionChange}
                    onBlur={functionBlur}
                    className={hasTouched && hasError ? 'hasError' : (address !== "" ? 'noError' : '')}
                    placeholder=" "
                    required />
                <Form.Label><IoLocationSharp className="me-2" />Address{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
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

export default FormAddress