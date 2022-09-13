import React, { useEffect } from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';

import { LOGIN_LINK } from '../Route';

import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser, getToken, tokenVerification } from '../services/index';

const RequireAuth = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    
    const dispatch = useDispatch();
    const location = useLocation();
    const jwtToken = getToken();
    
    useEffect(() => {
        if(isLoggedIn) {
            dispatch(getCurrentUser());
        }
    }, [isLoggedIn, dispatch]);
    
    useEffect(() => {
        dispatch(tokenVerification(jwtToken));
    }, [jwtToken, dispatch]);

    return (
        isLoggedIn ? <Outlet /> : <Navigate to={LOGIN_LINK} state={{ from: location }} replace />
    )
}

export default RequireAuth