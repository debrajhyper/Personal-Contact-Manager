import React, { useState, useEffect, useRef } from 'react';

import { excluded } from '../../validation/validationMsg';

import { zodiacDetails } from '../misc/ZodiacDetails';
import { Form, Image } from 'react-bootstrap';
import { IoDisc } from 'react-icons/io5';

const FormZodiacSign = ({ zodiacSign, cName, functionChange, functionBlur, functionKeyDown, hasTouched, hasError, Mandatory }) => {
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

    function filter(zodiacSigns) {
        return zodiacSigns.filter(zodiacSign => zodiacSign.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
    }

    function displayValue() {
        if (query.length > 0) return query;
        if (!excluded?.includes(zodiacSign)) return zodiacSign;
        return '';
    }

    function selectOption(name, zodiacSign) {
        setQuery('');
        functionChange(name, zodiacSign);
        setOpen(false);
    }

    return (
        <Form.Group className={`form-input ${cName}`} controlId="ZodiacSign">
            <div className='field'>
                <div className='control'>
                    <Form.Control
                        ref={ref}
                        name="zodiacSign"
                        title="Zodiac Sign"
                        type="text"
                        value={displayValue()}
                        onChange={e => {
                            setQuery(e.target.value)
                            functionChange(e.target.name, e.target.value)
                        }}
                        onBlur={functionBlur}
                        onClick={toggle}
                        onTouchEnd={toggle}
                        onKeyDown={functionKeyDown}
                        className={hasTouched && hasError ? 'hasError' : (!excluded?.includes(zodiacSign) ? 'noError' : '')}
                        placeholder=""
                        required />
                    <Form.Label><IoDisc className="me-2" />Zodiac Sign{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
                    <div className={`arrow ${open ? 'open' : null}`} />
                </div>
                <div className={`OptionDetails ${open ? 'open' : null}`}>
                    {
                        filter(zodiacDetails).length > 0
                            ? filter(zodiacDetails).map((zodiacSignD, index) => {
                                const { id, name, image } = zodiacSignD;
                                return (
                                    <div
                                        optionname="zodiacSign"
                                        className={`option ${zodiacSign === zodiacSignD ? 'selected' : null}`}
                                        onClick={e => selectOption(e.target.getAttribute('optionname'), name)}
                                        onTouchEnd={e => selectOption(e.target.getAttribute('optionname'), name)}
                                        key={id}
                                        value={name}>
                                        <Image src={image} width={25} className="mx-3" />
                                        {name}
                                    </div>
                                )
                            })
                            : <div className="option-null">
                                <Form.Text>No Zodiac Name</Form.Text>
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

export default FormZodiacSign