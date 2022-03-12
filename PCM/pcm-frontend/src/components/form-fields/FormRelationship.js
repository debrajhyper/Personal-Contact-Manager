import React, { useState, useEffect, useRef } from 'react'

import { RelationshipDetails } from '../misc/RelationshipDetails';

import { FaHeart } from 'react-icons/fa';
import { Form } from 'react-bootstrap';

const FormRelationship = ({ relationship, cName, functionChange, functionBlur, hasTouched, hasError, Mandatory }) => {
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
        return relationships.filter(relationship => relationship.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
    }

    function displayValue() {
        if (query.length > 0) return query;
        if (relationship) return relationship;
        return '';
    }

    function selectOption(name, relationship) {
        setQuery('');
        functionChange(name, relationship);
        setOpen(false);
    }

    return (
        <Form.Group className={`form-input ${cName}`} controlId="Relationship">
            <div className='field'>
                <div className='control'>
                    <Form.Control
                        ref={ref}
                        name="relationship"
                        title="Relationship"
                        type="text"
                        value={displayValue()}
                        onChange={e => {
                            setQuery(e.target.value)
                            functionChange(e.target.name, e.target.value)
                        }}
                        onBlur={functionBlur}
                        className={hasTouched && hasError ? 'hasError' : (relationship !== "" ? 'noError' : '')}
                        onClick={toggle}
                        onTouchEnd={toggle}
                        placeholder=""
                    required />
                    <Form.Label><FaHeart className="me-2" />Relationship{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
                    <div className={`arrow ${open ? 'open' : null}`} />
                </div>
                <div className={`OptionDetails ${open ? 'open' : null}`}>
                    {
                        filter(RelationshipDetails).length > 0
                        ?   filter(RelationshipDetails).map((relationshipD, index) => {
                                const { id, name } = relationshipD;
                                return (
                                    <div
                                        optionname="relationship"
                                        className={`option ${relationship === name ? 'selected' : null}`}
                                        onClick={e => selectOption(e.target.getAttribute('optionname'), name)}
                                        onTouchEnd={e => selectOption(e.target.getAttribute('optionname'), name)}
                                        key={id}
                                        value={name}>
                                            {name}
                                    </div>
                                );
                            })
                        :   <div className="option-null">
                                <Form.Text>No Relationship Status</Form.Text> 
                                <span>Consider Selecting Other</span>
                            </div>
                    }
                </div>
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

export default FormRelationship