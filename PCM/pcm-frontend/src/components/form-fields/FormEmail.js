import React from 'react'

import '../../sass/variables.scss';

import { FaAt } from "react-icons/fa";
import { Form } from 'react-bootstrap'

const FormEmail = (props) => {
    return (
        <>
            <Form.Group className="form-input" controlId="Email">
                <div className="field">
                    <Form.Control 
                        name={props.fieldName}
                        type="email"
                        value={props.email} 
                        onChange={props.functionChange} 
                        onBlur={props.functionBlur} 
                        className={props.hasTouched && props.hasError ? 'hasError' : (props.email !== "" ? 'noError' : '')}
                        placeholder=" "
                        validate={props.validate}
                    required/>
                    <Form.Label><FaAt className="me-2"/>Your Email</Form.Label>
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

export default FormEmail
