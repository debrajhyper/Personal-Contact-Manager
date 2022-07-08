import React from 'react'

import { FaUserTie } from 'react-icons/fa';
import { Form } from 'react-bootstrap';

const FormTitle = ({ title, cName, functionChange, functionBlur, functionKeyDown, hasTouched, hasError, Mandatory }) => {
    return (
        <Form.Group className={`form-input ${cName}`} controlId="Title">
            <div className="field">
                <Form.Control
                    name="title"
                    title="Title"
                    type="text"
                    value={title}
                    onChange={functionChange}
                    onBlur={functionBlur}
                    onKeyDown={functionKeyDown}
                    className={hasTouched && hasError ? 'hasError' : (title !== "" ? 'noError' : '')}
                    placeholder=""
                required />
                <Form.Label><FaUserTie className="me-2" />Title{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
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

export default FormTitle