import React from 'react'

import { FaUserEdit, FaTrash } from 'react-icons/fa';
import { Form, Image } from 'react-bootstrap';


const TableRow = ({ user }) => {
    return (
        <tr id={user.id} className={`data-row ${user?.isChecked ? 'bg-gray-100 dark:bg-gray-800' : null}`}>
            <td className="text-center">
                <Form.Check
                    type="checkbox"
                    className="form-checkbox"
                    id={user.id}
                    // onChange={handleChecked}
                    // checked={user?.isChecked || false}
                    // value={user.name}
                />
            </td>
            <td className="text-center" title={user.id}>{user.id}</td>
            <td className="text-left" title={user.name}>
                <div className='img-border me-2'>
                    <Image src={ user.image } className="profile_pic" alt="profile_pic"/>
                </div>
                {user.name}
            </td>
            <td className="text-left" title={user.mobileNo}>{user.mobileNo}</td>
            <td className="text-left" title={user.email}>{user.email}</td>
            <td className="text-center">
                <button
                    type="button"
                    title="Edit"
                    className="btn edit me-3"
                    // onClick={(e) => handleUserEdit(e, user)}
                >
                    <FaUserEdit />
                </button>
                <button
                    type="button"
                    title="Delete"
                    className="btn delete"
                    // onClick={() => handleUserDelete(user.id)}
                >
                    <FaTrash />
                </button>
            </td>
        </tr>
    )
}

export default TableRow