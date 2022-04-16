import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import profileImage from "../../img/default.png";

import { useDispatch } from 'react-redux';
import { logoutUser } from '../../services/index';

import './slidebar.scss'

import { FaUserCircle, FaAddressBook, FaIdBadge, FaAddressCard, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import { Image } from 'react-bootstrap';

    const icoMin = 24;
    const icoMax= 28;

const SlideBar = ({ slidebar }) => {

    const dispatch = useDispatch();
    const icoSize = (slidebar ? icoMin : icoMax);

    const logoutHandler = () => {
        dispatch(logoutUser());
    }

    return (
        <div className="content-wrapper">
            <div className={`sidebar ${slidebar ? "show" : "" }`}>
                <Nav>
                    <Nav.Link as={NavLink} to={"/user/dashboard"}><FaUserCircle size={icoSize}/><span>Dashboard</span></Nav.Link>
                    <Nav.Link as={NavLink} to={"/user/view_contacts"}><FaAddressBook size={icoSize}/><span>View Contacts</span></Nav.Link>
                    <Nav.Link as={NavLink} to={"/user/add_contact"}><FaIdBadge size={icoSize}/><span>Add Contact</span></Nav.Link>
                    <Nav.Link as={NavLink} to={"/user/profile"}><FaAddressCard size={icoSize}/><span>Profile</span></Nav.Link>
                    <Nav.Link as={NavLink} to={"/user/settings"}><FaUserCog size={icoSize}/><span>Settings</span></Nav.Link>
                </Nav>
                <footer>
                    <Image src={profileImage} alt="profile_img"/>
                    <Link to={"/logout"} className="user-details" onClick={logoutHandler}>
                        <span>Logout</span>
                        <FaSignOutAlt size={24} title="Logout"/>
                    </Link>
                </footer>
            </div>
        </div>
    )
}

export default SlideBar
