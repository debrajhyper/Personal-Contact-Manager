import React, { useState } from 'react';
import { lazy } from 'react';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ABOUT_PATH, ADD_CONTACT_PATH, BASE_PATH, DASHBOARD_PATH, EDIT_CONTACT_CID_PATH, FORGOT_PASSWORD_PATH, LOGIN_PATH, NO_MATCH_PATH, PROFILE_PATH, RESET_PASSWORD_PATH, SETTINGS_PATH, SIGNUP_PATH, TERMS_CONDITIONS_PATH, VERIFY_OTP_PATH, VIEW_CONTACTS_PATH, VIEW_CONTACT_CID_PATH } from './Route';

import { useSelector } from 'react-redux';

import Layout from './pages/Layout';
import RequireAuth from './pages/RequireAuth';
import { Navbar as PublicNavbar, Navbar as PrivateNavbar, SlideBar, Loading } from './components/index';

const Home = lazy(() => import('./pages/public/Home'));
const About = lazy(() => import('./pages/public/About'));
const Login = lazy(() => import('./pages/public/Login'));
const ForgotPassword = lazy(() => import('./pages/public/ForgotPassword'));
const VerifyOTP = lazy(() => import('./pages/public/VerifyOTP'));
const ResetPassword = lazy(() => import('./pages/public/ResetPassword'));
const Signup = lazy(() => import('./pages/public/Signup'));
const TermsConditions = lazy(() => import('./pages/public/TermsConditions'));
const NoMatchFound = lazy(() => import('./pages/NoMatchFound'));
const Dashboard = lazy(() => import('./pages/private/Dashboard'));
const ViewContacts = lazy(() => import('./pages/private/ViewContacts'));
const ViewContact = lazy(() => import('./pages/private/ViewContact'));
const EditContact = lazy(() => import('./pages/private/EditContact'));
const AddContact = lazy(() => import('./pages/private/AddContact'));
const Profile = lazy(() => import('./pages/private/Profile'));
const Settings = lazy(() => import('./pages/private/Settings'));

const App = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const [show, setShow] = useState(window.innerWidth > 990 ? true : false);

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
                <div className={isLoggedIn ? 'private_pages' : 'public_pages'}>
                    <div className={isLoggedIn ? 'content position-relative' : 'position-relative'}>
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
                        <Suspense fallback={<Loading />}>
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
                        </Suspense>
                    </div>
                </div>
            </div>
            <div className={`slidebar-overlay ${show ? "open" : ""}`} onClick={handleSlidebar}></div>
        </>
    )
}

export default App
