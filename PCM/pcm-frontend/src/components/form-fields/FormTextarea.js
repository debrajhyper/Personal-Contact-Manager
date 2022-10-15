import React from 'react';

import { Form, FloatingLabel } from 'react-bootstrap';

const FormTextarea = ({ description, name, height, label, cName, functionChange }) => {
    return (
        <>
            <Form.Group className={`form-input-textarea ${cName}`} controlId="Textarea">
                <FloatingLabel controlId="floatingTextarea2" label={ label ?? "Enter Additional Information"}>
                    <Form.Control
                        name={name ?? "description"}
                        value={description}
                        onChange={functionChange}
                        as="textarea"
                        style={{ height: height ?? "100px" }}
                        placeholder="" />
                </FloatingLabel>
            </Form.Group>
        </>
    )
}

export default FormTextarea
