import React from 'react';

import './social_icon.scss';

const SocialIcon = ({ icon, title, link }) => {
    return (
        <a href={link} target="blank" className='social-icon'>
            <div id={title} className='icon'>
                {icon}
            </div>
        </a>
    )
}

export default SocialIcon