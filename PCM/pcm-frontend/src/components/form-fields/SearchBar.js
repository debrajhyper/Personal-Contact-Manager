import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchContact } from '../../services/index';

import UseAnimations from "react-useanimations";
import alertTriangle from 'react-useanimations/lib/alertTriangle';

import { FaSearch } from 'react-icons/fa';
import { Form, Image } from 'react-bootstrap';

const SearchBar = ({ cName, hasTouched, hasError, Mandatory }) => {
    const [searchResult, setSearchResult] = useState('');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const contact = useSelector(state => state.searchContact.contact);
    const exclude = [null, undefined, 'null', 'undefined', '', ' '];
    const ref = useRef(null);

    useEffect(() => {
        dispatch(searchContact(searchResult));
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
                    // onBlur={functionBlur}
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
            <div className={`search-result ${searchResult !== ''? open ? 'open' : '' : ''} ${contact?.length > 0 ? 'hasData' : 'noData'}`}>
                {
                    contact && contact.length > 0
                    ?   contact.map((contact, index) => {
                            const { cid, name, image, mobileNumber, email } = contact;
                            return (
                                <Link to={`/view_contact/${cid}`} id={cid} key={index} className="list-group-item">
                                    <div className="item">
                                        <div className='img-border me-3'>
                                            <Image src={image} className="profile_pic" alt=""/>
                                        </div>
                                        <div className="info">
                                            <span>{name ?? '-'}</span>
                                            {  
                                                !exclude.includes(mobileNumber?.number) 
                                                ?   <span>
                                                        { !exclude.includes(mobileNumber?.code) && <span>+{ mobileNumber?.code } </span> } 
                                                        { mobileNumber?.number ?? '-'}
                                                    </span>
                                                :  <span>-</span>
                                            }
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    :   <div className="option-null">
                            <UseAnimations className='me-2' animation={alertTriangle} />
                            <span>No results found</span>
                        </div>
                }
            </div>
        </Form.Group>
    )
}

export default SearchBar