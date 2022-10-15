import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import { DASHBOARD_LINK } from "../../Route";

import { useSelector } from 'react-redux';

import '../../sass/public/about.scss';

const About = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const [markdown, setMarkdown] = useState('');

    const fileName = 'README.md';
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || DASHBOARD_LINK;

    useEffect(() => {
        if (isLoggedIn) {
            navigate(from, { replace: true });
        }
    }, [isLoggedIn, navigate, from]);

    useEffect(() => {
        import(`../../markdown/${fileName}`)
            .then(res => {
                fetch(res.default)
                    .then(res => res.text())
                    .then(res => setMarkdown(res))
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    })

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