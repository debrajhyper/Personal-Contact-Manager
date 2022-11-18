import React from 'react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

import AddContactImg from '../../img/pcm_add_contact.png';

import ContactForm from './ContactForm';
import { Header } from '../../components/index';
import { Container, Row, Col } from 'react-bootstrap';

const AddContact = () => {
    useDocumentTitle('Add Contact');
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