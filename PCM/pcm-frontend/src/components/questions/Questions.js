import React from 'react';

import './questions.scss';

import { Accordion, Container } from 'react-bootstrap';

const Questions = () => {

    const tabs = [
        { id: 1, label: "UX/UI DESIGN", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum." },
        { id: 2, label: "Tab 2", description: "Content of Tab 2" },
        { id: 3, label: "Tab 3", description: "Content of Tab 3" }
    ];

    return (
        <section className='questions b o'>
            <Container className='b o'>
                <Accordion className='b o'>
                    {
                        tabs.map(tab => (
                            <Accordion.Item key={tab.id} eventKey={tab.id}>
                                <Accordion.Header>{tab.label}</Accordion.Header>
                                <Accordion.Body>{tab.description}</Accordion.Body>
                            </Accordion.Item>
                        ))
                    }
                </Accordion>
            </Container>
        </section>
    )
}

export default Questions