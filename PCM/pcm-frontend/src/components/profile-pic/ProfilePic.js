import React from 'react';

import './profile_pic.scss';

import {  Image } from 'react-bootstrap';
import { GoPrimitiveDot } from 'react-icons/go';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const ProfilePic = ({ image, outline, active, favorite, isViewContact }) => {
    return (
        <div className={`glass-border ${outline ? 'on' : 'off'}`}>
            <Image src={image} className="profile_pic" alt=""/>
            {
                !isViewContact
                ? active && <GoPrimitiveDot className='active-overlay' title='Active'/>
                : favorite 
                    ?   <div className='favorite-overlay'>
                            <FaHeart className='favorite-icon ok' title='You have marked this contact as favorite' size={25} />
                        </div>
                    :   <div className='favorite-overlay'>
                            <FaRegHeart className='favorite-icon no' title="You doesn't marked this contact as favorite" size={25} />
                        </div>
            }
        </div>
    )
}

export default ProfilePic