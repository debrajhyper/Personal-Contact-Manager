import React from 'react'
import UseAnimations from 'react-useanimations';
import loadingIco from 'react-useanimations/lib/loading';

import './button.scss';

import { Button } from 'react-bootstrap';

const ButtonNormal = ({ type, name, id, cName, value, hasError, action, loading }) => {
    return (
        <div className="form-button">
            <Button type={type} name={name} id={id} className={cName} value={value} disabled={hasError} onClick={action}>{loading ?  <UseAnimations animation={loadingIco} strokeColor='white' /> : value}</Button>
        </div>
    )
}


export default ButtonNormal
