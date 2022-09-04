import React from 'react';

import './DashboardCard.scss';

import { excluded } from '../../validation/validationMsg';

import { Card as BootstrapCard } from 'react-bootstrap';

const DashboardCard = ({ image, icon, title, pretitle, subtitle }) => {
    return (
        <BootstrapCard className={`${title === 'text-area' && excluded.includes(subtitle) && 'hide-card'}`}>
            <BootstrapCard.Img src={image} />
            <BootstrapCard.Body className={title}>
                {
                    title !== 'text-area' &&
                    <BootstrapCard.Title>
                        {icon} <span className='ps-1'>{title}</span>
                    </BootstrapCard.Title>
                }
                {
                    title === 'Tags'
                        ? <ul id="tags">
                            {
                                subtitle && subtitle.length > 0
                                    ? subtitle.map((tag, index) => (
                                        <li key={index} className={`tag ${subtitle.length > 6 ? 'text-wrapped' : null}`}>
                                            <span className='tag-title'>{!excluded.includes(tag) && tag}</span>
                                        </li>
                                    ))
                                    : <BootstrapCard.Subtitle className='mb-2 text-muted'>-</BootstrapCard.Subtitle>
                            }
                        </ul>
                        : title === 'text-area'
                            ? <BootstrapCard.Subtitle className='mb-2 text-muted'>
                                {subtitle && <div dangerouslySetInnerHTML={{ __html: subtitle }} />}
                            </BootstrapCard.Subtitle>
                            : <BootstrapCard.Subtitle className='mb-2 text-muted'>
                                {title === 'Mobile Number' || title === 'Telephone Number' ? subtitle ? !excluded.includes(pretitle) && `+${pretitle} ` : '' : ''}
                                {!excluded.includes(subtitle) ? subtitle : '-'}
                            </BootstrapCard.Subtitle>
                }
            </BootstrapCard.Body>
        </BootstrapCard>
    )
}

export default DashboardCard