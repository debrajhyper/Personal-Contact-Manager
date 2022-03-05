import React from 'react';

import { DashboardCard } from '../../components';

import '../../sass/private/Dashboard.scss';
import pcmDashboard from '../../img/pcm_dashboard.svg';
import cTimestamp from '../../img/cTimestamp.png';
import cTotalContacts from '../../img/cTotalContacts.png';
import cEmail from '../../img/cEmail.png';
import cRole from '../../img/cRole.png';

import { Image } from 'react-bootstrap';
import { FaUserCheck, FaAddressBook, FaAt, FaUserShield } from 'react-icons/fa';

const CardDetails = [
    {
        space: 10,
        image: cTimestamp,
        icon: <FaUserCheck />,
        title: 'Connected with us',
        subtitle: '23 August 2021 Monday 10:48 PM'
    },
    {
        space: 9,
        image: cTotalContacts,
        icon: <FaAddressBook />,
        title: 'Total Contacts',
        subtitle: 20
    },
    {
        space: 8,
        image: cEmail,
        icon: <FaAt />,
        title: 'Email',
        subtitle: 'debrajkarmakar010@gmail.com'
    },
    {
        space: 6,
        image: cRole,
        icon: <FaUserShield />,
        title: 'Role',
        subtitle: 'Admin'
    }
]

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <div className='background'>
                <Image fluid={true} src={pcmDashboard} className="background-img" alt="dashboard" />
			</div>

            <div className='container'>
                <div className="header">
                    <h4 className="text">Welcome <span>Debraj</span></h4>
                </div>

                <div className="container-fluid m-0 row position-relative d-flex justify-content-end">
                    <div className="container-left col-xl-6 col-lg-10 col-md-9 col-12">
                        <div className="row d-flex flex-column justify-content-end align-items-end">
                            {
                                CardDetails.map((card, index) => {
                                    const { space, image, icon, title, subtitle } = card;
                                    return (
                                        <div key={title} className={`col-md-${space} col-${space+2} p-3`}>
                                            <DashboardCard key={index} image={image} icon={icon} title={title} subtitle={subtitle} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
