import React from 'react'

import { Header } from '../../components/index';
import EditContact from './EditContact';

import HeaderImg from '../../img/pcm_add_contact.png';

import { Container, Row, Col } from 'react-bootstrap';

const AddContact = () => {
    return (
        <Container fluid className='add-contact'>
            <Header image={HeaderImg} text={'Add Contact'} />
            <Row className="mx-auto">
                <Col xl={11} md={12} className="mx-auto">
                    <EditContact />
                </Col>
            </Row>
        </Container>
    )
}

export default AddContact