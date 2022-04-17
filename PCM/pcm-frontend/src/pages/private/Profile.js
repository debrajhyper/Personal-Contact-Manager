import React, { useState } from 'react';

import { DashboardCard, ProfilePic, ButtonNormal, ModalEditProfile, SocialIcon } from '../../components/index';
import { CountryFlag } from '../../components/misc/FlagSelect';
import { ZodiacSign } from '../../components/misc/ZodiacSelect';

import myProfilePic from '../../img/default.png';
import cId from '../../img/cId.png';
import cEmail from '../../img/cEmail.png';
import cRole from '../../img/cRole.png';
import cDob from '../../img/cDob.png';
import cMobileNo from '../../img/cMobileNo.png';

import '../../sass/private/Profile.scss';

import { IoFingerPrint, IoCalendar, IoDisc, IoPhonePortraitOutline } from 'react-icons/io5';
import { FaAt, FaUserShield, FaGlobeAmericas, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaLink } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';

const cardDetails = [
    {
        spaceLg: 3,
        spaceMd: 3,
        image: cId,
        icon: <IoFingerPrint />,
        title: 'Id',
        subtitle: 'PCM21'
    },
    {
        spaceLg: 3,
        spaceMd: 4,
        image: cRole,
        icon: <FaUserShield />,
        title: 'Role',
        subtitle: 'Admin'
    },
    {
        spaceLg: 3,
        spaceMd: 5,
        image: CountryFlag('IN'),
        icon: <FaGlobeAmericas />,
        title: 'Country',
        subtitle: 'India',
    },
    {
        spaceLg: 3,
        spaceMd: 6,
        image: cDob,
        icon: <IoCalendar />,
        title: 'Birth date',
        subtitle: '23 August, 2021'
    },
    {
        spaceLg: 4,
        spaceMd: 6,
        image: cMobileNo,
        icon: <IoPhonePortraitOutline />,
        title: 'Mobile Number',
        subtitle: '+91-9888888888'
    },
    {
        spaceLg: 4,
        spaceMd: 6,
        image: cEmail,
        icon: <FaAt />,
        title: 'Email',
        subtitle: 'debrajkarmakar010@gmail.com'
    },
    {
        spaceLg: 4,
        spaceMd: 6,
        image: ZodiacSign('SAGITTARIUS'),
        icon: <IoDisc />,
        title: 'Zodiac sign',
        subtitle: 'Sagittarius'
    },
    {
        spaceLg: 8,
        title: 'text-area',
        subtitle: 'This is My 1st project on spring boot Web ID -  email(debrajkarmakae010) Password - Debrajkarmakar'
    },
]

const SocialDetails = [
    {
        icon: <FaFacebookF />,
        title: 'Facebook',
        link: 'https://www.facebook.com/debrajkarmakar'
    },
    {
        icon: <FaTwitter />,
        title: 'Twitter',
        link: 'https://twitter.com/debrajkarmakar'
    },
    {
        icon: <FaLinkedinIn />,
        title: 'Linkedin',
        link: 'https://www.linkedin.com/in/debraj-karmakar-a8a9b817b/'
    },
    {
        icon: <FaInstagram />,
        title: 'Instagram',
        link: 'https://www.instagram.com/debrajkarmakar/'
    },
    {
        icon: <FaYoutube />,
        title: 'Youtube',
        link: 'https://www.youtube.com/channel/UC-lHJZR3Gqxm24_Vd_AJ5Yw'
    },
    {
        icon: <FaLink />,
        title: 'Website',
        link: 'https://debrajkarmakar.github.io/'
    }
]

const Profile = () => {
    const [modalEditProfile, setModalEditProfile] = useState(false);

    function handleModalEditProfile() {
        setModalEditProfile(!modalEditProfile);
    }

    return (
        <Container fluid className="profile text-center">

            <div className='header d-inline-block'>
                <ProfilePic image={myProfilePic} outline={true} active={true} />
                <h4 className="text pt-2">Debraj Karmakar</h4>
            </div>

            <Row className='social-link-row'>
                <div className='content'>
                {
                    SocialDetails.map((social, index) => {
                        return (
                            // <Col key={index} className="text-center d-inline-block" >
                                <SocialIcon icon={social.icon} title={social.title} link={social.link} />
                            // </Col>
                        )
                    })
                }
                </div>
                
            </Row>

            <div className='d-flex justify-content-center'>
                <Row className="container-details gy-md-5 gy-4 justify-content-evenly">
                    {
                        cardDetails.map((card, index) => {
                            const { spaceLg, spaceMd, image, icon, title, subtitle } = card;
                            return (
                                <Col key={title} xl={spaceLg} md={spaceMd} className={title}>
                                    <DashboardCard key={index} image={image} icon={icon} title={title} subtitle={subtitle} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>

            <ButtonNormal name='edit_profile' id='EditProfile' cName='btn mt-sm-4 mt-2 p-3 px-5' value='Edit profile' action={handleModalEditProfile} />

            <ModalEditProfile modalEditProfile={modalEditProfile} handleModalEditProfile={handleModalEditProfile} />
        </Container>
    )
}

export default Profile