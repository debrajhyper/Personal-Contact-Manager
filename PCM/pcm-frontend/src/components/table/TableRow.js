import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { EDIT_CONTACT_LINK, VIEW_CONTACT_LINK } from '../../Route';

import { useDispatch, useSelector } from 'react-redux';
import { ContactsChecked, deleteContact } from '../../services/index';

import UseAnimations from "react-useanimations";
import trash from 'react-useanimations/lib/trash';

import { Form, Image } from 'react-bootstrap';
import { FaUserEdit } from 'react-icons/fa';

const TableRow = ({ contact, deleteIds }) => {
    const { contacts } = useSelector(state => state.viewContacts);
    const { cid, name, image, mobileNumber, email } = contact;
    
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleChecked = e => {
        const { id, checked } = e.target;
        if (deleteIds.includes(parseInt(id))) {
            const index = deleteIds.indexOf(parseInt(id));
            deleteIds.splice(index, 1);
        }
        else {
            deleteIds.push(parseInt(id));
        }
        dispatch(ContactsChecked(parseInt(id), checked));
    };

    const handleDelete = (e, cId) => {
        e.preventDefault();
        dispatch(deleteContact(cId, contacts.length));
    }

    const exclude = ['INPUT', 'BUTTON', 'SVG', 'PATH'];
    const handleLink = (e, cid) => {
        if (!exclude.includes(e.target.tagName.toUpperCase())) {
            navigate(VIEW_CONTACT_LINK + cid);
        }
    }

    return (
        <tr id={cid} className={`data-row b ${contact?.isChecked ? 'selected' : null}`} onClick={e => handleLink(e, cid)}>
            <td className="text-center">
                <Form.Check
                    type="checkbox"
                    value={name}
                    className="form-checkbox"
                    id={cid}
                    onChange={handleChecked}
                    checked={contact?.isChecked || false}
                />
            </td>
            <td className="text-center" title={cid}>PCM22{cid}</td>
            <td className="text-left" title={name}>
                <div className='img-border me-2'>
                    <Image src={image} className="profile_pic" alt="" />
                </div>
                <span>{name ?? '-'}</span>
            </td>
            <td className="text-left" title={mobileNumber?.number}>{mobileNumber?.number ?? '-'}</td>
            <td className="text-left" title={email}>{email ?? '-'}</td>
            <td className="text-center">
                <Link to={EDIT_CONTACT_LINK + cid}>
                    <button
                        type="button"
                        title="Edit"
                        className="btn edit me-3"
                    >
                        <FaUserEdit size={20} />
                    </button>
                </Link>
                <UseAnimations animation={trash} size={20} speed={.5} onClick={(e) => handleDelete(e, cid)}
                    render={(eventProps, animationProps) => (
                        <button type="button" title="Delete" className="btn delete" {...eventProps}>
                            <div {...animationProps} />
                        </button>
                    )}
                />
            </td>
        </tr>
    )
}

export default TableRow