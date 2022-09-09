import React from 'react';

import './button.scss';

import UseAnimations from 'react-useanimations';
import loadingIco from 'react-useanimations/lib/loading';

import { Button } from 'react-bootstrap';

const ButtonNormal = ({ type, name, id, cName, value, icon, hasError, action, loading }) => {
    return (
        <div className="form-button">
            <Button type={type} name={name} id={id} className={cName} value={value} disabled={hasError} onClick={action}>
                {
                    loading
                        ? <UseAnimations animation={loadingIco} strokeColor='white' />
                        : <>
                            {   icon && <div>{icon}</div>   }
                            <span>{value}</span>
                            </>
                }
            </Button>
        </div>
    )
}


export default ButtonNormal
