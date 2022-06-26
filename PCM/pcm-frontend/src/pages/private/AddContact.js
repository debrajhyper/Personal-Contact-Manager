import React from 'react'
import { ToastContainer } from 'react-toastify';

import { Header } from '../../components/index';
import EditContact from './EditContact';

import HeaderImg from '../../img/pcm_add_contact.png';

import { Container, Row, Col } from 'react-bootstrap';

const AddContact = () => {
    return (
        <Container fluid className='add-contact'>
            <ToastContainer
                theme='colored'
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

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