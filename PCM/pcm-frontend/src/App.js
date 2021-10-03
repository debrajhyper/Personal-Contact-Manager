import React from 'react'
import { ToastContainer } from 'react-bootstrap'

import Base from './pages/public/Base'
import PrivateBase from './pages/private/PrivateBase'

import LoginServices from './services/LoginServices'

const App = () => {
    return (
        <div>
            <ToastContainer/>
            
            { LoginServices.isLoggedIn() ? <PrivateBase /> : <Base /> }
        </div>
    )
}

export default App
