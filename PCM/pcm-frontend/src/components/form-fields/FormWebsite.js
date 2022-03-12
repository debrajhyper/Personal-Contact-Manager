import React from 'react'

import { FaLink } from 'react-icons/fa';
import { Form } from 'react-bootstrap';

const FormWebsite = ({ website, cName, functionChange, functionBlur, hasTouched, hasError, Mandatory }) => {
    return (
        <Form.Group className={`form-input ${cName}`} controlId="Website">
            <div className="field field-url">
                <Form.Control
                    name="website"
                    title="Website URL"
                    type="url"
                    value={website}
                    onChange={functionChange}
                    onBlur={functionBlur}
                    className={hasTouched && hasError ? 'hasError' : (website !== "" ? 'noError' : '')}
                    placeholder=" "
                required />
                <Form.Label><FaLink className="me-2" />Website{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
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

export default FormWebsite