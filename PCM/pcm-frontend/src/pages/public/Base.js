import React from 'react'
import { Routes, Route } from 'react-router-dom'

import PublicNavbar from '../../components/public-navbar/Navbar'
import Home from './Home'
import About from './About'
import Login from './Login'
import Signup from './Signup'
import TermsConditions from './terms-conditions'

const Base = () => {
    return (
        <div className="base">
            <PublicNavbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                {/* <Navigate to="/"/> */}
            </Routes>
        </div>
    )
}

export default Base
