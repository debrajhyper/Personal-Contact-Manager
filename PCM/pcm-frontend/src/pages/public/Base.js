import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PublicNavbar from '../../components/public-navbar/Navbar'
import Home from './Home'
import About from './About'
import Login from './Login'
import Signup from './Signup'
import terms_conditions from './terms_conditions'

const Base = () => {
    return (
        <div className="base">
            <PublicNavbar/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/terms_conditions" component={terms_conditions}/>
                <Redirect to="/"/>
            </Switch>
        </div>
    )
}

export default Base
