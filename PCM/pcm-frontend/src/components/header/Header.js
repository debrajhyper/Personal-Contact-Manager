import React from 'react'

import './header.scss';

import { Image } from 'react-bootstrap';

const Header = ({ image, text }) => {
    return (
        <div className='header'>
            {image && <Image src={image} className="img" alt="img" />}
            <h4 className="text">{text}</h4>
        </div>
    )
}

export default Header