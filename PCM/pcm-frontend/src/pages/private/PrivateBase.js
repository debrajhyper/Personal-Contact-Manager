import React,{ useState } from 'react'

import PublicNavbar from '../../components/public-navbar/Navbar'
import SlideBar from '../../components/slidebar/SlideBar'

const PrivateBase = () => {
    const [show, setShow] = useState(false);

    //const handleClose = () => setShow(false);
    const handleSlidebar = () => {
        setShow(!show);
    };

    return (
        <div className="private_base">
            <PublicNavbar slidebar={show} handleSlidebar={handleSlidebar}/>
            <SlideBar slidebar={show}/>
            <h1>hi</h1>
        </div>
    )
}

export default PrivateBase
