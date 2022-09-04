import React, { useEffect } from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../services/index';

const RequireAuth = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if(isLoggedIn) {
            dispatch(getCurrentUser());
        }
    }, [isLoggedIn, dispatch]);

    return (
        isLoggedIn ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth