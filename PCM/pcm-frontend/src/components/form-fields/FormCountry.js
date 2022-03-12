import React, { useRef, useState, useEffect } from 'react'

import { CountryDetails } from '../misc/CountryDetails';

import { FaGlobeAmericas } from 'react-icons/fa';
import { Form, Image } from 'react-bootstrap';


const FormCountry = ({ country, cName, functionChange, functionBlur, hasTouched, hasError, Mandatory }) => {
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
        if (country) return country.name;
        return '';
    }

    function selectOption(name, country) {
        setQuery('');
        functionChange(name, country);
        setOpen(false);
    }

    return (
        <Form.Group className={`form-input ${cName}`} controlId="Country">
            <div className='field'>
                <div className='control'>
                    <Form.Control
                        ref={ref}
                        name="country"
                        title="Country"
                        type="text"
                        value={displayValue()}
                        onChange={e => {
                            setQuery(e.target.value)
                            functionChange(e.target.name, e.target.value)
                        }}
                        onBlur={functionBlur}
                        className={hasTouched && hasError ? 'hasError' : (country !== "" ? 'noError' : '')}
                        onClick={toggle}
                        onTouchEnd={toggle}
                        placeholder=""
                    required />
                    <Form.Label><FaGlobeAmericas className="me-2" />Country{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
                    <div className={`arrow ${open ? 'open' : null}`} />
                </div>
                <div className={`OptionDetails ${open ? 'open' : null}`}>
                    {
                        filter(CountryDetails).length > 0
                        ?   filter(CountryDetails).map((countryD, index) => {
                                const { code, name, flag } = countryD;
                                return (
                                    <div 
                                        optionname="country"
                                        className={`option ${country === countryD ? 'selected' : null}`}
                                        onClick={e => selectOption(e.target.getAttribute('optionname'), countryD)}
                                        onTouchEnd={e => selectOption(e.target.getAttribute('optionname'), countryD)} 
                                        key={index} 
                                        value={code}>
                                            <Image src={flag} width={22} className="mx-3" />
                                            {name}
                                    </div>
                                )
                            })
                        :   <div className="option-null">
                                <Form.Text>No Country Found</Form.Text> 
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

export default FormCountry