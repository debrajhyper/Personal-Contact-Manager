import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

import { BASE_PATH, DASHBOARD_LINK } from '../Route';

import { useSelector } from 'react-redux';

import pageNotFound from '../img/page_not_found.svg';

import { ButtonLink } from '../components';
import { Image } from 'react-bootstrap';

const NoMatchFound = () => {
    useDocumentTitle('No Match Found');
    const { isLoggedIn } = useSelector(state => state.auth);
    
    return (
        <section className='no_match_found'>
            <div className='error_img'>
                <Image src={pageNotFound} alt='no match' fluid/>
                <h1 className='text'>Page Not Found</h1>
            </div>
            <div>
                <h3 className='text_sm'>We're sorry, the page you requested could not found</h3>
                <h3 className='text_sm'>Please go back to the {isLoggedIn ? 'Dashboard' : 'Home Page'}</h3>
            </div>
            <div className="action_button center">
                <ButtonLink href={isLoggedIn ? DASHBOARD_LINK : BASE_PATH} cName="form_submit fill px-5" value="Go Back" />
            </div>
        </section>
    )
}

export default NoMatchFound