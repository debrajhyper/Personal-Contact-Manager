import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

import UseAnimations from "react-useanimations";
import trash from 'react-useanimations/lib/trash';

import { IoFingerPrint, IoCalendar, IoDisc, IoPhonePortraitOutline, IoLocationSharp } from 'react-icons/io5';
import { FaUserEdit, FaAt, FaPhoneAlt, FaHeart, FaUserTag, FaUserShield, FaGlobeAmericas, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaLink } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';
import { viewContact, deleteContact, viewContacts } from '../../services/index';


const ViewContact = () => {
    const [modalEditProfile, setModalEditProfile] = useState(false);
    const exclude = [null, undefined, 'null', 'undefined', '', ' '];
    const { cid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contact = useSelector(state => state.viewContact.contact);
    const currentPage = useSelector(state => state.viewContacts.page);
    const deleteContactDone = useSelector(state => state.deleteContact.success);
    
    function handleModalEditProfile() {
        setModalEditProfile(!modalEditProfile);
    }
    
    useEffect(() => {
        if(cid) {
            dispatch(viewContact(cid));
        }
    }, [cid, dispatch]);

    useEffect(() => {
        if(deleteContactDone) {
            navigate(-1);
        }
    }, [deleteContactDone, navigate]);

    const handleDelete = (e, cId) => {
        e.preventDefault();
        dispatch(deleteContact(cId));
    }
    
    
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
            spaceMd: 6,
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

            <div className='action_button center pb-5'>
                <Link to={`/edit_contact/${cid}`}>
                    <ButtonNormal name='edit_contact' id='EditContact' cName='fill p-3 px-4 me-4' value='Edit Contact' icon={<FaUserEdit size={20} className="me-2" />} />
                </Link>
                <UseAnimations animation={trash} size={25} speed={.5} className="ico" onClick={(e) => handleDelete(e, cid)}
                    render={(eventProps, animationProps) => (
                        <button type="button" title="Delete Contact" className="btn danger ms-4 p-3" {...eventProps}>
                            <div {...animationProps} />
                            <span>Delete Contact</span>
                        </button>
                    )}
                />
            </div>

            <ModalEditProfile modalEditProfile={modalEditProfile} handleModalEditProfile={handleModalEditProfile} />
        </Container>
    )
}

export default ViewContact