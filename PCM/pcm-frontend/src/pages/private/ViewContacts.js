import React from 'react'

import { Header, ButtonNormal, SearchBar, DisplayTable, Pagination } from '../../components';

import HeaderImg from '../../img/pcm_view_contacts.png';

import { Container, Row, Col } from 'react-bootstrap';

const ViewContacts = () => {
    return (
        <Container fluid className='view-contact'>
            <Header image={HeaderImg} text={'View Contacts'} />
            <Row className='mx-auto'>
                <Col className='mx-auto col-xl-10 col-12 px-sm-2 px-0'>
                    <div className='action_button mt-2 d-flex flex-sm-row flex-column-reverse justify-content-between align-items-sm-center align-items-start'>
                        <ButtonNormal name='DeleteBtn' id='DeleteBtn' cName='btn form_reset red me-0 mb-sm-0 mb-4' value="Delete Selected" />
                        <SearchBar cName='display-table-search' />
                    </div>
                    <DisplayTable />
                </Col>
            </Row>
        </Container>
    )
}

export default ViewContacts