import React,{ useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar as PrivateNavbar, SlideBar } from '../../components';
import Dashboard from './Dashboard';
import ViewContacts from './ViewContacts';
import AddContact from './AddContact';
import Profile from './Profile';
import Settings from './Settings';

const PrivateBase = () => {
    const [show, setShow] = useState(true);

    //const handleClose = () => setShow(false);
    const handleSlidebar = () => {
        setShow(!show);
    };

    return (
        <div className={`private_base ${show ? "slideBar_open" : "slideBar_close"}`}>
            <PrivateNavbar slidebar={show} handleSlidebar={handleSlidebar}/>
            <SlideBar slidebar={show}/>
            <div className='private_pages'>
                <div className='content'>
                    <Routes>
                        <Route path="/user/dashboard" element={<Dashboard />} />
                        <Route path="/user/view_contacts" element={<ViewContacts />} />
                        <Route path="/user/add_contact" element={<AddContact />} />
                        <Route path="/user/profile" element={<Profile />} />
                        <Route path="/user/settings" element={<Settings />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default PrivateBase
