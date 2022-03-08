import React, { useRef, useState, useEffect } from 'react'

import { CountryDetails } from '../misc/CountryDetails';

import { FaGlobeAmericas } from 'react-icons/fa';
import { Form, Image } from 'react-bootstrap';


const FormCountry = ({ country, defaultText, onChange, value, cName, functionChange, functionBlur, hasTouched, hasError, Mandatory }) => {
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

    function filter(countries) {
        return countries.filter(country => country.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
    }

    function displayValue() {
        if (query.length > 0) return query;
        if (value) return value.name;
        return '';
    }

    function selectOption(country) {
        setQuery('');
        onChange(country);
        setOpen(false);
    }

    return (
        <Form.Group className={`form-input ${cName}`} controlId="Country">
            <div className='field'>
                <div className='control'>
                    <Form.Control
                        ref={ref}
                        name="country"
                        type="text"
                        value={displayValue()}
                        onChange={e => {
                            setQuery(e.target.value)
                            onChange(null)
                        }}
                        onBlur={functionBlur}
                        className={hasTouched && hasError ? 'hasError' : (country !== "" ? 'noError' : '')}
                        onClick={toggle}
                        onTouchEnd={toggle}
                        // placeholder={value ? value.name : defaultText}
                        placeholder=" "
                        required />
                    <Form.Label><FaGlobeAmericas className="me-2" />Country{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
                    <div className={`arrow ${open ? 'open' : null}`} />
                </div>
                <div className={`CountryDetails ${open ? 'open' : null}`}>
                    {
                        
                        filter(CountryDetails).map((country, index) => {
                            const { code, name, flag } = country;
                            return (
                                <div 
                                    className={`country ${value === country ? 'selected' : null}`}
                                    onClick={() => selectOption(country)} 
                                    onTouchEnd={() => selectOption(country)} 
                                    key={index} 
                                    value={code}>
                                        <Image src={flag} width={20} className="mx-3" />
                                        {name}
                                </div>
                                
                            )
                        })
                    }
                </div>
            </div>
        </Form.Group>
    )
}

export default FormCountry