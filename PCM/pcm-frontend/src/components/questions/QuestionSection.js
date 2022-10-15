import React from 'react';

import './question_section.scss';

import { Accordion, Container } from 'react-bootstrap';

const QuestionSection = ({ scrollToContactSection }) => {

    const tabs = [
        { id: 1, color: "orange", label: "What is Personal Contact Manager?", description: "Personal Contact Manager is a web portal for collecting contacts in a very smart way. Contact management with PCM is very efficient and smarter. The Contact Management System has all the basic features of any management system."},
        { id: 2, color: "green", label: "What is Personal Contact Manager", description: "Personal Contact Manager is a web portal for collecting contacts in a very smart way. Contact management with PCM is very efficient and smarter. The Contact Management System has all the basic features of any management system."},
        { id: 3, color: "pink", label: "What is Personal Contact Manager", description: "Personal Contact Manager is a web portal for collecting contacts in a very smart way. Contact management with PCM is very efficient and smarter. The Contact Management System has all the basic features of any management system."},
        { id: 4, color: "blue", label: "What is Personal Contact Manager", description: "Personal Contact Manager is a web portal for collecting contacts in a very smart way. Contact management with PCM is very efficient and smarter. The Contact Management System has all the basic features of any management system."},
        { id: 5, color: "violet", label: "What is Personal Contact Manager", description: "Personal Contact Manager is a web portal for collecting contacts in a very smart way. Contact management with PCM is very efficient and smarter. The Contact Management System has all the basic features of any management system."},
        { id: 6, color: "cyan", label: "What is Personal Contact Manager", description: "Personal Contact Manager is a web portal for collecting contacts in a very smart way. Contact management with PCM is very efficient and smarter. The Contact Management System has all the basic features of any management system."},
    ];

    return (
        <section className='questions' id='Question'>
            <Container>
                <div className='text'>
                    <h1>Frequently Asked Questions</h1>
                    <p>Can't able to find answers you're looking for? Reach out to <span onClick={scrollToContactSection}><strong>me.</strong></span></p>
                </div>
                <Accordion>
                    {
                        tabs.map(tab => {
                            const { id, color, label, description } = tab;
                            return (
                                <Accordion.Item key={id} eventKey={id} className={color}>
                                    <Accordion.Header>
                                        {label}
                                        <span className='close'></span>
                                    </Accordion.Header>
                                    <Accordion.Body>{description}</Accordion.Body>
                                </Accordion.Item>
                            )
                        })
                    }
                </Accordion>
            </Container>
        </section>
    )
}

export default QuestionSection