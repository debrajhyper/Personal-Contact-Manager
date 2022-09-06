import React from 'react';

import './modal.scss';

import ProfilePic from '../profile-pic/ProfilePic';
import ButtonNormal from '../buttons/ButtonNormal';
import { Modal } from 'react-bootstrap';

const ModalProfilePic = ({ modalProfilePicShow, setModalProfilePicShow, profilePicURL, functionCancel, functionUpload, hasError }) => {

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
            <Modal.Footer className="action_button center pb-5 m-0">
                <ButtonNormal type='submit' name='uploadBtn' id='UploadBtn' cName='fill me-4' value='Upload' hasError={hasError} action={handleUpload} />
                <ButtonNormal type='reset' name='cancelBtn' id='CancelBtn' cName='danger' value='Cancel' action={handleClose} />
            </Modal.Footer>
        </Modal>
    )
}

export default ModalProfilePic