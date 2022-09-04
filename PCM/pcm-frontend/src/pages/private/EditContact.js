import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { viewContact } from '../../services/index';

import EditContactImg from '../../img/pcm_edit_profile.png';

import ContactForm from './ContactForm';
import { Header } from '../../components/index';
import { Container, Row, Col } from 'react-bootstrap';

const EditContact = () => {
    const { success } = useSelector(state => state.updateContact);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cid } = useParams();

    useEffect(() => {
        if (cid) {
            dispatch(viewContact(cid));
        }
    }, [cid, dispatch]);

    useEffect(() => {
        if (success) {
            navigate(-1);
        }
    }, [success, navigate]);

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