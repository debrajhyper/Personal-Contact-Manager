import React from 'react';

import { FaUserTag } from 'react-icons/fa';
import { Form } from 'react-bootstrap';

const FormTags = ({ tags, cName, functionAddTags, functionRemoveTags, functionKeyDown, hasTouched, hasError, Mandatory }) => {
    return (
        <Form.Group className={`form-input ${cName}`} controlId="Tags">
            <div className="field">
                <Form.Control
                    name="tags"
                    title="Tags"
                    type="text"
                    onKeyUp={event => event.key === "Enter" ? functionAddTags(event) : null}
                    onBlur={e => functionAddTags(e)}
                    onKeyDown={functionKeyDown}
                    className={hasTouched && hasError ? 'hasError' : (tags?.length > 0 ? 'noError' : '')}
                    placeholder=""
                    required />
                <Form.Label><FaUserTag className="me-2" />Tags{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
            </div>
            <ul id="tags">
                {
                    tags &&
                    tags.map((tag, index) => (
                        <li key={index} className="tag">
                            <span className='tag-title'>{tag}</span>
                            <span className='tag-close-icon' onClick={() => functionRemoveTags(index)}>
                                x
                            </span>
                        </li>
                    ))
                }
            </ul>
            {
                hasTouched && hasError &&
                <Form.Text className="e_msg error_form" id="name_error_message">
                    {hasError}
                </Form.Text>
            }
        </Form.Group>
    );
}

export default FormTags