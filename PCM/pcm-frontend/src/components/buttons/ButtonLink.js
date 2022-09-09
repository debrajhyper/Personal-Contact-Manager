import React from 'react';
import { Link } from 'react-router-dom';

import './button.scss';

import { Button } from 'react-bootstrap';

const ButtonLink = ({ href, type, name, id, cName, value, hasError, action }) => {
    return (
        <div className="form-button">
            <Link to={href}>
                <Button type={type} name={name} id={id} className={cName} value={value} disabled={hasError} onClick={action}>{value}</Button>
            </Link>
        </div>
    )
}

export default ButtonLink