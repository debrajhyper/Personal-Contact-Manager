import React from 'react'

import { Form } from 'react-bootstrap';
import { FaUsersCog } from 'react-icons/fa';

const FormNickName = ({ nickName, cName, functionChange, functionBlur, hasTouched, hasError, Mandatory }) => {
    return (
        <Form.Group className={`form-input ${cName}`} controlId="NickName">
            <div className="field">
                <Form.Control
                    name="nickName"
                    type="text"
                    value={nickName}
                    onChange={functionChange}
                    onBlur={functionBlur}
                    className={hasTouched && hasError ? 'hasError' : (nickName !== "" ? 'noError' : '')}
                    placeholder=""
                required />
                <Form.Label><FaUsersCog className="me-2" />NickName{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
            </div>
            {hasTouched && hasError &&
                <Form.Text className="e_msg error_form" id="name_error_message">
                    {hasError}
                </Form.Text>
            }
        </Form.Group>
    )
}

export default FormNickName