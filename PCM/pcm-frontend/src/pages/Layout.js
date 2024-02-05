import React from 'react';
import { Outlet } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';

const Layout = () => {
    return (
        <main className="App_Main">
            <Outlet />
            <SpeedInsights />
        </main>
    )
}

export default Layout