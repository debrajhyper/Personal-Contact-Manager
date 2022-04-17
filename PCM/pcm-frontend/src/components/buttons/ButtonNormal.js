import React from 'react'

import './button.scss';

import { Button } from 'react-bootstrap';

const ButtonNormal = ({ type, name, id, cName, value, hasError, action, loading }) => {
    return (
        <div className="form-button">
            <Button type={type} name={name} id={id} className={cName} value={value} disabled={hasError} onClick={action}>{value}</Button>
        </div>
    )
}


export default ButtonNormal
