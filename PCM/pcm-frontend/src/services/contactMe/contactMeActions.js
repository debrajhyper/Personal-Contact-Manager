import { CONTACT_ME_EMAIL_REQUEST, CONTACT_ME_EMAIL_CLEAR, CONTACT_ME_EMAIL_SUCCESS, CONTACT_ME_EMAIL_FAILURE } from './contactMeTypes';
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";

export const sendContactMeEmail = contactMeForm => {
    return dispatch => {
        dispatch(contactMeEmailRequest());
        
        emailjs.sendForm(
            process.env.REACT_APP_EMAILJS_SERVICE_ID, 
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID, 
            contactMeForm, 
            process.env.REACT_APP_EMAILJS_PUBLIC_KEY 
        )
        .then(() => {
            dispatch(contactMeEmailSuccess(true));
            toast.success("Your thought sent successfully 😊");
        })
        .catch(error => {
            dispatch(contactMeEmailFailure(error.text));
            toast.error("Something went wrong. Please try again later 🤔");
        });
    };
};

export const clearContactMeEmail = () => {
    return dispatch => {
        dispatch(contactMeEmailClear());
    };
};

const contactMeEmailRequest = () => {
    return {
        type: CONTACT_ME_EMAIL_REQUEST,
    };
};

const contactMeEmailClear = () => {
    return {
        type: CONTACT_ME_EMAIL_CLEAR
    };
};

const contactMeEmailSuccess = success => {
    return {
        type: CONTACT_ME_EMAIL_SUCCESS,
        payload: success,
        error: '',
    };
};

const contactMeEmailFailure = error => {
    return {
        type: CONTACT_ME_EMAIL_FAILURE,
        payload: false,
        error: error,
    };
};