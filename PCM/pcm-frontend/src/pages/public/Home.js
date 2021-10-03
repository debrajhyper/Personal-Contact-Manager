import React from 'react'
import { Link } from 'react-router-dom'

import '../../sass/public/home.scss'

import { Button } from 'react-bootstrap'

const Home = () => {

    return (
        <>
            <section className="banner d-flex justify-content-center align-items-center">
                <div className="text text-center">
                    <h1 className="font-weight-bold">Personal Contact Manager</h1>
                    <p>
                        PCM is the web portal to Collecting your contacts in very Smarter way. We provide very efficient and smarter way of handling contacts.
                    </p>
                    <Button as={Link} to={"/login"} className="bg-navbar text-white" size="lg">Get Started</Button>
                </div>
            </section>
        </>
    )
}

export default Home
