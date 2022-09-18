import React from 'react';

import './profile_pic.scss';

import Skeleton from 'react-loading-skeleton';
import { Image } from 'react-bootstrap';
import { GoPrimitiveDot } from 'react-icons/go';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const ProfilePic = ({ image, outline, active, favorite, isViewContact, loading }) => {
    return (
        <div className={`glass-border ${outline ? 'on' : 'off'}`}>
            { loading ? <Skeleton circle height="100%"/> : <Image src={image} className="profile_pic" alt="" /> }
            {
                !isViewContact
                    ? active && <GoPrimitiveDot className='active-overlay' title='Active' />
                    : favorite
                        ? <div className='favorite-overlay'>
                            { !loading && <FaHeart className='favorite-icon ok' title='You have marked this contact as favorite' size={25} /> }
                        </div>
                        : <div className='favorite-overlay'>
                            { !loading && <FaRegHeart className='favorite-icon no' title="You doesn't marked this contact as favorite" size={25} /> }
                        </div>
            }
        </div>
    )
}

export default ProfilePic