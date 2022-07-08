import React from 'react'

import { FaUsersCog } from 'react-icons/fa';
import { Form } from 'react-bootstrap';

const FormNickName = ({ nickName, cName, functionChange, functionBlur, functionKeyDown, hasTouched, hasError, Mandatory }) => {
    return (
        <Form.Group className={`form-input ${cName}`} controlId="NickName">
            <div className="field">
                <Form.Control
                    name="nickName"
                    title="Nick Name"
                    type="text"
                    value={nickName}
                    onChange={functionChange}
                    onBlur={functionBlur}
                    onKeyDown={functionKeyDown}
                    className={hasTouched && hasError ? 'hasError' : (nickName !== "" ? 'noError' : '')}
                    placeholder=""
                required />
                <Form.Label><FaUsersCog className="me-2" />Nick Name{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
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

export default FormNickName