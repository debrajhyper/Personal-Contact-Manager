import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import favicon from '../../img/favicon.png';
import profileImage from "../../img/default.png";

import './navbar.scss';

import { BsFillHouseFill, BsFillPersonLinesFill } from "react-icons/bs";
import { FaAddressCard, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Navbar, Container, Nav, Image } from 'react-bootstrap';

import LoginServices from "../../services/LoginServices";
import AuthServices from '../../services/AuthServices';


const PublicNavbar = (props) => {

    const authLogin = (LoginServices.isLoggedIn());
    const authslideBar = (props.slidebar ? "PCM" : "");


    const authNav = () => {
        if(authLogin) {
            return <div className="auth-nav">
                <Nav.Link as={Link} to={"/profile"}>
                    <Image src={ profileImage } alt="profile_img"/>
                    <span>{AuthServices.getUser().name}</span>
                </Nav.Link>
            </div>
        } else {
            return <div className="public-nav">
                <Nav.Link as={NavLink} to={"/"}><BsFillHouseFill className="ico" size={18}/><span>Home</span></Nav.Link>
                <Nav.Link as={NavLink} to={"/about"}><FaAddressCard className="ico" size={18}/><span>About</span></Nav.Link>
                <Nav.Link as={NavLink} to={"/login"}><FaSignInAlt className="ico" size={18}/><span>Login</span></Nav.Link>
                <Nav.Link as={NavLink} to={"/signup"}><FaUserPlus className="ico" size={18}/><span>Signup</span></Nav.Link>
            </div>
        }
    }
    

    return (
        <>
            <Navbar collapseOnSelect expand="lg" id="navbar" className={`bg-navbar pe-md-4 p-0 ${authLogin ? "ps-md-2 user-navbar" : "ps-md-4"}`} variant="dark" fixed="top">
                <Container fluid>
                    <Navbar.Brand className="navbar-header d-flex justify-content-start align-items-center">
                        <img alt="logo" src={favicon} className="d-inline-block align-top me-1"/>{' '}
                        { authLogin 
                            ?  ( <>
                                    <Link to="/dashboard" className="navbar-brand">{authslideBar}</Link>
                                    <BsFillPersonLinesFill className={`slidebar_ico ${authslideBar}`} size={25} onClick={props.handleSlidebar}/>
                                </>)
                            : <Link to="/" className="navbar-brand">Personal Contact Manager</Link>
                        }
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav className={`text-uppercase d-flex ${authLogin ? "justify-content-end" : ""}`}>
                            { authNav() }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default PublicNavbar
