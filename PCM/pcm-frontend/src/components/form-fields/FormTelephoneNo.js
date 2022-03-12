import React from 'react'

import { FaPhoneAlt } from 'react-icons/fa';
import { Form } from 'react-bootstrap';

const FormTelephoneNo = ({ telephoneNo, countryCode, cName, functionChange, functionBlur, hasTouched, hasError, Mandatory }) => {
    return (
        <Form.Group className={`form-input ${countryCode ? 'd-flex align-items-center' : ''} ${cName}`} controlId="TelephoneNo">
            {
                countryCode &&
                <span className='pt-1 pe-2 d-inline-flex justify-content-start align-items-center'>
                    <pre className='m-0' style={{ fontSize: '14px' }}>{`+${countryCode}`}</pre>
                </span>
            }
            <div className="field">
                <div className="field">
                    <Form.Control
                        name="telephoneNo"
                        title="Telephone Number"
                        type="number"
                        value={telephoneNo}
                        onChange={functionChange}
                        onBlur={functionBlur}
                        className={hasTouched && hasError ? 'hasError' : (telephoneNo !== '' ? 'noError' : '')}
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