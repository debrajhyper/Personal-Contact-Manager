import React from 'react';

import { excluded } from '../../validation/validationMsg';

import { Form } from 'react-bootstrap';
import { MdPassword } from 'react-icons/md';

const FormOTP = ({ otp, cName, functionChange, functionBlur, hasTouched, hasError, Mandatory }) => {
    return (
        <Form.Group className={`form-input ${cName}`} controlId="otp">
            <div className="field">
                <div className="field">
                    <Form.Control
                        name="otp"
                        title="OTP"
                        type="number"
                        value={otp}
                        onChange={functionChange}
                        onBlur={functionBlur}
                        className={hasTouched && hasError ? 'hasError' : (!excluded?.includes(otp) ? 'noError' : '')}
                        placeholder=""
                        required />
                    <Form.Label><MdPassword className="me-2" />OTP{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
                </div>
                {
                    hasTouched && hasError &&
                    <Form.Text className="e_msg error_form" id="name_error_message">
                        {hasError}
                    </Form.Text>
                }
            </div>
        </Form.Group>
    )
}

export default FormOTP