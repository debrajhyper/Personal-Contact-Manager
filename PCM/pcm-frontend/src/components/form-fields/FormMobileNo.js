import React from 'react'

import { IoPhonePortraitOutline } from 'react-icons/io5';
import { Form } from 'react-bootstrap';

const FormMobileNo = ({ mobileNo, countryCode, cName, functionChange, functionBlur, hasTouched, hasError, Mandatory }) => {
    return (
        <Form.Group className={`form-input ${countryCode ? 'd-flex align-items-center' : ''} ${cName}`} controlId="MobileNo">
            {
                countryCode &&
                <span className='pt-1 pe-1 d-inlie-flex justify-content-start align-items-center' style={{ fontSize: '14px' }}>
                    {`+${countryCode.no}`}
                </span>
            }
            <div className="field">
                <div className="field">
                    <Form.Control
                        name="mobileNo"
                        type="number"
                        value={mobileNo}
                        onChange={functionChange}
                        onBlur={functionBlur}
                        className={hasTouched && hasError ? 'hasError' : (mobileNo !== '' ? 'noError' : '')}
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