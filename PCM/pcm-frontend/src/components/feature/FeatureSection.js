import React from 'react';

import featureRing from '../../img/feature-ring.png';
import addContact from '../../img/pcm_add_contact.png';
import editContact from '../../img/pcm_edit_profile.png';
import relation from '../../img/cRelationship.png';
import country from '../../img/cCountry.png';
import zodiac from '../../img/cZodiac.png';
import role from '../../img/cRole.png';
import settings from '../../img/cRole_old.png';
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
                    <div className='ring_img one'>
                        <Image src={role} alt='' />
                        <h5>Account with Authentication</h5>
                    </div>
                    <div className='ring_img two'>
                        <Image src={settings} alt='' />
                        <h5>Customize your Contacts</h5>
                    </div>
                    <div className='ring ring_2'>
                        <div className='ring_img one'>
                            <Image src={relation} alt='' />
                            <h5>Add Relationship Status</h5>
                        </div>
                        <div className='ring_img two'>
                            <Image src={country} alt='' />
                            <h5>All Country with flags</h5>
                        </div>
                        <div className='ring_img three'>
                            <Image src={zodiac} alt='' />
                            <h5>Add the cosmic Zodiac</h5>
                        </div>
                        <div className='ring ring_3'>
                            <div className='center_img'>
                                <Image src={featureRing} alt='' />
                            </div>
                            <div className='ring_img one'>
                                <Image src={addContact} alt='' />
                            </div>
                            <div className='ring_img two'>
                                <Image src={editContact} alt='' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureSection