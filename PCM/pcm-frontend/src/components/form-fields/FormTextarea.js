import React from 'react';

import { Form, FloatingLabel } from 'react-bootstrap';

const FormTextarea = ({ description, cName, functionChange }) => {
    return (
        <>
            <Form.Group className={`form-input-textarea ${cName}`} controlId="Textarea">
                <FloatingLabel controlId="floatingTextarea2" label="Enter Additional Information">
                    <Form.Control
                        name="description"
                        value={description}
                        onChange={functionChange}
                        as="textarea"
                        style={{ height: '120px' }}
                        placeholder="" />
                </FloatingLabel>
            </Form.Group>
        </>
    )
}

export default FormTextarea
