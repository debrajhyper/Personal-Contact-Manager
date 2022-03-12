import React from 'react'

import { FaLock } from "react-icons/fa";
import { Form } from 'react-bootstrap'

const FormPassword = ({ cName, password, functionChange, functionBlur, hasTouched, hasError, Mandatory }) => {
    return (
        <Form.Group className={`form-input ${cName}`} controlId="Password">
            <div className="field">
                <Form.Control
                    name="password"
                    title="Password"
                    type="password"
                    value={password}
                    onChange={functionChange}
                    onBlur={functionBlur}
                    className={hasTouched && hasError ? 'hasError' : (password !== "" ? 'noError' : '')}
                    placeholder=""
                required />
                <Form.Label><FaLock className="me-2" />Password{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
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

export default FormPassword
