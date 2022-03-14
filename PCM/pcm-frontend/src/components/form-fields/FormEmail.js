import React from 'react'

import '../../sass/variables.scss';

import { FaAt } from "react-icons/fa";
import { Form } from 'react-bootstrap';

const FormEmail = ({ cName, email, functionChange, functionBlur, hasTouched, hasError, Mandatory }) => {
    return (
        <Form.Group className={`form-input ${cName}`} controlId="Email">
            <div className="field field-email">
                <Form.Control 
                    name="email"
                    title="Email"
                    type="email"
                    value={email} 
                    onChange={functionChange} 
                    onBlur={functionBlur} 
                    className={hasTouched && hasError ? 'hasError' : (email !== "" ? 'noError' : '')}
                    placeholder=" "
                required />
                <Form.Label><FaAt className="me-2"/>Email{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
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

export default FormEmail
