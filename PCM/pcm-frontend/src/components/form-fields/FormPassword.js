import React from 'react'

import { FaLock } from "react-icons/fa";
import { Form } from 'react-bootstrap'

const FormPassword = (props) => {
    return (
        <>
            <Form.Group className="form-input" controlId="Password">
                <div className="field">
                    <Form.Control 
                        name="password" 
                        type="password" 
                        value={props.password} 
                        onChange={props.functionChange} 
                        onBlur={props.functionBlur} 
                        className={props.hasTouched && props.hasError ? 'hasError' : (props.password !== "" ? 'noError' : '')} 
                        placeholder=" "
                    required/>
                    <Form.Label><FaLock className="me-2"/>Your Password</Form.Label>
                </div>
                {props.hasTouched && props.hasError && 
                    <Form.Text className="e_msg error_form" id="name_error_message">
                        {props.hasError}
                    </Form.Text>
                }
                
            </Form.Group>
        </>
    )
}

export default FormPassword
