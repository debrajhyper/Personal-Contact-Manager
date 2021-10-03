import React from 'react'

import { Button } from 'react-bootstrap'

const SignupButtons = (props) => {
    return (
        <>
            <div className="form-button">
                <Button type={props.type} name={props.name} id={props.id} className={props.cName} value={props.value} onClick={props.function}>{props.value}</Button>
            </div>
        </>
    )
}


export default SignupButtons
