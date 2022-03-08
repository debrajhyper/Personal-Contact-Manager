import React from 'react'

import { IoCalendar } from 'react-icons/io5';
import { Form } from 'react-bootstrap';

const FormDOB = ({ dob, cName, functionChange, functionBlur, hasTouched, hasError, Mandatory }) => {
    return (
        <Form.Group className={`form-input ${cName}`} controlId="DOB">
            <div className="field">
                <Form.Control
                    name="dob"
                    type="date"
                    value={dob}
                    onChange={functionChange}
                    onBlur={functionBlur}
                    className={hasTouched && hasError ? 'hasError' : (dob !== "" ? 'noError' : '')}
                    placeholder="as"
                    required/>
                <Form.Label><IoCalendar className="me-2" />Birth Date{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
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

export default FormDOB