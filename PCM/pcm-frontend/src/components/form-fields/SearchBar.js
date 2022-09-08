import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { searchContact } from '../../services/index';

import { excluded } from '../../validation/validationMsg';

import UseAnimations from "react-useanimations";
import alertTriangle from 'react-useanimations/lib/alertTriangle';

import { Form, Image } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ cName, hasTouched, hasError, Mandatory }) => {
    const { searchedContacts } = useSelector(state => state.searchContact);
    const dispatch = useDispatch();

    const [searchResult, setSearchResult] = useState('');
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (searchResult !== '') {
            dispatch(searchContact(searchResult));
        }
    }, [searchResult, dispatch]);

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

    const searchHandler = event => {
        setSearchResult(event.target.value);
    };

    return (
        <Form.Group className={`form-input search ${cName}`} controlId="Search">
            <div className="field field-search">
                <Form.Control
                    ref={ref}
                    name="search"
                    title="Search"
                    type="text"
                    value={searchResult}
                    onChange={searchHandler}
                    className={hasTouched && hasError ? 'hasError' : (searchResult !== "" ? 'noError' : '')}
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
            <div className={`search-result ${searchResult !== '' ? open ? 'open' : '' : ''} ${searchedContacts?.length > 0 ? 'hasData' : 'noData'}`}>
                {
                    searchedContacts && searchedContacts.length > 0
                        ? searchedContacts.map((contact, index) => {
                            const { cid, name, image, mobileNumber } = contact;
                            return (
                                <Link to={`/view_contact/${cid}`} id={cid} key={index} className="list-group-item">
                                    <div className="item">
                                        <div className='img-border me-3'>
                                            <Image src={image} className="profile_pic" alt="" />
                                        </div>
                                        <div className="info">
                                            <span>{name ?? '-'}</span>
                                            {
                                                !excluded.includes(mobileNumber?.number)
                                                    ? <span>
                                                        {!excluded.includes(mobileNumber?.code) && <span>+{mobileNumber?.code} </span>}
                                                        {mobileNumber?.number ?? '-'}
                                                    </span>
                                                    : <span>-</span>
                                            }
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                        : <div className="option-null">
                            <UseAnimations className='me-2' animation={alertTriangle} />
                            <span>No results found</span>
                        </div>
                }
            </div>
        </Form.Group>
    )
}

export default SearchBar