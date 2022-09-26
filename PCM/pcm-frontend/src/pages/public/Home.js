import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { DASHBOARD_LINK } from '../../Route';

import { useSelector } from 'react-redux';

import '../../sass/public/home.scss';

import { HeroSection, FeatureSection } from '../../components/index';

const Home = () => {
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
        <div className="home">
            <HeroSection />
            <FeatureSection />
        </div>
    )
}

export default Home
