import React from 'react'
import { NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import profileImage from "../../img/default.png";

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../services/index';

import './slidebar.scss'

import { FaUserCircle, FaAddressBook, FaIdBadge, FaAddressCard, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import { Image } from 'react-bootstrap';

    const icoMin = 24;
    const icoMax= 28;

const SlideBar = ({ slidebar }) => {

    const dispatch = useDispatch();
    const { image } = useSelector(state => state.currentUser.currentUser);
    const icoSize = (slidebar ? icoMin : icoMax);

    const logoutHandler = () => {
        dispatch(logoutUser('/login'));
    }

    return (
        <div className="content-wrapper">
            <div className={`sidebar ${slidebar ? "show" : "" }`}>
                <Nav>
                    <Nav.Link as={NavLink} to={"/dashboard"}><FaUserCircle size={icoSize}/><span>Dashboard</span></Nav.Link>
                    <Nav.Link as={NavLink} to={"/view_contacts"}><FaAddressBook size={icoSize}/><span>View Contacts</span></Nav.Link>
                    <Nav.Link as={NavLink} to={"/add_contact"}><FaIdBadge size={icoSize}/><span>Add Contact</span></Nav.Link>
                    <Nav.Link as={NavLink} to={"/profile"}><FaAddressCard size={icoSize}/><span>Profile</span></Nav.Link>
                    <Nav.Link as={NavLink} to={"/settings"}><FaUserCog size={icoSize}/><span>Settings</span></Nav.Link>
                </Nav>
                <footer>
                    <div className='img_container'>
                        <Image src={image ?? profileImage} className="profile_pic" alt="" />
                    </div>
                    <div className="user-details" onClick={logoutHandler}>
                        <span>Logout</span>
                        <FaSignOutAlt size={24} title="Logout"/>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default SlideBar
