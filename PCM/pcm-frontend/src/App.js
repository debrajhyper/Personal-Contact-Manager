import React from 'react'
import { useSelector } from 'react-redux';

import Base from './pages/public/Base'
import PrivateBase from './pages/private/PrivateBase'

const App = () => {
    const auth = useSelector(state => state.auth);
    return (
        <div>
            { auth.isLoggedIn ? <PrivateBase /> : <Base /> }
        </div>
    )
}

export default App
