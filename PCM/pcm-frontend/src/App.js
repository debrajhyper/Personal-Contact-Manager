import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Layout from './pages/Layout';
import RequireAuth from './pages/RequireAuth';
import { Navbar as PublicNavbar, Navbar as PrivateNavbar, SlideBar } from './components/index';
import About from './pages/public/About';
import Login from './pages/public/Login';
import Signup from './pages/public/Signup';
import TermsConditions from './pages/public/TermsConditions';
import NoMatchFound from './pages/NoMatchFound';
import Dashboard from './pages/private/Dashboard';
import ViewContacts from './pages/private/ViewContacts';
import ViewContact from './pages/private/ViewContact';
import AddContact from './pages/private/AddContact';
import EditContact from './pages/private/EditContact';
import Profile from './pages/private/Profile';
import Settings from './pages/private/Settings';
import Home from './pages/public/Home';
import ForgotPassword from './pages/public/ForgotPassword';
import VerifyOTP from './pages/public/VerifyOTP';
import ResetPassword from './pages/public/ResetPassword';


// import Base from './pages/public/Base';
// import PrivateBase from './pages/private/PrivateBase';

const App = () => {
    const auth = useSelector(state => state.auth);
    const [show, setShow] = useState(true);

    const handleSlidebar = () => {
        setShow(!show);
    };

    return (
        <>
            {/* {auth.isLoggedIn ? <PrivateBase /> : <Base />} */}

            <div className={auth.isLoggedIn ? `private_base h-100 ${show ? "slideBar_open" : "slideBar_close"}` : "base"}>
                {auth.isLoggedIn
                    ? (
                        <>
                            <PrivateNavbar slidebar={show} handleSlidebar={handleSlidebar} />
                            <SlideBar slidebar={show} />
                        </>
                    )
                    : (<PublicNavbar />)
                }
                <div className={auth.isLoggedIn ? 'private_pages' : 'public_pages12'}>
                    <div className={auth.isLoggedIn ? 'content position-relative' : null}>
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
                            <Route path="/" element={<Layout />} >
                                <Route path="/" element={<Home />} />
                                <Route path="about" element={<About />} />
                                <Route path="login" element={<Login />} />
                                <Route path="forgot-password" element={<ForgotPassword />} />
                                <Route path="verify-otp" element={<VerifyOTP />} />
                                <Route path="reset-password" element={<ResetPassword />} />
                                <Route path="signup" element={<Signup />} />
                                <Route path="terms-conditions" element={<TermsConditions />} />

                                <Route element={<RequireAuth />} >
                                    <Route path="dashboard" element={<Dashboard />} />
                                    <Route path="view_contacts" element={<ViewContacts />} />
                                    <Route path="view_contact/:cid" element={<ViewContact />} />
                                    <Route path="edit_contact/:cid" element={<EditContact />} />
                                    <Route path="add_contact" element={<AddContact />} />
                                    <Route path="profile" element={<Profile />} />
                                    <Route path="settings" element={<Settings />} />
                                    {/* <Route path="*" element={<Dashboard />} /> */}
                                </Route>

                                <Route path="*" element={<NoMatchFound />} />
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
