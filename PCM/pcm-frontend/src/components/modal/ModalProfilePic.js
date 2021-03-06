import React from 'react'

import ProfilePic from '../profile-pic/ProfilePic';
import ButtonNormal from '../buttons/ButtonNormal';

import './modal.scss';

import { Modal } from 'react-bootstrap';

const ModalProfilePic = ({ modalProfilePicShow, setModalProfilePicShow, profilePic, profilePicURL, functionCancel, functionUpload, hasError }) => {

    const handleClose = () => {
        setModalProfilePicShow(false);
        functionCancel();
    };

    const handleUpload = () => {
        setModalProfilePicShow(false);
        functionUpload();
    }

    return (
        <Modal className='profile-pic' show={modalProfilePicShow} onHide={handleClose} centered animation={true} autoFocus={true} id="modal">
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="flex-prop profilePic text-center">
                <ProfilePic image={profilePicURL} outline={true} />
                {
                    hasError &&
                    <Modal.Title className="e_msg error_form" id="name_error_message">
                        {hasError}
                    </Modal.Title>
                }
            </Modal.Body>
            <Modal.Footer className="action_button justify-content-evenly pb-5 m-0">
                <ButtonNormal type='reset' name='cancelBtn' id='CancelBtn' cName='btn form_reset red' value='Cancel' action={handleClose} />
                <ButtonNormal type='submit' name='uploadBtn' id='UploadBtn' cName='btn' value='Upload' hasError={hasError} action={handleUpload} />
            </Modal.Footer>
        </Modal>
    )
}

export default ModalProfilePic