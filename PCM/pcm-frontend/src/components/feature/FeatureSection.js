import React from 'react';

import centerImg from '../../img/feature-ring.png';
import addContact from '../../img/pcm_add_contact.png';
import editContact from '../../img/pcm_edit_profile.png';
import deleteContact from '../../img/cDelete.png';
import searchContact from '../../img/cSearch.png';
import relation from '../../img/cRelationship.png';
import dob from '../../img/cDob.png';
import world from '../../img/cWorld.png';
import tags from '../../img/cTags.png';
import zodiac from '../../img/cZodiac.png';
import address from '../../img/cAddress1.png';
import role from '../../img/cRole.png';
import ease2Use from '../../img/cEasy.png';
import settings from '../../img/cRole_old.png';
import profile from '../../img/cProfile.png';
import './feature_section.scss';

import { Image } from 'react-bootstrap';

const FeatureSection = () => {
    return (
        <div className='features'>
            <div className='text'>
                <h1 className="font-weight-bold">Features</h1>
                <p>
                    PCM is the web portal to Collecting your contacts in very Smarter way. We provide very efficient and smarter way of handling contacts.
                </p>
            </div>
            <div className='manage_ring'>
                <div className='ring ring_1'>
                    {/* <div className='ring_img one'>
                        <Image src={role} alt='' />
                        <h5>Account with Authentication</h5>
                    </div>
                    <div className='ring_img two'>
                        <Image src={settings} alt='' />
                        <h5>Customize your Contacts</h5>
                    </div> */}
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
                                <h5 className='t-start'>All Country with flags</h5>
                            </div>
                        </div>
                        <div className='ring_img three tags'>
                            <div className='img_wrapper'>
                                <Image src={tags} alt='' />
                                <h5 className='t-start'>Add Contact Tags</h5>
                            </div>
                        </div>
                        <div className='ring_img four zodiac'>
                            <div className='img_wrapper'>
                                <Image src={zodiac} alt='' />
                                <h5 className='t-end'>Add the cosmic Zodiac</h5>
                            </div>
                        </div>
                        <div className='ring_img five address'>
                            <div className='img_wrapper'>
                                <Image src={address} alt='' />
                                <h5 className='t-end'>Add Contact Locations</h5>
                            </div>
                        </div>
                        <div className='ring_img six relation'>
                            <div className='img_wrapper'>
                                <Image src={relation} alt='' />
                                <h5 className='t-end'>Add Relationship Status</h5>
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
            </div>
        </div>
    )
}

export default FeatureSection