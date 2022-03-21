import React from 'react'

import TableRow from './TableRow';

import './table.scss';


import { Form, Table } from 'react-bootstrap';

const TableDisplay = ({ users, filteredUsers, currentItems, setUsers, handleAllChecked, indexOfFirstItem, indexOfLastItem }) => {
    return (
        <div className="display-table">
            <div className="overflow-auto">
                <Table responsive className='table-borderless'>
                    <thead>
                        <tr>
                            <th scope="col" className="form-input-line text-center">
                                <Form.Check
                                    type="checkbox"
                                    value="checkedAll"
                                    className="form-checkbox"
                                    onChange={handleAllChecked}
                                    checked={users.slice(indexOfFirstItem, indexOfLastItem).filter(user => user?.isChecked !== true).length < 1}
                                />
                            </th>
                            <th scope="col" className="id text-center">Id</th>
                            <th scope="col" className="name text-left">Name</th>
                            <th scope="col" className="phone text-left">Phone Number</th>
                            <th scope="col" className="email text-left">Email</th>
                            <th scope="col" className="action text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users.length > 0 && filteredUsers.length > 0
                                ? currentItems.map((user, index) => {
                                    return (
                                        <TableRow 
                                            key={index} 
                                            user={user} 
                                            users={users} 
                                            setUsers={setUsers}
                                        />
                                    )
                                })
                                : <tr className="text-center w-full text-lg text-indigo-500">
                                    <td colSpan={6} className="p-5">
                                        <div className="flex flex-col justify-center items-center">
                                            {/* <img src={icon} alt="Empty" /> */}
                                            <span className="p-2 text-lg font-semibold">No Users Found</span>
                                        </div>
                                    </td>
                                </tr>
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default TableDisplay