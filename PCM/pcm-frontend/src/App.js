import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ABOUT_PATH, ADD_CONTACT_PATH, BASE_PATH, DASHBOARD_PATH, EDIT_CONTACT_CID_PATH, FORGOT_PASSWORD_PATH, LOGIN_PATH, NO_MATCH_PATH, PROFILE_PATH, RESET_PASSWORD_PATH, SETTINGS_PATH, SIGNUP_PATH, TERMS_CONDITIONS_PATH, VERIFY_OTP_PATH, VIEW_CONTACTS_PATH, VIEW_CONTACT_CID_PATH } from './Route';

import { useSelector } from 'react-redux';

import Layout from './pages/Layout';
import RequireAuth from './pages/RequireAuth';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Login from './pages/public/Login';
import ForgotPassword from './pages/public/ForgotPassword';
import VerifyOTP from './pages/public/VerifyOTP';
import ResetPassword from './pages/public/ResetPassword';
import Signup from './pages/public/Signup';
import TermsConditions from './pages/public/TermsConditions';
import NoMatchFound from './pages/NoMatchFound';
import Dashboard from './pages/private/Dashboard';
import ViewContacts from './pages/private/ViewContacts';
import ViewContact from './pages/private/ViewContact';
import EditContact from './pages/private/EditContact';
import AddContact from './pages/private/AddContact';
import Profile from './pages/private/Profile';
import Settings from './pages/private/Settings';
import { Navbar as PublicNavbar, Navbar as PrivateNavbar, SlideBar } from './components/index';

const App = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const [show, setShow] = useState(false);

    const handleSlidebar = () => {
        setShow(!show);
    };

    return (
        <>
            <div className={isLoggedIn ? `private_base h-100 ${show ? "slideBar_open" : "slideBar_close"}` : "base"}>
                {   isLoggedIn
                    ? (
                        <>
                            <PrivateNavbar slidebar={show} handleSlidebar={handleSlidebar} />
                            <SlideBar slidebar={show} />
                        </>
                    )
                    : (<PublicNavbar />)
                }
                <div className={isLoggedIn ? 'private_pages' : 'public_pages12'}>
                    <div className={isLoggedIn ? 'content position-relative' : null}>
                        <ToastContainer
                            theme='colored'
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                        <Routes>
                            <Route path={BASE_PATH} element={<Layout />} >
                                <Route path={BASE_PATH} element={<Home />} />
                                <Route path={ABOUT_PATH} element={<About />} />
                                <Route path={LOGIN_PATH} element={<Login />} />
                                <Route path={FORGOT_PASSWORD_PATH} element={<ForgotPassword />} />
                                <Route path={VERIFY_OTP_PATH} element={<VerifyOTP />} />
                                <Route path={RESET_PASSWORD_PATH} element={<ResetPassword />} />
                                <Route path={SIGNUP_PATH} element={<Signup />} />
                                <Route path={TERMS_CONDITIONS_PATH} element={<TermsConditions />} />

                                <Route element={<RequireAuth />} >
                                    <Route path={DASHBOARD_PATH} element={<Dashboard />} />
                                    <Route path={VIEW_CONTACTS_PATH} element={<ViewContacts />} />
                                    <Route path={VIEW_CONTACT_CID_PATH} element={<ViewContact />} />
                                    <Route path={EDIT_CONTACT_CID_PATH} element={<EditContact />} />
                                    <Route path={ADD_CONTACT_PATH} element={<AddContact />} />
                                    <Route path={PROFILE_PATH} element={<Profile />} />
                                    <Route path={SETTINGS_PATH} element={<Settings />} />
                                </Route>

                                <Route path={NO_MATCH_PATH} element={<NoMatchFound />} />
                            </Route>
                        </Routes>
                    </div>
                </div>
            </div>
            <div className={`slidebar-overlay ${show ? "open" : ""}`} onClick={handleSlidebar}></div>
        </>
    )
}

export default App
