import React from 'react';

import { DashboardCard, ProfilePic, SignupButtons } from '../../components';
import { CountryFlag } from '../../components/misc/FlagSelect';
import { ZodiacSign } from '../../components/misc/ZodiacSelect';

import myProfilePic from '../../img/default.png';
import cId from '../../img/cId.png';
import cEmail from '../../img/cEmail.png';
import cRole from '../../img/cRole.png';
import cDob from '../../img/cDob.png';

import '../../sass/private/Profile.scss';

import { IoFingerPrint, IoLocationSharp, IoCalendar, IoDisc } from 'react-icons/io5';
import { FaAt, FaUserShield } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';

const cardDetails = [
    {
        spaceSm: 3,
        image: cId,
        icon: <IoFingerPrint />,
        title: 'Id',
        subtitle: 'PCM21'
    },
    {
        spaceSm: 4,
        image: CountryFlag('IN'),
        icon: <IoLocationSharp />,
        title: 'Country',
        subtitle: 'India',
    },
    {
        spaceSm: 5,
        image: cEmail,
        icon: <FaAt />,
        title: 'Email',
        subtitle: 'debrajkarmakar010@gmail.com'
    },
    
    {
        spaceSm: 3,
        image: cRole,
        icon: <FaUserShield />,
        title: 'Role',
        subtitle: 'Admin'
    },
    {
        spaceSm: 4,
        image: cDob,
        icon: <IoCalendar />,
        title: 'Birth date',
        subtitle: '23 August, 2021'
    },
    {
        spaceSm: 8,
        title: 'text-area',
        subtitle: 'This is My 1st project on spring boot Web ID -  email(debrajkarmakae010) Password - Debrajkarmakar'
    },
    {
        spaceSm: 5,
        image: ZodiacSign('SAGITTARIUS'),
        icon: <IoDisc />,
        title: 'Zodiac sign',
        subtitle: 'Sagittarius'
    }
]

const Profile = () => {
    return (
        <Container fluid className="profile text-center">

            <div className='header d-inline-block'>
                <ProfilePic image={ myProfilePic } outline={true} active={true}/>
                <h4 className="text pt-2">Debraj Karmakar</h4>
            </div>

            <Row className="container-details gy-4 justify-content-evenly">
                {
                    cardDetails.map((card, index) => {
                        const { spaceSm, image, icon, title, subtitle, flag } = card;
                        return (
                            <Col key={title} sm={spaceSm} className={title}>
                                <DashboardCard key={index} image={image} icon={icon} title={title} subtitle={subtitle} flag={flag}/>
                            </Col>
                        );
                        
                    })
                }
            </Row>

            <SignupButtons name='edit_profile' id='EditProfile' cName='btn mt-sm-4 mt-2 p-3 px-5' value='Edit profile' />

        </Container>
    )
}

export default Profile