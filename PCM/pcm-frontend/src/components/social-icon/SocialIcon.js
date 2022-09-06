import React from 'react';

import './social_icon.scss';

const SocialIcon = ({ icon, title, link }) => {
    return (
        <a href={link} className='social-icon'>
            <div id={title} className='icon b'>
                {icon}
            </div>
        </a>
    )
}

export default SocialIcon