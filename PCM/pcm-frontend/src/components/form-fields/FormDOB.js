import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { IoCalendar } from 'react-icons/io5';
import { Form } from 'react-bootstrap';

const FormDOB = ({ dob, cName, functionChange, functionBlur, functionKeyDown, excluded, hasTouched, hasError, Mandatory }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const { cid } = useParams();

    useEffect(() => {
        ['click', 'touchend'].forEach(e => {
            document.addEventListener(e, toggle);
        })

        return () => ['click', 'touchend'].forEach(e => {
            document.removeEventListener(e, toggle);
        })
    }, []);

    function toggle(e) {
        setOpen(e && e.target === ref.current);
    }

    return (
        <Form.Group className={`form-input ${cName}`} controlId="DOB">
            <div className="field">
                <Form.Control
                    ref={ref}
                    name="dateOfBirth"
                    title="Birth Date"
                    type="date"
                    format="dd-MM-yyyy"
                    value={cid ? dob?.split('-').reverse().join('-') : dob}
                    onChange={functionChange}
                    onBlur={functionBlur}
                    onKeyDown={functionKeyDown}
                    className={`${open ? 'focused' : 'not-focused'} ${hasTouched && hasError ? 'hasError' : (!excluded?.includes(dob) ? 'noError' : '')}`}
                    placeholder=""
                required />
                <Form.Label><IoCalendar className="me-2" />Birth Date{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
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

export default FormDOB