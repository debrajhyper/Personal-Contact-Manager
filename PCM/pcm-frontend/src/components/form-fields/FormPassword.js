import React, { useRef } from 'react';

import { excluded } from '../../validation/validationMsg';

import UseAnimations from "react-useanimations";
import visibility2 from 'react-useanimations/lib/visibility2';

import { Form } from 'react-bootstrap'
import { FaLock } from "react-icons/fa";

const FormPassword = ({ cName, label, name, password, functionChange, functionBlur, hasTouched, hasError, Mandatory }) => {
    const ref = useRef();

    const handlePasswordShow = () => {
        ref.current.type = ref.current.type === 'password' ? 'text' : 'password';
    }

    return (
        <Form.Group className={`form-input ${cName}`} controlId="Password">
            <div className="field field-password">
                <Form.Control
                    ref={ref}
                    name={name ?? "password"}
                    title="Password"
                    type="password"
                    value={password}
                    onChange={functionChange}
                    onBlur={functionBlur}
                    className={hasTouched && hasError ? 'hasError' : (!excluded?.includes(password) ? 'noError' : '')}
                    placeholder=" "
                    required />
                <Form.Label><FaLock className="me-2" />{label ?? 'Password'}{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
                <UseAnimations className='password-visibility' onClick={handlePasswordShow} animation={visibility2} reverse={true} />
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

export default FormPassword
