import React from 'react';

import './DashboardCard.scss';

import { excluded } from '../../validation/validationMsg';

import Skeleton from 'react-loading-skeleton';
import { Card } from 'react-bootstrap';

const DashboardCard = ({ image, icon, title, pretitle, subtitle, loading }) => {
    return (
        <Card className={`${title === 'text-area' && excluded.includes(subtitle) && 'hide-card'}`}>
            {
                loading
                ? <Skeleton borderRadius={5} width={60} height={60}/>
                : <Card.Img src={image} />
            }
            <Card.Body className={title}>
                {
                    title !== 'text-area' &&
                    <Card.Title>
                        { loading ? <Skeleton containerClassName="skeleton_icon" width={25} /> : icon } 
                        { loading ? <Skeleton containerClassName="skeleton_text" /> : <span className='ps-1'>{title}</span> }
                    </Card.Title>
                }
                {
                    title === 'Tags'
                        ?  <Card.Subtitle className='mb-2 text-muted'>
                            {
                                loading
                                ? <Skeleton/>
                                : <ul id="tags">
                                    { subtitle && subtitle?.length > 0
                                        ? subtitle.map((tag, index) => (
                                            <li key={index} className={`tag ${subtitle.length > 6 ? 'text-wrapped' : null}`}>
                                                <span className='tag-title'>{!excluded.includes(tag) && tag}</span>
                                            </li>
                                        ))
                                        : '-'
                                    }
                                </ul>
                            }
                            </Card.Subtitle>
                        : title === 'text-area'
                            ? <Card.Subtitle className='mb-2 text-muted'>
                                { loading ? <Skeleton /> : subtitle && <div dangerouslySetInnerHTML={{ __html: subtitle }} />}
                            </Card.Subtitle>
                            : <Card.Subtitle className='mb-2 text-muted'>
                                {
                                    loading
                                    ? <Skeleton />
                                    : <>
                                        {title === 'Mobile Number' || title === 'Telephone Number' ? subtitle ? !excluded.includes(pretitle) && `+${pretitle} ` : '' : ''}
                                        {!excluded.includes(subtitle) ? subtitle : '-'}
                                    </>
                                }
                            </Card.Subtitle>
                }
            </Card.Body>
        </Card>
    )
}

export default DashboardCard