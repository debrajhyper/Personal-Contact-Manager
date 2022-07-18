import React, { useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { editContact } from '../../services/index';

import { ToastContainer } from 'react-toastify';

import { Header } from '../../components/index';
import ContactForm from './ContactForm';

import { contactValidate } from '../../validation/validationMsg'
import useForm from '../../validation/useForm';

import AddContactImg from '../../img/pcm_add_contact.png';
import EditContactImg from '../../img/pcm_edit_profile.png';

import { Container, Row, Col } from 'react-bootstrap';

const AddContact = () => {
    const { handleReset, setValues } = useForm(contactValidate)
    const { cid } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const viewContact = useSelector(state => state.viewContact.contact);
    const viewContactError = useSelector(state => state.viewContact.error);
    console.log(cid, location.pathname);

    // useEffect(() => {
    //     if(cid) {
    //         dispatch(editContact(cid));
    //     }
    // }, [cid, dispatch]);

    // useEffect(() => {
    //     if(editContactError !== '') {
    //         navigate('/view_contacts');
    //     }
    // }, [editContactError, navigate]);

    // const header = () => {
    //     if(location.pathname.includes('add_contact')) {
    //         return <Header image={AddContactImg} text={'Add Contact'} />
    //     }
    //     if(location.pathname.includes('edit_contact')) {
    //         return <Header image={EditContactImg} text={'Edit Contact'} />
    //     }
    // }

    return (
        <Container fluid className='add-contact'>
            <Header image={AddContactImg} text={'Add Contact'} />
            <Row className="mx-auto">
                <Col xl={11} md={12} className="mx-auto">
                    <ContactForm />
                </Col>
            </Row>
        </Container>
    )
}

export default AddContact