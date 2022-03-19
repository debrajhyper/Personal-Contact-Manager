import React from 'react'

import { Header, ButtonNormal, SearchBar, DisplayTable, Pagination } from '../../components';

import HeaderImg from '../../img/pcm_view_contacts.png';

import { Container, Row, Col } from 'react-bootstrap';

const ViewContacts = () => {
    return (
        <Container fluid className='view-contact'>
            <Header image={HeaderImg} text={'View Contacts'} />
            <Row className='mx-auto'>
                <Col className='mx-auto col-xl-10 col-12'>
                    <div className='action_button mt-2 d-flex justify-content-between align-items-center b'>
                        <ButtonNormal name='DeleteBtn' id='DeleteBtn' cName='btn form_reset red' value="Delete Selected" />
                        <SearchBar cName='w-25' />
                    </div>
                    <DisplayTable />
                </Col>
            </Row>
        </Container>
    )
}

export default ViewContacts