import React, { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

const About = () => {
    const auth = useSelector(state => state.auth);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    useEffect(() => {
        if (auth.isLoggedIn) {
            navigate(from, { replace: true });
        }
    }, [auth]);
    
    return (
        <>
            <section className="public_pages">
                <h1>this is about page</h1>
            </section>
        </>
    )
}

export default About
