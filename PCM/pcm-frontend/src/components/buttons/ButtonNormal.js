import React from 'react'

import './button.scss';

import { Button } from 'react-bootstrap';

const ButtonNormal = ({ type, name, id, cName, value, hasError, action, users, setUsers }) => {

    const handleDeleteSelected = e => {
        e.preventDefault();
        let newUsers = [...users];
        newUsers = newUsers.filter(user => {
            return !user.isChecked;
        });
        setUsers(newUsers);
    };

    return (
        <div className="form-button">
            <Button type={type} name={name} id={id} className={cName} value={value} disabled={hasError} onClick={handleDeleteSelected}>{value}</Button>
        </div>
    )
}


export default ButtonNormal
