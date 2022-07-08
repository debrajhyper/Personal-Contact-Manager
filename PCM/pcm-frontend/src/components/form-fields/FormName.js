import React from 'react'

import { FaUserAlt } from "react-icons/fa";
import { Form } from 'react-bootstrap';

const FormName = ({ name, cName, functionChange, functionBlur, functionKeyDown, hasTouched, hasError, Mandatory }) => {
    return (
        <Form.Group className={`form-input ${cName}`} controlId="Name">
            <div className="field">
                <Form.Control
                    name="name"
                    title="Name"
                    type="text"
                    value={name}
                    onChange={functionChange}
                    onBlur={functionBlur}
                    onKeyDown={functionKeyDown}
                    className={hasTouched && hasError ? 'hasError' : (name !== "" ? 'noError' : '')}
                    placeholder=""
                required />
                <Form.Label><FaUserAlt className="me-2" />Name{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
            </div>
            {
                hasTouched && hasError &&
                <Form.Text className="e_msg error_form">
                    {hasError}
                </Form.Text>
            }
        </Form.Group>
    )
}

export default FormName
