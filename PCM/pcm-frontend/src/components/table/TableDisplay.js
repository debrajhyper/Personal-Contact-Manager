import React from 'react'

import TableRow from './TableRow';

import './table.scss';

import UserImg from '../../img/face4_back1.png';
import { Form, Table } from 'react-bootstrap';

const Users = [
    {
        id: 1,
        image: UserImg,
        name: 'John Doe',
        email: 'debrajkarmakar010@gmail.com',
        mobileNo: '+91-123-456-7890'
    },
    {
        id: 2,
        image: UserImg,
        name: 'John Doe',
        email: 'kinjal9647576886lol@gmail.com',
        mobileNo: '+91-123-456-7890'
    },
    {
        id: 3,
        image: UserImg,
        name: 'John Doe',
        email: 'kjhnhi@hj.com',
        mobileNo: '+91-123-456-7890'
    },
    {
        id: 4,
        image: UserImg,
        name: 'John Doe',
        email: 'kjhnhi@hj.com',
        mobileNo: '+91-123-456-7890'
    },
    {
        id: 5,
        image: UserImg,
        name: 'John Doe',
        email: 'kjhnhi@hj.com',
        mobileNo: '+91-123-456-7890'
    },
    {
        id: 6,
        image: UserImg,
        name: 'John Doe',
        email: 'kjhnhi@hj.com',
        mobileNo: '+91-123-456-7890'
    },
    {
        id: 7,
        image: UserImg,
        name: 'John Doe',
        email: 'kjhnhi@hj.com',
        mobileNo: '+91-123-456-7890'
    },
    {
        id: 8,
        image: UserImg,
        name: 'John Doe',
        email: 'kjhnhi@hj.com',
        mobileNo: '+91-123-456-7890'
    },
    {
        id: 9,
        image: UserImg,
        name: 'John Doe',
        email: 'kjhnhi@hj.com',
        mobileNo: '+91-123-456-7890'
    },
    {
        id: 10,
        image: UserImg,
        name: 'John Doe',
        email: 'kjhnhi@hj.com',
        mobileNo: '+91-123-456-7890'
    }
]

const TableDisplay = () => {
    return (
        <div className="display-table flex flex-col mt-1 min-h-[75vh] min-w-auto md:min-w-[75vw] xl:min-w-[55vw]">
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
                            <th scope="col" className="text-center">Id</th>
                            <th scope="col" className="text-left">Name</th>
                            <th scope="col" className="text-left">Phone</th>
                            <th scope="col" className="text-left">Email</th>
                            <th scope="col" className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Users.map((user, index) => {
                                return (
                                    <TableRow user={user}  key={index} />
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default TableDisplay