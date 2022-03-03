import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Navbar as PublicNavbar } from '../../components'
import Home from './Home'
import About from './About'
import Login from './Login'
import Signup from './Signup'
import TermsConditions from './terms-conditions'

const Base = () => {
    return (
        <div className="base">
            <PublicNavbar/>
            <div className='public_pages12'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/terms-conditions" element={<TermsConditions />} />
                    {/* <Navigate to="/"/> */}
                </Routes>
            </div>
        </div>
    )
}

export default Base
