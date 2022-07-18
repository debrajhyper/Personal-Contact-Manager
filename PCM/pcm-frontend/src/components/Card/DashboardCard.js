import React from 'react';

import './DashboardCard.scss';

import { Card } from 'react-bootstrap';

const DashboardCard = ({ image, icon, title, pretitle, subtitle }) => {
    const exclude = [null, undefined, 'null', 'undefined', '', ' '];
    return (
        <Card className={`${title === 'text-area' && exclude.includes(subtitle) && 'hide-card'}`}>
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
                                        <span className='tag-title'>{ !exclude.includes(tag) && tag }</span>
                                    </li>
                                ))
                            : <Card.Subtitle className='mb-2 text-muted'>-</Card.Subtitle>
                        }
                        </ul>
                    : title === 'text-area'
                        ? <Card.Subtitle className='mb-2 text-muted'>
                                { subtitle && <div  dangerouslySetInnerHTML={{__html: subtitle}} /> }
                            </Card.Subtitle>
                        : <Card.Subtitle className='mb-2 text-muted'>
                                { title === 'Mobile Number' || title ==='Telephone Number' ? subtitle ? !exclude.includes(pretitle) && `+${pretitle} ` : '' : ''} 
                                { !exclude.includes(subtitle) ? subtitle : '-' }
                            </Card.Subtitle>
                }
                
            </Card.Body>
        </Card>
    )
}

export default DashboardCard