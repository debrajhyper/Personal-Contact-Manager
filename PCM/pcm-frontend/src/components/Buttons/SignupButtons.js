import React from 'react'

import { Button } from 'react-bootstrap'

const SignupButtons = ({ type, name, id, cName, value, action }) => {
    return (
        <>
            <div className="form-button">
                <Button type={type} name={name} id={id} className={cName} value={value} onClick={action}>{value}</Button>
            </div>
        </>
    )
}


export default SignupButtons
