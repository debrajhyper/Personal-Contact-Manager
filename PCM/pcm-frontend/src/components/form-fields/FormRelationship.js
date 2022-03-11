import React, { useState, useEffect, useRef } from 'react'

import { FaHeart } from 'react-icons/fa';
import { Form, Image } from 'react-bootstrap';

const RelationshipDetails = ['Brother', 'Sister', 'Parent', 'Father', 'Mother', 'child', 'Son', 'Daughter', 'Grandfather', 'Grandmother', 'Aunt', 'Uncle', 'Cousin', 'Nephew', 'Niece', 'Friend', 'Spouse', 'Domestic Partner', 'Partner', 'Manager', 'Relative', 'Other'];

const FormRelationship = ({ relationship, defaultText, onChange, value, cName, functionChange, functionBlur, hasTouched, hasError, Mandatory }) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const ref = useRef(null);

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

    function filter(relationships) {
        return relationships.filter(relationship => relationship.toLowerCase().indexOf(query.toLowerCase()) > -1);
    }

    function displayValue() {
        if (query.length > 0) return query;
        if (value) return value.name;
        return '';
    }

    function selectOption(relationship) {
        setQuery('');
        onChange(relationship);
        setOpen(false);
    }

    return (
        <Form.Group className={`form-input ${cName}`} controlId="Relationship">
            <div className='field'>
                <div className='control'>
                    <Form.Control
                        ref={ref}
                        name="relationship"
                        type="text"
                        value={displayValue()}
                        onChange={e => {
                            setQuery(e.target.value)
                            onChange(null)
                        }}
                        onBlur={functionBlur}
                        className={hasTouched && hasError ? 'hasError' : (relationship !== "" ? 'noError' : '')}
                        onClick={toggle}
                        onTouchEnd={toggle}
                        // placeholder={value ? value.name : defaultText}
                        placeholder=""
                        required />
                    <Form.Label><FaHeart className="me-2" />Relationship{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
                    <div className={`arrow ${open ? 'open' : null}`} />
                </div>
                <div className={`CountryDetails ${open ? 'open' : null}`}>
                    {

                        filter(RelationshipDetails).map((relationship, index) => {
                            return (
                                <div
                                    className={`country ${value === relationship ? 'selected' : null}`}
                                    onClick={() => selectOption(relationship)}
                                    onTouchEnd={() => selectOption(relationship)}
                                    key={index}
                                    value={relationship}>
                                    {/* <Image src={flag} width={20} className="mx-3" /> */}
                                    {relationship}
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </Form.Group>
    )
}

export default FormRelationship