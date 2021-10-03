import React from 'react'

import { FaUserAlt } from "react-icons/fa";
import { Form } from 'react-bootstrap'

const FormName = (props) => {
    return (
        <>
            <Form.Group className="form-input" controlId="Name">
                <div className="field">
                    <Form.Control 
                        name="name" 
                        type="text" 
                        value={props.name} 
                        onChange={props.functionChange} 
                        onBlur={props.functionBlur} 
                        className={props.hasTouched && props.hasError ? 'hasError' : (props.name !== "" ? 'noError' : '')}
                        placeholder=" "
                    required/>
                    <Form.Label><FaUserAlt className="me-2"/>Your Name</Form.Label>
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

export default FormName
