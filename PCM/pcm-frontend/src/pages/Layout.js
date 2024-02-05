import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <main className="App_Main">
            <Outlet />
        </main>
    )
}

export default Layout