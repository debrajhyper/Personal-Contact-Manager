import React from 'react'

import TableRow from './TableRow';

import './table.scss';

import { FaUserCircle } from 'react-icons/fa';
import { Form, Table } from 'react-bootstrap';




import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const TableDisplay = ({ indexOfFirstItem, indexOfLastItem }) => {
    const contacts = useSelector(state => state.viewContacts.contacts);
    
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
                                    // onChange={handleAllChecked}
                                    // checked={users.slice(indexOfFirstItem, indexOfLastItem).filter(user => user?.isChecked !== true).length < 1}
                                />
                            </th>
                            <th scope="col" className="id text-center">Id</th>
                            <th scope="col" className="name text-left">Name</th>
                            {/* <th scope="col" className="company text-left">Company</th> */}
                            <th scope="col" className="phone text-left">Mobile Number</th>
                            <th scope="col" className="email text-left">Email</th>
                            <th scope="col" className="action text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contacts && contacts.length > 0
                                ? contacts.map((contact, index) => {
                                    return (
                                        <TableRow key={index} contact={contact} />
                                    )
                                })
                                : <tr className="no-user text-center w-full">
                                        <td colSpan={6} className="p-5">
                                            <FaUserCircle />
                                            <span className="p-2">No Users Found</span>
                                        </td>
                                    </tr>
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}









// const TableDisplay = ({ users, filteredUsers, currentItems, setUsers, indexOfFirstItem, indexOfLastItem }) => {

//     const handleAllChecked = e => {
//         const { checked } = e.target;
//         let newUsers = users.map(user => {
//             if (currentItems.includes(user)) {
//                 return { ...user, isChecked: checked };
//             }
//             return user;
//         })
//         setUsers(newUsers);
//     };

//     return (
//         <div className="display-table">
//             <div className="overflow-auto">
//                 <Table responsive className='table-borderless'>
//                     <thead>
//                         <tr>
//                             <th scope="col" className="form-input-line text-center">
//                                 <Form.Check
//                                     type="checkbox"
//                                     value="checkedAll"
//                                     className="form-checkbox"
//                                     onChange={handleAllChecked}
//                                     checked={users.slice(indexOfFirstItem, indexOfLastItem).filter(user => user?.isChecked !== true).length < 1}
//                                 />
//                             </th>
//                             <th scope="col" className="id text-center">Id</th>
//                             <th scope="col" className="name text-left">Name</th>
//                             <th scope="col" className="phone text-left">Mobile Number</th>
//                             <th scope="col" className="email text-left">Email</th>
//                             <th scope="col" className="action text-center">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             users && users.length > 0 && filteredUsers.length > 0
//                                 ? currentItems.map((user, index) => {
//                                     return (
//                                         <TableRow
//                                             key={index}
//                                             user={user}
//                                             users={users}
//                                             setUsers={setUsers}
//                                         />
//                                     )
//                                 })
//                                 : <tr className="no-user text-center w-full">
//                                         <td colSpan={6} className="p-5">
//                                             <FaUserCircle />
//                                             <span className="p-2">No Users Found</span>
//                                         </td>
//                                     </tr>
//                         }
//                     </tbody>
//                 </Table>
//             </div>
//         </div>
//     )
// }

export default TableDisplay