import React from 'react'

import './DashboardCard.scss';

import { Card } from 'react-bootstrap';

const DashboardCard = ({ image, icon, title, subtitle, flag }) => {
    return (
        <Card>
            <Card.Img src={image} />
            <Card.Body className={title}>
                { 
                    title !== 'text-area' && 
                    <Card.Title>
                        {icon} <span className='ps-1'>{title}</span>
                    </Card.Title>
                }
                <Card.Subtitle className='mb-2 text-muted'>{subtitle}</Card.Subtitle>
            </Card.Body>
        </Card>
    )
}

export default DashboardCard