import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser, logoutUser } from '../../services/index';

import { DashboardCard, Header } from '../../components/index';

import '../../sass/private/Dashboard.scss';
import pcmDashboard from '../../img/pcm_dashboard.svg';
import cLogin from '../../img/cLogin1.png';
import cTimestamp from '../../img/cTimestamp.png';
import cTotalContacts from '../../img/cTotalContacts.png';
import cRole from '../../img/cRole.png';

import { Container, Image, Row, Col } from 'react-bootstrap';
import { FaUserCheck, FaSignInAlt, FaAddressBook, FaUserShield } from 'react-icons/fa';
import moment from 'moment';



const Dashboard = () => {
    const auth = useSelector(state => state.auth);
    const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        if(auth.isLoggedIn) {
            dispatch(getCurrentUser());
        } else {
            dispatch(logoutUser('/login'));
        }
        
    },[auth, dispatch, navigate, location]);

    console.log(currentUser.currentUser);

    const { name, connectedWithUS, lastLogin, totalContacts, authorities } = currentUser.currentUser;

    const dateFormater = (APIDate) => {
        const dateString = moment(APIDate).format('Do MMMM YYYY, dddd hh:mm:ss a');
        return dateString;
    };

    const CardDetails = [
        {
            space: 10,
            image: cTimestamp,
            icon: <FaUserCheck />,
            title: 'Connected with us',
            subtitle: connectedWithUS ? dateFormater(connectedWithUS) ?? '-' : '-',
            // subtitle: '23 August 2021 Monday 10:48 PM'
            
        },
        {
            space: 9,
            image: cLogin,
            icon: <FaSignInAlt />,
            title: 'Last Login',
            subtitle: lastLogin ? dateFormater(lastLogin) ?? '-' : '-',
            // subtitle: '23 August 2021 Monday 10:48 PM'
        },
        {
            space: 8,
            image: cTotalContacts,
            icon: <FaAddressBook />,
            title: 'Total Contacts',
            subtitle: totalContacts ?? '-',
            // subtitle: 20
        },
        {
            space: 6,
            image: cRole,
            icon: <FaUserShield />,
            title: 'Role',
            subtitle: authorities?.length > 0 ? authorities?.[0].authority.toUpperCase() : '-',
            // subtitle: role?.[0]?.authority.toUpperCase()
            // subtitle: 'Admin'
        }
    ]

    return (
        <div className='dashboard'>

            <div className='background'>
                <Image fluid={true} src={pcmDashboard} className="background-img" alt="dashboard" />
			</div>

            <Container>
                <Header text={name ? `Welcome ${name}` : 'Welcome'}/>

                <Row className="container-fluid m-0 position-relative d-flex justify-content-end">
                    <Col xl={6} lg={10} md={9}  className="container-left col-12">
                        <Row className="d-flex flex-column justify-content-end align-items-end">
                            {
                                CardDetails.map((card, index) => {
                                    const { space, image, icon, title, subtitle } = card;
                                    return (
                                        <Col key={title} md={space} className={`col-${space+2} p-3`}>
                                            <DashboardCard key={index} image={image} icon={icon} title={title} subtitle={subtitle} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Dashboard
