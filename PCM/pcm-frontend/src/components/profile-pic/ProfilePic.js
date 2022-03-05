import React from 'react';

import './profile_pic.scss';

import {  Image } from 'react-bootstrap';
import { GoPrimitiveDot } from 'react-icons/go';


const ProfilePic = ({ image, outline, active }) => {
    return (
        <div className={`glass-border ${outline ? 'on' : 'off'}`}>
            <Image src={ image } className="profile_pic" alt="profile_pic"/>
            {
                active && 
                <GoPrimitiveDot className='active-overlay' title='Active'/>
            }
        </div>
    )
}

export default ProfilePic