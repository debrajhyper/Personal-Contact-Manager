import React from 'react';
import { Link } from 'react-router-dom';

import { LOGIN_LINK } from '../../Route';

import heroContacts from '../../img/hero-contacts.png';
import heroJoinedUs from '../../img/hero-joinedUs.png';
import heroLastLogin from '../../img/hero-lastLogin.png';
import heroTotalContacts from '../../img/hero-totalContacts.png';
import heroRole from '../../img/hero-role.png';
import './hero_section.scss';

import { Button, Row, Col, Image } from 'react-bootstrap';

const HeroSection = () => {
    return (
        <div className='hero'>
            <Row>
                <Col className='text'>
                    <h1 className="font-weight-bold">Your Next Contact Management Platform</h1>
                    <p>
                        PCM is the web portal to Collecting your contacts in very Smarter way. We provide very efficient and smarter way of handling contacts.
                    </p>
                    <Button as={Link} to={LOGIN_LINK} className="bg-navbar" size="lg">Get Started</Button>
                </Col>
                <Col className='col-lg-7 col-12 py-0 position-relative'>
                    <div className='hero_contacts'>
                        <Image src={heroContacts} alt="" />
                    </div>
                    <div className='hero_dashboard'>
                        <div className='hero_card'>
                            <Image src={heroJoinedUs} alt="" />
                        </div>
                        <div className='hero_card'>
                            <Image src={heroLastLogin} alt="" />
                        </div>
                        <div className='hero_card'>
                            <Image src={heroTotalContacts} alt="" />
                        </div>
                        <div className='hero_card'>
                            <Image src={heroRole} alt="" />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default HeroSection