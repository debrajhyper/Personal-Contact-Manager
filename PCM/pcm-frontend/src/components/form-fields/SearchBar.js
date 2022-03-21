import React from 'react'

import { FaSearch } from 'react-icons/fa';
import { Form } from 'react-bootstrap';

const SearchBar = ({ title, cName, functionChange, functionBlur, hasTouched, hasError, Mandatory, searchResult, setSearchResult }) => {
    const searchHandler = event => {
        setSearchResult(event.target.value);
    };

    return (
        <Form.Group className={`form-input ${cName}`} controlId="Search">
            <div className="field">
                <Form.Control
                    name="search"
                    title="Search"
                    type="text"
                    value={searchResult}
                    onChange={searchHandler}
                    // onBlur={functionBlur}
                    className={hasTouched && hasError ? 'hasError' : (title !== "" ? 'noError' : '')}
                    placeholder=""
                    required />
                <Form.Label><FaSearch className="me-2" />Search{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
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

export default SearchBar