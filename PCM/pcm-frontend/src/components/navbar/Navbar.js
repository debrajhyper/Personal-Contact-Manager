import React from 'react'
import { Link, NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

import favicon from '../../img/favicon.png';
import profileImage from "../../img/default.png";

import './navbar.scss';

import { BsFillHouseFill, BsFillPersonLinesFill } from "react-icons/bs";
import { FaAddressCard, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Navbar, Container, Nav, Image } from 'react-bootstrap';

const PublicNavbar = ({ slidebar, handleSlidebar }) => {
    const auth = useSelector(state => state.auth);
    const { currentUser } = useSelector(state => state.currentUser);
    const { image, name = '-', username = '-' } = currentUser;

    const authSlideBar = (slidebar ? "PCM" : "");

    const privateNav = (
        <div className="auth-nav">
            <Nav.Link as={Link} to={"/profile"}>
                <Image src={image ?? profileImage} alt="profile_img" />
                <div className='details'>
                    <span>{name}</span>
                    <p>{username}</p>
                </div>
            </Nav.Link>
        </div>
    )

    const publicNav = (
        <div className="public-nav">
            <Nav.Link as={NavLink} to={"/"}><BsFillHouseFill className="ico" size={18} /><span>Home</span></Nav.Link>
            <Nav.Link as={NavLink} to={"/about"}><FaAddressCard className="ico" size={18} /><span>About</span></Nav.Link>
            <Nav.Link as={NavLink} to={"/login"}><FaSignInAlt className="ico" size={18} /><span>Login</span></Nav.Link>
            <Nav.Link as={NavLink} to={"/signup"}><FaUserPlus className="ico" size={18} /><span>Signup</span></Nav.Link>
        </div>
    )


    return (
        <>
            <Navbar collapseOnSelect expand="lg" id="navbar" className={`bg-navbar pe-md-4 p-0 ${auth.isLoggedIn ? "ps-md-2 user-navbar" : "ps-md-4"}`} variant="dark" fixed="top">
                <Container fluid>
                    <Navbar.Brand className="navbar-header d-inline-flex justify-content-start align-items-center">
                        <img alt="logo" src={favicon} className="d-inline-block align-top me-1" />{' '}
                        {auth.isLoggedIn
                            ? (
                                <>
                                    <Link to="/dashboard" className="navbar-brand pcm">{authSlideBar}</Link>
                                    <div className={`slidebar_ico ${authSlideBar}`} onClick={handleSlidebar}>
                                        <BsFillPersonLinesFill size={24} />
                                    </div>
                                </>
                            )
                            : <Link to="/" className="navbar-brand">Personal Contact Manager</Link>
                        }
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className={`justify-content-end ${auth.isLoggedIn ? "not-collapse d-inline-flex" : null}`}>
                        <Nav className={`text-uppercase d-flex ${auth.isLoggedIn ? "justify-content-end" : ""}`}>
                            { auth.isLoggedIn ? privateNav : publicNav }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default PublicNavbar
