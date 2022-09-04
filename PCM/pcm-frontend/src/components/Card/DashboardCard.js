import React from 'react';

import './DashboardCard.scss';

import { excluded } from '../../validation/validationMsg.js';

import { Card } from 'react-bootstrap';

const DashboardCard = ({ image, icon, title, pretitle, subtitle }) => {
    return (
        <Card className={`${title === 'text-area' && excluded.includes(subtitle) && 'hide-card'}`}>
            <Card.Img src={image} />
            <Card.Body className={title}>
                {
                    title !== 'text-area' &&
                    <Card.Title>
                        {icon} <span className='ps-1'>{title}</span>
                    </Card.Title>
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
                                    : <Card.Subtitle className='mb-2 text-muted'>-</Card.Subtitle>
                            }
                        </ul>
                        : title === 'text-area'
                            ? <Card.Subtitle className='mb-2 text-muted'>
                                {subtitle && <div dangerouslySetInnerHTML={{ __html: subtitle }} />}
                            </Card.Subtitle>
                            : <Card.Subtitle className='mb-2 text-muted'>
                                {title === 'Mobile Number' || title === 'Telephone Number' ? subtitle ? !excluded.includes(pretitle) && `+${pretitle} ` : '' : ''}
                                {!excluded.includes(subtitle) ? subtitle : '-'}
                            </Card.Subtitle>
                }
            </Card.Body>
        </Card>
    )
}

export default DashboardCard