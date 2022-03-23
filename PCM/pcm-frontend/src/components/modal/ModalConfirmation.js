import React from 'react'

import ButtonNormal from '../buttons/ButtonNormal';

import { Modal } from 'react-bootstrap';

const ModalConfirmation = ({ modalProfilePicShow, setModalProfilePicShow }) => {
    const handleClose = () => {
        setModalProfilePicShow(false);
    };

    const handleUpload = () => {
        setModalProfilePicShow(false);
    }
    return (
        <Modal className='profile-pic' show={modalProfilePicShow} onHide={handleClose} centered animation={true} autoFocus={true} id="modal">
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="flex-prop profilePic text-center">
                {/* <ProfilePic image={profilePicURL} outline={true} /> */}
                <h1>hi</h1>
            </Modal.Body>
            <Modal.Footer className="action_button justify-content-evenly pb-5 m-0">
                <ButtonNormal type='reset' name='cancelBtn' id='CancelBtn' cName='btn form_reset red' value='Cancel' action={handleClose} />
                <ButtonNormal type='submit' name='uploadBtn' id='UploadBtn' cName='btn' value='Upload' action={handleUpload} />
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirmation