import React from 'react';

import './question_section.scss';

import { Accordion, Container } from 'react-bootstrap';

const QuestionSection = ({ scrollToContactSection }) => {

    const tabs = [
        {   
            id: 1, 
            color: "orange", 
            label: "What is Personal Contact Manager?", 
            description: "Personal Contact Manager is a web portal for collecting contacts in a very smart way. Contact management with PCM is very efficient and smarter. The Contact Management System has all the basic features of any management system."
        },
        { 
            id: 2, 
            color: "green", 
            label: "Why Personal Contact Manager?", 
            description: "Personal Contact Manager is an easy-to-use web portal for collecting contacts. If you have forgotten the address book to your favorite contact, Personal Contact Manager can help you find it."
        },
        { 
            id: 3, 
            color: "pink", 
            label: "How to add contacts?", 
            description: "Stay on top of your contact information by organizing your records into contacts that are meaningful to you - whether that's geographical location, company or interest group. Add as many contacts as you like!"
        },
        { 
            id: 4, 
            color: "blue", 
            label: "Finding any contacts", 
            description: "Quickly find personal information like email addresses and phone numbers of your contacts with our advanced search technique."
        },
        { 
            id: 5, 
            color: "violet", 
            label: "Management of contacts", 
            description: "Personal Contact Manager is a free online service that lets you create, organize and share contacts from anywhere. With over 10+ fields organized across many sections to collect your contact's information, there's no better way to manage all your data."
        },
        { 
            id: 6, 
            color: "cyan", 
            label: "Upcoming Features!", 
            description: "Oauth 2 Login/Signup with Personal Contact Manager."
        },
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