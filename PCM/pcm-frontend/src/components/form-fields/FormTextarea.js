import React from 'react'

import { Form, FloatingLabel } from 'react-bootstrap';

const FormTextarea = ({ cName, about, functionChange }) => {
    return (
        <>
            <Form.Group className={`form-input-textarea ${cName}`} controlId="Textarea">
                <FloatingLabel controlId="floatingTextarea2" label="Enter Additional Information">
                    <Form.Control 
                        name="about" 
                        value={about} 
                        onChange={functionChange}
                        as="textarea" 
                        style={{ height: '120px' }}
                    placeholder=""/>
                </FloatingLabel>
            </Form.Group>
        </>
    )
}

export default FormTextarea
