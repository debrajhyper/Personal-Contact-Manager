import React from 'react'

import { FaUserFriends } from 'react-icons/fa';
import { Form } from 'react-bootstrap';

const FormCompany = ({ company, cName, functionChange, functionBlur, functionKeyDown, excluded, hasTouched, hasError, Mandatory }) => {
    return (
        <Form.Group className={`form-input ${cName}`} controlId="Company">
            <div className="field">
                <Form.Control
                    name="company"
                    title="Company"
                    type="text"
                    value={company}
                    onChange={functionChange}
                    onBlur={functionBlur}
                    onKeyDown={functionKeyDown}
                    className={hasTouched && hasError ? 'hasError' : (!excluded?.includes(company) ? 'noError' : '')}
                    placeholder=""
                required />
                <Form.Label><FaUserFriends className="me-2" />Company{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
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

export default FormCompany