import React from 'react';

import './header.scss';

import { Image } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

const Header = ({ image, text, loading }) => {
    return (
        <div className='header'>
            { image && <Image src={image} className="img" alt="img" /> }
            { loading ? <Skeleton containerClassName='skeleton_text' height={38} /> : <h4 className="text">{text}</h4> }
        </div>
    )
}

export default Header