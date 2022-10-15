import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { DASHBOARD_LINK } from '../../Route';

import { useSelector } from 'react-redux';

import '../../sass/public/home.scss';

import { HeroSection, FeatureSection, QuestionSection, ContactMeSection, FooterMainSection, FooterSubSection, FooterSocialSection } from '../../components/index';

const Home = () => {
    const { isLoggedIn } = useSelector(state => state.auth);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || DASHBOARD_LINK;
    const sectionRef = useRef();

    useEffect(() => {
        if (isLoggedIn) {
            navigate(from, { replace: true });
        }
    }, [isLoggedIn, navigate, from]);

    const handleSeeContactSection = () => {
        const section = sectionRef.current
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

    return (
        <div className="home">
            <HeroSection />
            <FeatureSection />
            <QuestionSection scrollToContactSection={handleSeeContactSection} />
            <ContactMeSection sectionRef={sectionRef} />
            <FooterMainSection />
            <FooterSocialSection />
            <FooterSubSection />
        </div>
    )
}

export default Home
