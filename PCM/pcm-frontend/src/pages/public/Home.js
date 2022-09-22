import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { DASHBOARD_LINK, LOGIN_LINK } from '../../Route';

import { useSelector } from 'react-redux';

import heroContacts from '../../img/hero-contacts.png';
import heroJoinedUs from '../../img/hero-joinedUs.png';
import heroLastLogin from '../../img/hero-lastLogin.png';
import heroTotalContacts from '../../img/hero-totalContacts.png';
import heroRole from '../../img/hero-role.png';
import '../../sass/public/home.scss';

import { Button, Row, Col, Image } from 'react-bootstrap';

const Home = () => {
    const { isLoggedIn } = useSelector(state => state.auth);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || DASHBOARD_LINK;

    useEffect(() => {
        if (isLoggedIn) {
            navigate(from, { replace: true });
        }
    }, [isLoggedIn, navigate, from]);

    return (
        <>
            {/* <section className="banner d-flex justify-content-center align-items-center">
                <div className="text text-center">
                    <h1 className="font-weight-bold">Personal Contact Manager</h1>
                    <p>
                        PCM is the web portal to Collecting your contacts in very Smarter way. We provide very efficient and smarter way of handling contacts.
                    </p>
                    <Button as={Link} to={LOGIN_LINK} className="bg-navbar text-white" size="lg">Get Started</Button>
                </div>
            </section> */}
            <section className="public_pages home">
                <div className='hero'>
                    <Row className=''>
                        <Col className='text'>
                            <h1 className="font-weight-bold">Your Next Contact Management Platform</h1>
                            <p>
                                PCM is the web portal to Collecting your contacts in very Smarter way. We provide very efficient and smarter way of handling contacts.
                            </p>
                            <Button as={Link} to={LOGIN_LINK} className="bg-navbar" size="lg">Get Started</Button>
                        </Col>
                        <Col className='col-7 py-0'>
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
                <div className='features'>
                    <div className='text'>
                        <h1 className="font-weight-bold">Features</h1>
                        <p>
                            PCM is the web portal to Collecting your contacts in very Smarter way. We provide very efficient and smarter way of handling contacts.
                        </p>
                    </div>
                    <Row>
                        <Col className='manage_ring'>
                        </Col>
                        <Col className='manage_details'>
                        </Col>
                    </Row>

                </div>

            </section>
        </>
    )
}

export default Home
