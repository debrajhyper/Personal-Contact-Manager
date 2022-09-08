import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ContactsCheckedAll } from '../../services';

import './table.scss';

import UseAnimations from "react-useanimations";
import alertTriangle from 'react-useanimations/lib/alertTriangle';

import TableRow from './TableRow';
import { Form, Table } from 'react-bootstrap';

const TableDisplay = ({ deleteIds, setDeleteIds }) => {
    const { contacts } = useSelector(state => state.viewContacts);
    const dispatch = useDispatch();

    const handleAllChecked = e => {
        const { checked } = e.target;
        if (checked) {
            setDeleteIds(contacts.map(contact => contact.cid));
        }
        else {
            setDeleteIds([]);
        }
        dispatch(ContactsCheckedAll(checked));
    };

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
                                    checked={contacts.filter(user => user?.isChecked !== true).length < 1}
                                />
                            </th>
                            <th scope="col" className="id text-center">Id</th>
                            <th scope="col" className="name text-left">Name</th>
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
                                        <TableRow key={index} contact={contact} deleteIds={deleteIds} />
                                    )
                                })
                                : <tr className="no-user text-center w-full">
                                    <td colSpan={6} className="p-5">
                                        <div className='content'>
                                            <UseAnimations size={45} animation={alertTriangle} />
                                            <span className="p-2">No Users Found</span>
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