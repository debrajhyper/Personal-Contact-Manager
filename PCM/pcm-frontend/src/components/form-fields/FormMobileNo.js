import React from 'react';

import { excluded } from '../../validation/validationMsg';

import { Form } from 'react-bootstrap';
import { IoPhonePortraitOutline } from 'react-icons/io5';

const FormMobileNo = ({ mobileNumber, countryCode, cName, functionChange, functionBlur, functionKeyDown, hasTouched, hasError, Mandatory }) => {
    return (
        <Form.Group className={`form-input ${countryCode ? 'd-flex align-items-center' : ''} ${cName}`} controlId="mobileNumber">
            {
                !excluded?.includes(countryCode) &&
                <span className='pt-1 pe-2 d-inline-flex justify-content-start align-items-center'>
                    <pre className='m-0' style={{ fontSize: '14px' }}>{`+${countryCode}`}</pre>
                </span>
            }
            <div className="field">
                <div className="field">
                    <Form.Control
                        name="number"
                        title="Mobile Number"
                        type="number"
                        value={mobileNumber?.number}
                        onChange={functionChange}
                        onBlur={functionBlur}
                        onKeyDown={functionKeyDown}
                        className={hasTouched && hasError ? 'hasError' : (!excluded?.includes(mobileNumber) && !excluded?.includes(mobileNumber?.number) ? 'noError' : '')}
                        placeholder=""
                        required />
                    <Form.Label><IoPhonePortraitOutline className="me-2" />Mobile Number{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
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

export default FormMobileNo