import React from 'react'

import { FaUserEdit, FaTrash } from 'react-icons/fa';
import { Form, Image } from 'react-bootstrap';


const TableRow = ({ user, users, setUsers }) => {
    const handleChecked = e => {
        const { id, value, checked } = e.target;
        let newUsers = users.map(user => user.id === id && user.name === value ? { ...user, isChecked: checked } : user);
        setUsers(newUsers);
    };
    const handleUserDelete = userId => {
        const newUsers = [ ...users ];
        const index = users.findIndex(user => user.id === userId);
        newUsers.splice(index, 1);
        setUsers(newUsers);
    };

    return (
        <tr id={user.id} className={`data-row b ${user?.isChecked ? 'selected' : null}`}>
            <td className="text-center">
                <Form.Check
                    type="checkbox"
                    className="form-checkbox"
                    id={user.id}
                    onChange={handleChecked}
                    checked={user?.isChecked || false}
                    value={user.name}
                />
            </td>
            <td className="text-center" title={user.id}>{user.id}</td>
            <td className="text-left" title={user.name}>
                <div className='img-border me-2'>
                    <Image src={ user.image } className="profile_pic" alt="profile_pic"/>
                </div>
                <span>{user.name}</span>
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
                    onClick={() => handleUserDelete(user.id)}
                >
                    <FaTrash />
                </button>
            </td>
        </tr>
    )
}

export default TableRow