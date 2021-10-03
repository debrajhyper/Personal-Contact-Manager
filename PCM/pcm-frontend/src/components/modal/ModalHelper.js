import React, { useState, useEffect } from 'react'

import modalSuccess from '../../img/38213-success.gif'
import modalError from '../../img/38213-error.gif'

import './modal_helper.scss'

import { Modal, Image } from 'react-bootstrap'


const ModalHelper = (props) => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    useEffect(e => {
        setTimeout(()=>{
            setShow(false)
        }, 5200)
    }, [])

    return (
        <>
            <Modal show={show} onHide={handleClose} id={"modal-"+props.type}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="text-center">
                    <Image src={props.type !== "error" ? modalSuccess : modalError} fluid/>
                    <h5 className="modal-title">{props.message}</h5>
                    <span className="modal-content-box">{props.content}</span>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalHelper
