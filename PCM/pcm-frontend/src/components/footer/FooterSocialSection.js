import React from 'react';

import { excluded } from '../../validation/validationMsg';

import SocialIcon from '../social-icon/SocialIcon';
import { Container, Row } from 'react-bootstrap';
import { FaGithub, FaTwitter, FaLinkedinIn, FaInstagram, FaLink } from 'react-icons/fa';

const FooterSocialSection = () => {
    const SocialDetails = [
        {
            icon: <FaTwitter />,
            title: 'Twitter',
            link: 'https://twitter.com/debraj_010'
        },
        {
            icon: <FaLinkedinIn />,
            title: 'Linkedin',
            link: 'https://www.linkedin.com/in/debrajkarmakar010'
        },
        {
            icon: <FaInstagram />,
            title: 'Instagram',
            link: 'https://www.instagram.com/debraj010'
        },
        {
            icon: <FaGithub />,
            title: 'GitHub',
            link: 'https://github.com/debrajhyper'
        },
        {
            icon: <FaLink />,
            title: 'Website',
            link: 'https://fueler.io/debraj'
        }
    ]
    return (
        <footer className='footer_social'>
            <Container className="text-center">
                <Row className='social-link-row'>
                    <div className='content'>
                        {
                            SocialDetails.map((social, index) => {
                                return (
                                    !excluded?.includes(social.link) && <SocialIcon key={index} icon={social.icon} title={social.title} link={social.link} />
                                )
                            })
                        }
                    </div>
                </Row>
            </Container>
        </footer>
    )
}

export default FooterSocialSection