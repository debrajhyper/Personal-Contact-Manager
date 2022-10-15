import React from 'react';

import './footer_section.scss';

import { Container } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';

const FooterSubSection = () => {
    return (
        <footer className='footer_sub'>
            <Container className=''>
                <div className='text'>
                    <p className='copyright'>Copyright © 2022 PCM | All rights reserved</p>
                    <p className='made-with'>Made with <FaHeart /> remotely in India</p>
                </div>
            </Container>
        </footer>
    )
}

export default FooterSubSection