import React from 'react'

import { Form, FloatingLabel } from 'react-bootstrap'

const FormTextarea = (props) => {
    return (
        <>
            <Form.Group className="form-input-textarea" controlId="Textarea">
                <FloatingLabel controlId="floatingTextarea2" label="Enter Additional Information">
                    <Form.Control 
                        name="about" 
                        value={props.about} 
                        onChange={props.functionChange}
                        as="textarea" 
                        style={{ height: '120px' }}
                    placeholder=""/>
                </FloatingLabel>
            </Form.Group>
        </>
    )
}

export default FormTextarea
