import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

import '../../sass/public/home.scss';

import { Button } from 'react-bootstrap';

const Home = () => {
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
            <section className="banner d-flex justify-content-center align-items-center">
                <div className="text text-center">
                    <h1 className="font-weight-bold">Personal Contact Manager</h1>
                    <p>
                        PCM is the web portal to Collecting your contacts in very Smarter way. We provide very efficient and smarter way of handling contacts.
                    </p>
                    <Button as={Link} to={"/login"} className="bg-navbar text-white" size="lg">Get Started</Button>
                </div>
            </section>
        </>
    )
}

export default Home
