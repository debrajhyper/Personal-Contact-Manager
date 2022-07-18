import React, { useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { viewContact } from '../../services/index';

import { ToastContainer } from 'react-toastify';

import { Header } from '../../components/index';
import ContactForm from './ContactForm';

import { contactValidate } from '../../validation/validationMsg'
import useForm from '../../validation/useForm';

import AddContactImg from '../../img/pcm_add_contact.png';
import EditContactImg from '../../img/pcm_edit_profile.png';

import { Container, Row, Col } from 'react-bootstrap';

const EditContact = () => {
    const { cid } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    console.log(cid, location.pathname);

    useEffect(() => {
        if(cid) {
            dispatch(viewContact(cid));
        }
    }, [cid, dispatch]);

    return (
        <Container fluid className='add-contact'>
            <Header image={EditContactImg} text={'Edit Contact'} />
            <Row className="mx-auto">
                <Col xl={11} md={12} className="mx-auto">
                    <ContactForm />
                </Col>
            </Row>
        </Container>
    )
}

export default EditContact