import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { BASE_PATH, ABOUT_PATH, LOGIN_PATH, SIGNUP_PATH, TERMS_CONDITIONS_PATH } from '../../Route';

import favicon from '../../img/favicon.png';
import './footer_section.scss';

import { Col, Container, Row, Image } from 'react-bootstrap';

const FooterMainSection = () => {
  return (
    <footer className='footer_main'>
      <Container className=''>
        <Row>
          <Col xl={6} md={12} className='col'>
            <div className='logo_text'>
              <span className='logo'>
                <Link to={BASE_PATH} className="navbar-brand">
                  <Image alt="" src={favicon} />
                  <h1>Personal Contact Manager</h1>
                </Link>
              </span>
              <p className='text'>
                PCM is a web portal for collecting contacts in a very smart way. Contact management with PCM is very efficient and smarter.
              </p>
            </div>
          </Col>
          <Col xl={3} md={6} sm={6} xs={5} className='col'>
            <h2>Categories</h2>
            <div className='links'>
              <Link to={BASE_PATH} className='no-arrow'>Home</Link>
              <Link to={ABOUT_PATH} className='no-arrow'>About</Link>
              <Link to={LOGIN_PATH} className='no-arrow'>Login</Link>
              <Link to={SIGNUP_PATH} className='no-arrow'>Signup</Link>
            </div>
          </Col>
          <Col xl={3} md={6}  className='col'>
            <h2>Quick Links</h2>
            <div className='links'>
              <HashLink to='#Contact-me' className='animated-arrow'>
                <span className='the-arrow -left'><span className='shaft'></span></span>
                <span className='main'>
                  <span className='text'>Contact Me</span>
                  <span className='the-arrow -right'><span className='shaft'></span></span>
                </span>
              </HashLink>
              <HashLink to='#Question' className='animated-arrow'>
                <span className='the-arrow -left'><span className='shaft'></span></span>
                <span className='main'>
                  <span className='text'>FAQ</span>
                  <span className='the-arrow -right'><span className='shaft'></span></span>
                </span>
              </HashLink>
              <Link to={TERMS_CONDITIONS_PATH} className='animated-arrow'>
                <span className='the-arrow -left'><span className='shaft'></span></span>
                <span className='main'>
                  <span className='text'>Terms of Service</span>
                  <span className='the-arrow -right'><span className='shaft'></span></span>
                </span>
              </Link>
              <a href='https://fueler.io/debraj/work' target="blank" className='animated-arrow'>
                <span className='the-arrow -left'><span className='shaft'></span></span>
                <span className='main'>
                  <span className='text'>View other Projects</span>
                  <span className='the-arrow -right'><span className='shaft'></span></span>
                </span>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default FooterMainSection