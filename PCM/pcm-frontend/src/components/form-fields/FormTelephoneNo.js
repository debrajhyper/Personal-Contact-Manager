import React from 'react';

import { excluded } from '../../validation/validationMsg';

import { Form } from 'react-bootstrap';
import { FaPhoneAlt } from 'react-icons/fa';

const FormTelephoneNo = ({ telephoneNumber, countryCode, cName, functionChange, functionBlur, functionKeyDown, hasTouched, hasError, Mandatory }) => {
    return (
        <Form.Group className={`form-input ${countryCode ? 'd-flex align-items-center' : ''} ${cName}`} controlId="TelephoneNo">
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
                        title="Telephone Number"
                        type="number"
                        value={telephoneNumber?.number}
                        onChange={functionChange}
                        onBlur={functionBlur}
                        onKeyDown={functionKeyDown}
                        className={hasTouched && hasError ? 'hasError' : (!excluded?.includes(telephoneNumber) && !excluded?.includes(telephoneNumber?.number) ? 'noError' : '')}
                        placeholder=""
                        required />
                    <Form.Label><FaPhoneAlt className="me-2" />Telephone Number{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
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

export default FormTelephoneNo