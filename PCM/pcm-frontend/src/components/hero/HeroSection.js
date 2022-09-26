import React from 'react';
import { Link } from 'react-router-dom';

import { LOGIN_LINK } from '../../Route';

import heroContacts from '../../img/hero-contacts.png';
import cLogin from '../../img/cLogin1.png';
import cTimestamp from '../../img/cTimestamp.png';
import cTotalContacts from '../../img/cTotalContacts.png';
import cRole from '../../img/cRole.png';
import './hero_section.scss';

import DashboardCard from '../dashboardCard/DashboardCard';
import { Button, Row, Col, Image } from 'react-bootstrap';
import { FaUserCheck, FaSignInAlt, FaAddressBook, FaUserShield } from 'react-icons/fa';

const date = () => {
    let date = new Date().toLocaleString('en-in', { year:"numeric", month:"short", day:"numeric", hour: "2-digit", minute: "2-digit"});
    return date;
}

const HeroSection = () => {
    const CardDetails = [
        {
            image: cTimestamp,
            icon: <FaUserCheck />,
            title: 'Joined us on',
            subtitle: date()

        },
        {
            image: cLogin,
            icon: <FaSignInAlt />,
            title: 'Last Login',
            subtitle: date()
        },
        {
            image: cTotalContacts,
            icon: <FaAddressBook />,
            title: 'Total Contacts',
            subtitle: '3000'
        },
        {
            image: cRole,
            icon: <FaUserShield />,
            title: 'Role',
            subtitle: 'ADMIN'
        }
    ]

    return (
        <section className='hero'>
            <Row>
                <Col className='text'>
                    <article>
                        <h1 className="font-weight-bold">Your Next Contact Management Platform</h1>
                        <p>PCM is a web portal for collecting contacts in a very smart way. Contact management with PCM is very efficient and smarter.</p>
                        <Button as={Link} to={LOGIN_LINK} className="bg-navbar" size="lg">Get Started</Button>
                    </article>
                </Col>
                <Col className='hero_container col-lg-7 col-12 p-0 position-relative'>
                    <div className='hero_contacts'>
                        <Image src={heroContacts} alt="" />
                    </div>
                    <div className='hero_dashboard'>
                        {
                            CardDetails.map((card, index) => {
                                const { image, icon, title, subtitle } = card;
                                return (
                                    <DashboardCard key={index} cName='hero_card' image={image} icon={icon} title={title} subtitle={subtitle} />
                                )
                            })
                        }
                    </div>
                </Col>
            </Row>
        </section>
    )
}

export default HeroSection