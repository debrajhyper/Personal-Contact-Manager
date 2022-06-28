import React from 'react'
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = () => {
    const auth = useSelector(state => state.auth);
    const location = useLocation();

    return (
        auth.isLoggedIn ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth