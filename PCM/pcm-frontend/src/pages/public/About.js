import React, { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import { DASHBOARD_LINK } from "../../Route";

import { useSelector } from 'react-redux';

const About = () => {
    const { isLoggedIn } = useSelector(state => state.auth);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || DASHBOARD_LINK;

    useEffect(() => {
        if (isLoggedIn) {
            navigate(from, { replace: true });
        }
    }, [isLoggedIn, navigate, from]);
    
    return (
        <>
            <section className="public_pages">
                <h1>this is about page</h1>
            </section>
        </>
    )
}

export default About
