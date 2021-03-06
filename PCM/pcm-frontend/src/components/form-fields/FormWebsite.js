import React from 'react'

import { FaLink } from 'react-icons/fa';
import { Form } from 'react-bootstrap';

const FormWebsite = ({ website, cName, functionChange, functionBlur, functionKeyDown, excluded, hasTouched, hasError, Mandatory }) => {
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
                    onKeyDown={functionKeyDown}
                    className={hasTouched && hasError ? 'hasError' : (!excluded?.includes(website) ? 'noError' : '')}
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