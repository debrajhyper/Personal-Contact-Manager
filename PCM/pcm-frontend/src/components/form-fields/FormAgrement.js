import React from 'react';
import { Link } from 'react-router-dom';

import { TERMS_CONDITIONS_LINK } from '../../Route';

import { Form } from 'react-bootstrap';

const FormAgrement = ({ agreement, cName, functionChange, hasTouched, hasError, Mandatory }) => {

    return (
        <Form.Group className={`form-input-agreement ${cName}`}>
            <div className="form-input-line">
                <Form.Check
                    name="agreement"
                    title='Agree-term'
                    type="checkbox"
                    control="input"
                    onChange={functionChange}
                    className="agree-term-box"
                    style={{ display: "inline-block" }}
                    checked={agreement}
                    required />
                <Form.Label className="label-agree-term m-0">I agree all statements in <Link to={TERMS_CONDITIONS_LINK} className="term-service text-decoration-underline">Terms and Conditions.</Link>{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
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
