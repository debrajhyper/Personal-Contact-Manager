import React, { useEffect } from 'react'
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../services/index';

const RequireAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const location = useLocation();

    useEffect(() => {
        if(auth.isLoggedIn) {
            dispatch(getCurrentUser());
        }
    }, [auth.isLoggedIn, dispatch]);

    return (
        auth.isLoggedIn ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth