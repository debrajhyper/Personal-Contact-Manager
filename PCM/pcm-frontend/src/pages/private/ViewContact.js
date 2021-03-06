import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { DashboardCard, ProfilePic, ButtonNormal, ModalEditProfile, SocialIcon } from '../../components/index';
import { CountryFlag } from '../../components/misc/FlagSelect';
import { ZodiacSign } from '../../components/misc/ZodiacSelect';

import myProfilePic from '../../img/default.png';
import cEmail from '../../img/cEmail.png';
import cMobileNo from '../../img/cMobileNo.png';
import cTelephoneNo from '../../img/cTelephoneNo.png';
import cRelationship from '../../img/cRelationship.png';
import cDob from '../../img/cDob.png';
import cAddress from '../../img/cAddress1.png';
import cTags from '../../img/cTags.png';

import '../../sass/private/Profile.scss';

import { IoFingerPrint, IoCalendar, IoDisc, IoPhonePortraitOutline, IoLocationSharp } from 'react-icons/io5';
import { FaAt, FaPhoneAlt, FaHeart, FaUserTag, FaUserShield, FaGlobeAmericas, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaLink } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';
import { viewContact } from '../../services';

const tags = ['asd','cool','awesome','funny','cool','awesome','funny', 'lol', 'friends', 'family', 'friends', 'family']


const ViewContact = () => {
    const [modalEditProfile, setModalEditProfile] = useState(false);
    const exclude = [null, undefined, 'null', 'undefined', '', ' '];
    const { cid } = useParams();
    const dispatch = useDispatch();
    const contact = useSelector(state => state.viewContact.contact);
    
    function handleModalEditProfile() {
        setModalEditProfile(!modalEditProfile);
    }
    
    useEffect(() => {
        if(cid) {
            dispatch(viewContact(cid));
        }
    }, [cid, dispatch]);
    
    
    const { image, favorite, name, nickName, title, company, email, mobileNumber, telephoneNumber, address, tags, dateOfBirth, description, relationship, zodiacSign, country, socialLinks, profilePic, website } = contact;
    
    console.log('VIEW CONTACT -> ', contact);
    const cardDetails = [
        {
            spaceLg: 4,
            spaceMd: 6,
            image: cEmail,
            icon: <FaAt />,
            title: 'Email',
            subtitle: email,
        },
        {
            spaceLg: 4,
            spaceMd: 6,
            image: cMobileNo,
            icon: <IoPhonePortraitOutline />,
            title: 'Mobile Number',
            pretitle: mobileNumber?.code ? mobileNumber.code : country?.no ? country.no : '',
            subtitle: mobileNumber?.number,
        },
        {
            spaceLg: 4,
            spaceMd: 6,
            image: cTelephoneNo,
            icon: <FaPhoneAlt />,
            title: 'Telephone Number',
            pretitle: telephoneNumber?.code ? telephoneNumber.code : country?.no ? country.no : '',
            subtitle: telephoneNumber?.number,
        },
        {
            spaceLg: 3,
            spaceMd: 5,
            image: CountryFlag(country?.code?.toUpperCase()),
            icon: <FaGlobeAmericas />,
            title: 'Country',
            subtitle: country?.name,
        },
        {
            spaceLg: 3,
            spaceMd: 6,
            image: cRelationship,
            icon: <FaHeart />,
            title: 'Relation',
            subtitle: relationship
        },
        {
            spaceLg: 3,
            spaceMd: 6,
            image: ZodiacSign(zodiacSign?.toUpperCase()),
            icon: <IoDisc />,
            title: 'Zodiac sign',
            subtitle: zodiacSign
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
            spaceLg: 6,
            spaceMd: 6,
            image: cAddress,
            icon: <IoLocationSharp />,
            title: 'Address',
            subtitle: address
        },
        {
            spaceLg: 6,
            spaceMd: 6,
            image: cTags,
            icon: <FaUserTag />,
            title: 'Tags',
            subtitle: tags
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
        {
            icon: <FaLink />,
            title: 'Website',
            link: website
        }
    ]
    return (
        <Container fluid className="profile text-center">

            <div className='header d-inline-block'>
                <ProfilePic image={image} outline={true} active={false} favorite={favorite} isViewContact={true} />
                <h4 className="text pt-2">{name}</h4>
                { !exclude.includes(nickName) && <h3 className='nickname'>{nickName}</h3> }
                { 
                    !exclude.includes(title) && !exclude.includes(company) 
                        ?   <h5 className='title'>{title}, <span className='company'>{company}</span></h5>
                        : !exclude.includes(title)
                            ? <h5 className='title'>{title}</h5>
                            : !exclude.includes(company) && <h5 className='title'>{company}</h5>
                }
            </div>

            <Row className='social-link-row'>
                <div className='content'>
                {
                    SocialDetails.map((social, index) => {
                        return (
                            !exclude?.includes(social.link) && <SocialIcon key={index} icon={social.icon} title={social.title} link={social.link} />
                        )
                    })
                }
                </div>
            </Row>

            <div className='d-flex justify-content-center'>
                <Row className="container-details gy-md-5 gy-4 justify-content-evenly">
                    {
                        cardDetails.map((card, index) => {
                            const { spaceLg, spaceMd, image, icon, title, pretitle, subtitle } = card;
                            return (
                                <Col key={title} xl={spaceLg} md={spaceMd} className={title}>
                                    <DashboardCard key={index} image={image} icon={icon} title={title} pretitle={pretitle} subtitle={subtitle} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>

            <Link to={`/edit_contact/${cid}`}>
                <ButtonNormal name='edit_contact' id='EditContact' cName='btn mt-sm-4 mt-2 p-3 px-5' value='Edit Contact' />
            </Link>

            <ModalEditProfile modalEditProfile={modalEditProfile} handleModalEditProfile={handleModalEditProfile} />
        </Container>
    )
}

export default ViewContact