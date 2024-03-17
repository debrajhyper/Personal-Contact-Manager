import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import Markdown from 'markdown-to-jsx';

import { DASHBOARD_LINK } from "../../Route";

import { useSelector } from 'react-redux';

import '../../sass/public/about.scss';

const About = () => {
    useDocumentTitle('About');
    const { isLoggedIn } = useSelector(state => state.auth);
    const [markdown, setMarkdown] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || DASHBOARD_LINK;

    useEffect(() => {
        if (isLoggedIn) {
            navigate(from, { replace: true });
        }
    }, [isLoggedIn, navigate, from]);

    useEffect(() => {
        async function getReadme() {
            const response = await axios.get(process.env.REACT_APP_ABOUT_README_URL);
            const data = await response.data;
            setMarkdown(data);
        }
        getReadme();
    }, [])

    return (
        <div className="about">
            <article className="article">
                <div className="container">
                    <div className="post-wrapper">
                        <Markdown>
                            {markdown}
                        </Markdown>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default About