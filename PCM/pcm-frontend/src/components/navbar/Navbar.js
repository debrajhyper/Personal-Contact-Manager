import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { ABOUT_LINK, BASE_PATH, DASHBOARD_LINK, LOGIN_LINK, PROFILE_LINK, SIGNUP_LINK } from '../../Route';

import { useSelector } from 'react-redux';

import favicon from '../../img/favicon.png';
import profileImage from "../../img/default.png";
import './navbar.scss';

import UseAnimations from 'react-useanimations';
import maximizeMinimize from 'react-useanimations/lib/maximizeMinimize';

import Skeleton from 'react-loading-skeleton';
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import { BsFillHouseFill } from "react-icons/bs";
import { FaAddressCard, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const PublicNavbar = ({ slidebar, handleSlidebar }) => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const { loading, currentUser } = useSelector(state => state.currentUser);
    const { image, name, username } = currentUser;

    const authSlideBar = (slidebar ? "PCM" : "");
    
    const privateNav = (
        <div className="auth-nav">
            <Nav.Link as={Link} to={PROFILE_LINK}>
                <div className='img_container'>
                    {
                        loading
                        ? <Skeleton circle height="100%"/>
                        : <Image src={image ?? profileImage} className="profile_pic" alt="" />
                    }
                </div>
                <div className='details'>
                    <span className='user_name'>{ loading ? <Skeleton width={140} /> : name ?? '-' }</span>
                    <p className='user_email'>{ loading ? <Skeleton width={190} /> : username ?? '-' }</p>
                </div>
            </Nav.Link>
        </div>
    )

    const publicNav = (
        <div className="public-nav">
            <Nav.Link as={NavLink} to={BASE_PATH}><BsFillHouseFill className="ico" size={18} /><span>Home</span></Nav.Link>
            <Nav.Link as={NavLink} to={ABOUT_LINK}><FaAddressCard className="ico" size={18} /><span>About</span></Nav.Link>
            <Nav.Link as={NavLink} to={LOGIN_LINK}><FaSignInAlt className="ico" size={18} /><span>Login</span></Nav.Link>
            <Nav.Link as={NavLink} to={SIGNUP_LINK}><FaUserPlus className="ico" size={18} /><span>Signup</span></Nav.Link>
        </div>
    )

    return (
        <Navbar collapseOnSelect expand="lg" id="navbar" className={`bg-navbar pe-md-4 p-0 ${isLoggedIn ? "ps-md-2 user-navbar" : "ps-md-4"}`} variant="dark" fixed="top">
            <Container fluid>
                <Navbar.Brand className="navbar-header d-inline-flex justify-content-start align-items-center">
                    <img alt="logo" src={favicon} className="d-inline-block align-top me-1" />{' '}
                    {
                        isLoggedIn
                        ? (
                            <>
                                <Link to={DASHBOARD_LINK} className="navbar-brand pcm">{authSlideBar}</Link>
                                <UseAnimations animation={maximizeMinimize} size={28} speed={.9} reverse={true} className="ico" onClick={handleSlidebar}
                                    render={(eventProps, animationProps) => (
                                        <div className={`slidebar_ico ${authSlideBar}`} {...eventProps}>
                                            <div {...animationProps} />
                                        </div>
                                    )}
                                />
                            </>
                        )
                        : <Link to={BASE_PATH} className="navbar-brand">Personal Contact Manager</Link>
                    }
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className={`justify-content-end ${isLoggedIn ? "not-collapse d-inline-flex" : null}`}>
                    <Nav className={`text-uppercase d-flex ${isLoggedIn ? "justify-content-end" : ""}`}>
                        { isLoggedIn ? privateNav : publicNav }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default PublicNavbar
