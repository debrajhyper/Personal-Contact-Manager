import React from 'react'

import './DashboardCard.scss';

import { Card } from 'react-bootstrap';

const DashboardCard = ({ image, icon, title, subtitle }) => {
    return (
        <Card>
            <Card.Img src={image} />
            <Card.Body>
                <Card.Title>{ icon } { title }</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{ subtitle }</Card.Subtitle>
            </Card.Body>
        </Card>
    )
}

export default DashboardCard