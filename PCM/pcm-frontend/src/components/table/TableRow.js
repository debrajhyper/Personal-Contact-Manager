import React from 'react'

import { FaUserEdit, FaTrash } from 'react-icons/fa';
import { Form, Image } from 'react-bootstrap';







import { useNavigate } from 'react-router-dom';
import profilePic from '../../img/default.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../services/index';


import UseAnimations from "react-useanimations";
import trash from 'react-useanimations/lib/trash';

const TableRow = ({ contact }) => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleDelete = (e, cId) => {
        e.preventDefault();
        dispatch(deleteContact(cId));
    }

    const { cid, name, image, mobileNumber, email } = contact

    return (
        <Link to={`/view_contact/${cid}`} id={cid} className={`data-row b ${contact?.isChecked ? 'selected' : null}`}>
            <td className="text-center">
                <Form.Check
                    type="checkbox"
                    value={name}
                    className="form-checkbox"
                    id={cid}
                    // onChange={handleChecked}
                    // checked={user?.isChecked || false}
                />
            </td>
            <td className="text-center" title={cid}>{cid}</td>
            <td className="text-left" title={name}>
                <div className='img-border me-2'>
                    <Image src={image} className="profile_pic" alt=""/>
                </div>
                <span>{name ?? '-'}</span>
            </td>
            <td className="text-left" title={mobileNumber?.number}>{mobileNumber?.number ?? '-'}</td>
            <td className="text-left" title={email}>{email ?? '-'}</td>
            <td className="text-center">
                <Link to={`/edit_contact/${cid}`}>
                    <button
                        type="button"
                        title="Edit"
                        className="btn edit me-3"
                        >
                        <FaUserEdit size={20} />
                    </button>
                </Link>
                {/* <button
                    type="button"
                    title="Delete"
                    className="btn delete"
                    onClick={(e) => handleDelete(e, cid)}
                > */}
                    {/* <FaTrash /> */}
                    <UseAnimations animation={trash} size={20} speed={.5} onClick={(e) => handleDelete(e, cid)}
                        render={(eventProps, animationProps) => (
                            <button type="button" title="Delete" className="btn delete" {...eventProps}>
                                <div {...animationProps} />
                            </button>
                        )}
                    />
                {/* </button> */}
            </td>
        </Link>
    )
}














// const TableRow = ({ user, users, setUsers }) => {
    
//     const handleChecked = e => {
//         const { id, value, checked } = e.target;
//         let newUsers = users.map(user => user.id == id && user.name === value ? { ...user, isChecked: checked } : user);
//         setUsers(newUsers);
//     };
    
//     const handleUserDelete = userId => {
//         const newUsers = [ ...users ];
//         const index = users.findIndex(user => user.id === userId);
//         newUsers.splice(index, 1);
//         setUsers(newUsers);
//     };

//     return (
//         <tr id={user.id} className={`data-row b ${user?.isChecked ? 'selected' : null}`}>
//             <td className="text-center">
//                 <Form.Check
//                     type="checkbox"
//                     value={user.name}
//                     className="form-checkbox"
//                     id={user.id}
//                     onChange={handleChecked}
//                     checked={user?.isChecked || false}
//                 />
//             </td>
//             <td className="text-center" title={user.id}>{user.id}</td>
//             <td className="text-left" title={user.name}>
//                 <div className='img-border me-2'>
//                     <Image src={ user.image } className="profile_pic" alt="profile_pic"/>
//                 </div>
//                 <span>{user.name}</span>
//             </td>
//             <td className="text-left" title={user.mobileNo}>{user.mobileNo}</td>
//             <td className="text-left" title={user.email}>{user.email}</td>
//             <td className="text-center">
//                 <button
//                     type="button"
//                     title="Edit"
//                     className="btn edit me-3"
//                     // onClick={(e) => handleUserEdit(e, user)}
//                 >
//                     <FaUserEdit />
//                 </button>
//                 <button
//                     type="button"
//                     title="Delete"
//                     className="btn delete"
//                     onClick={() => handleUserDelete(user.id)}
//                 >
//                     <FaTrash />
//                 </button>
//             </td>
//         </tr>
//     )
// }

export default TableRow