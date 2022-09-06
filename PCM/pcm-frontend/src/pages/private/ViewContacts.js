import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, viewContacts, deleteSelectedContacts, setMinMaxPageNumberLimit } from '../../services/index';

import HeaderImg from '../../img/pcm_view_contacts.png';

import UseAnimations from "react-useanimations";
import trash from 'react-useanimations/lib/trash';

import { Header, SearchBar, DisplayTable, Pagination } from '../../components/index';
import { Container, Row, Col } from 'react-bootstrap';

const ViewContacts = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const { contacts, page } = useSelector(state => state.viewContacts);
    const { deleteContactSuccess, allDeleted } = useSelector(state => state.deleteContact);
    const { pageNumberLimit, minPageNumberLimit } = useSelector(state => state.pagination);
    const dispatch = useDispatch();

    const [deleteIds, setDeleteIds] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            if (deleteContactSuccess && allDeleted === contacts.length) {
                dispatch(viewContacts(page - 1));
                if ((page - 1) % pageNumberLimit === 0) {
                    dispatch(setMinMaxPageNumberLimit(minPageNumberLimit - pageNumberLimit, minPageNumberLimit));
                }
                else {
                    dispatch(setMinMaxPageNumberLimit(0, 3));
                }
            }
            else if (deleteContactSuccess && allDeleted !== contacts.length) {
                dispatch(viewContacts(page));
            }
            else {
                dispatch(viewContacts(page));
            }
            setDeleteIds([]);
        }
        else {
            dispatch(logoutUser('/login'));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, dispatch, page, deleteContactSuccess, allDeleted, contacts.length]);

    const handleDeleteSelected = e => {
        e.preventDefault();
        if (deleteIds.length > 0) {
            dispatch(deleteSelectedContacts(deleteIds));
        }
        else {
            toast.info("Please select contacts to be deleted.")
        }
    };

    return (
        <Container fluid className='view-contact px-sm-2 px-0'>
            <Header image={HeaderImg} text={'View Contacts'} />
            <Row className='mx-auto'>
                <Col className='mx-auto col-xl-10 col-12 px-sm-2 px-0'>
                    <div className='action_button mt-2 d-flex flex-sm-row flex-column-reverse justify-content-between align-items-sm-center align-items-start'>
                        {/* <ButtonNormal name='DeleteBtn' id='DeleteBtn' cName='danger mb-sm-0 mb-4' value="Delete Selected" action={handleDeleteSelected} /> */}
                        <UseAnimations animation={trash} size={25} speed={.5} className="ico" onClick={(e) => handleDeleteSelected(e)}
                            render={(eventProps, animationProps) => (
                                <button type="button" title="Delete Contact" className="btn danger mb-sm-0 mb-4" name='DeleteBtn' id='DeleteBtn' {...eventProps}>
                                    <div {...animationProps} />
                                    <span>Delete Selected</span>
                                </button>
                            )}
                        />
                        <SearchBar cName='display-table-search' />
                    </div>
                    <DisplayTable deleteIds={deleteIds} setDeleteIds={setDeleteIds} />
                    <div className={`text-center ${contacts.length !== 0 ? 'd-flex justify-content-center' : 'd-none'}`}>
                        <Pagination />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ViewContacts