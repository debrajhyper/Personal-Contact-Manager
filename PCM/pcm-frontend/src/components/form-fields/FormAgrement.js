import React from 'react'
import { Link } from 'react-router-dom'

import { Form } from 'react-bootstrap'

const FormAgrement = ({ cName, functionChange, hasTouched, hasError, Mandatory }) => {
    return (
        <Form.Group className={`form-input-agreement ${cName}`} controlId="agree-term">
            <div className="form-input-line">
                <Form.Check
                    name="agreement"
                    type="checkbox"
                    control="checkbox"
                    onChange={functionChange}
                    className="agree-term-box"
                    style={{ display: "inline-block" }}
                    aria-label="option 1"
                    required />
                <Form.Label className="label-agree-term m-0">I agree all statements in <Link to="/terms-conditions" className="term-service text-decoration-underline">Terms and Conditions.</Link>{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
            </div>
            {
                hasTouched && hasError &&
                <Form.Text className="e_msg error_form" id="agreement_error_message">
                    {hasError}
                </Form.Text>
            }
        </Form.Group>
    )
}

export default FormAgrement
