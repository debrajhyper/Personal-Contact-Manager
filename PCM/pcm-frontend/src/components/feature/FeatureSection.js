import React from 'react';

import centerImg from '../../img/feature-ring.png';
import addContact from '../../img/pcm_add_contact.png';
import editContact from '../../img/pcm_edit_profile.png';
import deleteContact from '../../img/cDelete.png';
import searchContact from '../../img/cSearch.png';
import relation from '../../img/cRelationship3.png';
import dob from '../../img/cDob.png';
import world from '../../img/cWorld.png';
import tags from '../../img/cTags1.png';
import zodiac from '../../img/cZodiac.png';
import address from '../../img/cAddress4.png';
import role from '../../img/cRole.png';
import ease2Use from '../../img/cEasy.png';
import settings from '../../img/cRole_old.png';
import profile from '../../img/cProfile.png';
import './feature_section.scss';

import { Container, Image } from 'react-bootstrap';

const FeatureSection = () => {
    return (
        <section className='features'>
            <Container className='text'>
                <h1 className="font-weight-bold">Features</h1>
                <p>
                    This <strong>Contact Management System</strong> has all the basic features of any management system. Additionally, it has customizable extra inputs for your contacts like <strong>telephone numbers</strong>, <strong>countries with flags</strong>, <strong>relationships</strong>, <strong>zodiac signs</strong>, and customized <strong>tags</strong>.
                    <br/>
                    Furthermore, it comes with a cool pagination system, multiple select, multiple delete for contacts, and a search for your stored contacts. As you update or delete any contacts, you will be notified in each step. It is the ultimate CMS and it is still growing.
                </p>
            </Container>
            <Container className='manage_ring'>
                <div className='ring ring_1'>
                    <div className='ring_img one easy2use'>
                        <div className='img_wrapper'>
                            <Image src={ease2Use} alt='' />
                            <h5 className='t-start'>Easily accessible</h5>
                        </div>
                    </div>
                    <div className='ring_img two customization'>
                        <div className='img_wrapper'>
                            <Image src={settings} alt='' />
                            <h5 className='t-start wide'>Fully Customize your Contacts</h5>
                        </div>
                    </div>
                    <div className='ring_img three profile'>
                        <div className='img_wrapper'>
                            <Image src={profile} alt='' />
                            <h5 className='t-end'>Personal Profile</h5>
                        </div>
                    </div>
                    <div className='ring_img four auth'>
                        <div className='img_wrapper'>
                            <Image src={role} alt='' />
                            <h5 className='t-end wide'>Account with Authentication</h5>
                        </div>
                    </div>
                    <div className='ring ring_2'>
                        <div className='ring_img one dob'>
                            <div className='img_wrapper'>
                                <Image src={dob} alt='' />
                                <h5 className='t-start wide'>Add Date of Birth for Contacts</h5>
                            </div>
                        </div>
                        <div className='ring_img two world'>
                            <div className='img_wrapper'>
                                <Image src={world} alt='' />
                                <h5 className='t-start wide'>All Country with flags</h5>
                            </div>
                        </div>
                        <div className='ring_img three tags'>
                            <div className='img_wrapper'>
                                <Image src={tags} alt='' />
                                <h5 className='t-start wide'>Contacts With any special Tags</h5>
                            </div>
                        </div>
                        <div className='ring_img four zodiac'>
                            <div className='img_wrapper'>
                                <Image src={zodiac} alt='' />
                                <h5 className='t-end wide'>Cosmic Zodiac for all Contacts</h5>
                            </div>
                        </div>
                        <div className='ring_img five address'>
                            <div className='img_wrapper'>
                                <Image src={address} alt='' />
                                <h5 className='t-end'>Full Address</h5>
                            </div>
                        </div>
                        <div className='ring_img six relation'>
                            <div className='img_wrapper'>
                                <Image src={relation} alt='' />
                                <h5 className='t-end'>Relationship Status</h5>
                            </div>
                        </div>
                        <div className='ring ring_3'>
                            <div className='ring_img one addC'>
                                <div className='img_wrapper'>
                                    <Image src={addContact} alt='' />
                                    <h5 className='t-start'>Add Contacts</h5>
                                </div>
                            </div>
                            <div className='ring_img two searchC'>
                                <div className='img_wrapper'>
                                    <Image src={searchContact} alt='' />
                                    <h5 className='t-start wide'>Search through all Contacts</h5>
                                </div>
                            </div>
                            <div className='ring_img three editC'>
                                <div className='img_wrapper'>
                                    <Image src={editContact} alt='' />
                                    <h5 className='t-end'>Customize Contacts</h5>
                                </div>
                            </div>
                            <div className='ring_img four deleteC'>
                                <div className='img_wrapper'>
                                    <Image src={deleteContact} alt='' />
                                    <h5 className='t-end wide-lg'>Remove contacts any time</h5>
                                </div>
                            </div>
                            <div className='center_img'>
                                <div className='img_wrapper'>
                                    <Image src={centerImg} alt='' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default FeatureSection