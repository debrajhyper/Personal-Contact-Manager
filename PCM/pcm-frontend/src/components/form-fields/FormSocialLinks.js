import React from 'react'

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Form } from 'react-bootstrap';

const SocialWebsite = [
    {
        name: 'facebook',
        displayName: 'Facebook',
        icon: <FaFacebookF className="me-2" />,
    },
    {
        name: 'twitter',
        displayName: 'Twitter',
        icon: <FaTwitter className="me-2" />,
    },
    {
        name: 'linkedIn',
        displayName: 'LinkedIn',
        icon: <FaLinkedinIn className="me-2" />,
    },
    {
        name: 'instagram',
        displayName: 'Instagram',
        icon: <FaInstagram className="me-2" />,
    },
    {
        name: 'youtube',
        displayName: 'YouTube',
        icon: <FaYoutube className="me-2" />,
    },
];

const FormSocialLinks = ({ socialLinks, cName, functionChange, functionBlur, functionKeyDown, hasTouched, hasError, Mandatory }) => {
    return (
        <>
            {
                SocialWebsite.map((website, index) => {
                    const { name, displayName, icon } = website;
                    return (
                        <Form.Group key={index} className={`form-input ${cName}`} controlId={name}>
                            <div className="field field-url">
                                <Form.Control
                                    name={name}
                                    title={`${displayName} URL`}
                                    type="url"
                                    value={socialLinks[name]}
                                    onChange={functionChange}
                                    onBlur={functionBlur}
                                    onKeyDown={functionKeyDown}
                                    className={hasTouched?.[name] && hasError[name] ? 'hasError' : (socialLinks[name] !== "" ? 'noError' : '')}
                                    placeholder=" "
                                required />
                                <Form.Label>{icon}{displayName}{Mandatory && <span className='mandatory'>*</span>}</Form.Label>
                            </div>
                            {
                                hasTouched?.[name] && hasError[name] &&
                                <Form.Text className="e_msg error_form" id="name_error_message">
                                    {hasError[name]}
                                </Form.Text>
                            }
                        </Form.Group>
                    )
                })
            }
        </>
    )
}

export default FormSocialLinks