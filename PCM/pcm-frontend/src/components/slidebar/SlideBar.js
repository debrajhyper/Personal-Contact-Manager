import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import profileImage from "../../img/default.png";

import './slidebar.scss'

import { FaUserCircle, FaAddressBook, FaIdBadge, FaAddressCard, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import { Image, div } from 'react-bootstrap';

import AuthServices from '../../services/AuthServices';

    const icoMin = 24;
    const icoMax= 28;

const SlideBar = (props) => {

    const icoSize = (props.slidebar ? icoMin : icoMax);

    return (
        <div className="content-wrapper">
            <div className={`sidebar ${props.slidebar ? "show" : "" }`}>
                <Nav>
                    <Nav.Link as={Link} to={"/user/index"} className="active"><FaUserCircle size={icoSize}/><span>Dashboard</span></Nav.Link>
                    <Nav.Link as={Link} to={"/user/view_contacts/0"}><FaAddressBook size={icoSize}/><span>View Contacts</span></Nav.Link>
                    <Nav.Link as={Link} to={"/user/add_contact"}><FaIdBadge size={icoSize}/><span>Add Contact</span></Nav.Link>
                    <Nav.Link as={Link} to={"/user/profile"}><FaAddressCard size={icoSize}/><span>Profile</span></Nav.Link>
                    <Nav.Link as={Link} to={"/user/settings"}><FaUserCog size={icoSize}/><span>Settings</span></Nav.Link>
                </Nav>
                <footer>
                    <Image src={profileImage} alt="profile_img"/>
                    <Link to={"/logout"} className="user-details">
                        <span>Logout</span>
                        <FaSignOutAlt size={28} title="Logout"/>
                    </Link>
                </footer>
            </div>
        </div>
    )
}

export default SlideBar
