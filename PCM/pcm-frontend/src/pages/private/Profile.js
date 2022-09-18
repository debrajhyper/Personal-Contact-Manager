import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../../services/index';

import cId from '../../img/cId.png';
import cEmail from '../../img/cEmail.png';
import cRole from '../../img/cRole.png';
import cDob from '../../img/cDob.png';
import cMobileNo from '../../img/cMobileNo.png';
import '../../sass/private/Profile.scss';

import { excluded } from '../../validation/validationMsg';

import Skeleton from 'react-loading-skeleton';
import { CountryFlag } from '../../components/misc/FlagSelect';
import { ZodiacSign } from '../../components/misc/ZodiacSelect';
import { DashboardCard, ProfilePic, ButtonNormal, ModalEditProfile, SocialIcon } from '../../components/index';
import { Container, Row, Col } from 'react-bootstrap';
import { IoFingerPrint, IoCalendar, IoDisc, IoPhonePortraitOutline } from 'react-icons/io5';
import { FaAt, FaUserShield, FaGlobeAmericas, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

const Profile = () => {
    const { loading, currentUser } = useSelector(state => state.currentUser);
    const { updateUserSuccess } = useSelector(state => state.updateUser);
    const dispatch = useDispatch();

    const [modalEditProfile, setModalEditProfile] = useState(false);

    function handleModalEditProfile() {
        setModalEditProfile(!modalEditProfile);
    }

    useEffect(() => {
        if (updateUserSuccess) {
            handleModalEditProfile();
            dispatch(getCurrentUser());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateUserSuccess, dispatch]);

    const { id, email, image, enabled, name, authorities, country, dateOfBirth, mobileNumber, zodiacSign, socialLinks, description } = currentUser
    const cardDetails = [
        {
            spaceLg: 3,
            spaceMd: 3,
            image: cId,
            icon: <IoFingerPrint />,
            title: 'Id',
            subtitle: id ? `PCM22U${id}` : '-'
        },
        {
            spaceLg: 3,
            spaceMd: 4,
            image: cRole,
            icon: <FaUserShield />,
            title: 'Role',
            subtitle: authorities?.length > 0 ? authorities?.[0].authority.toUpperCase() : '-'
        },
        {
            spaceLg: 3,
            spaceMd: 5,
            image: CountryFlag(country?.code?.toUpperCase()),
            icon: <FaGlobeAmericas />,
            title: 'Country',
            subtitle: country?.name
        },
        {
            spaceLg: 3,
            spaceMd: 6,
            image: cDob,
            icon: <IoCalendar />,
            title: 'Birth date',
            subtitle: dateOfBirth
        },
        {
            spaceLg: 4,
            spaceMd: 6,
            image: cMobileNo,
            icon: <IoPhonePortraitOutline />,
            title: 'Mobile Number',
            pretitle: mobileNumber?.code ? mobileNumber.code : country?.no ? country.no : '',
            subtitle: mobileNumber?.number
        },
        {
            spaceLg: 4,
            spaceMd: 6,
            image: cEmail,
            icon: <FaAt />,
            title: 'Email',
            subtitle: email
        },
        {
            spaceLg: 4,
            spaceMd: 6,
            image: ZodiacSign(zodiacSign?.toUpperCase()),
            icon: <IoDisc />,
            title: 'Zodiac sign',
            subtitle: zodiacSign
        },
        {
            spaceLg: 8,
            title: 'text-area',
            subtitle: description
        },
    ]

    const SocialDetails = [
        {
            icon: <FaFacebookF />,
            title: 'Facebook',
            link: socialLinks?.facebook
        },
        {
            icon: <FaTwitter />,
            title: 'Twitter',
            link: socialLinks?.twitter
        },
        {
            icon: <FaLinkedinIn />,
            title: 'Linkedin',
            link: socialLinks?.linkedIn
        },
        {
            icon: <FaInstagram />,
            title: 'Instagram',
            link: socialLinks?.instagram
        },
        {
            icon: <FaYoutube />,
            title: 'Youtube',
            link: socialLinks?.youtube
        },
    ]

    return (
        <Container fluid className="profile text-center">
            <div className='header d-inline-block'>
                <ProfilePic image={image} outline={true} active={enabled} isUserProfile={true} loading={loading} />
                <h4 className="text pt-2">{ loading ? <Skeleton width={300} /> : name }</h4>
            </div>

            <Row className='social-link-row'>
                <div className='content'>
                    {
                        SocialDetails.map((social, index) => {
                            return ( 
                                loading 
                                ? <Skeleton circle height={40} width={40}/>
                                : !excluded?.includes(social.link) && <SocialIcon key={index} icon={social.icon} title={social.title} link={social.link} loading={loading} />
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
                                    <DashboardCard key={index} image={image} icon={icon} title={title} subtitle={subtitle} loading={loading} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>

            <div className='action_button center pb-5'>
                <ButtonNormal name='edit_profile' id='EditProfile' cName='fill mt-sm-4 mt-2 px-4' value='Edit profile' action={handleModalEditProfile} />
            </div>

            <ModalEditProfile modalEditProfile={modalEditProfile} handleModalEditProfile={handleModalEditProfile} />
        </Container>
    )
}

export default Profile