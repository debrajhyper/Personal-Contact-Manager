import { SEND_OTP_REQUEST, SEND_OTP_CLEAR, SEND_OTP_SUCCESS, SEND_OTP_FAILURE } from './sendOTPTypes';
import axios, { SEND_OTP_URL } from '../../../../api/HomeAPI';

export const sendOTP = userEmail => {
    return dispatch => {
        dispatch(sendOTPRequest());

        axios.post(SEND_OTP_URL , null, {
            params: {
                email: userEmail
            }
        })
        .then(response => {
            dispatch(sendOTPSuccess(true, response?.data?.message, response?.data?.generatedOTP, response?.data?.maxInActiveInterval, response?.data?.email));
            
            setTimeout(() => {
                dispatch(sendOTPSuccess(false, response?.data?.message, response?.data?.generatedOTP, response?.data?.maxInActiveInterval, response?.data?.email));
            }, 1000);
            
            setTimeout(() => {
                dispatch(sendOTPFailure(response?.data?.email, ''));
            }, response?.data?.maxInActiveInterval);
            
            setTimeout(() => {
                dispatch(sendOTPClear())
            }, 300000);
        })
        .catch(error => {
            dispatch(sendOTPFailure('', error?.response?.data?.message));
        })
    };
};

export const clearSendOTP = () => {
    return dispatch => {
        dispatch(sendOTPClear());
    };
};

const sendOTPRequest = () => {
    return {
        type: SEND_OTP_REQUEST
    };
};

const sendOTPClear = () => {
    return {
        type: SEND_OTP_CLEAR
    };
};

const sendOTPSuccess = (emailSent, message, generatedOTP, maxInActiveInterval, email) => {
    return {
        type: SEND_OTP_SUCCESS,
        emailSent: emailSent,
        payload: message,
        generatedOTP: generatedOTP,
        maxInActiveInterval: maxInActiveInterval,
        email: email,
        error: ''
    };
};

const sendOTPFailure = (email, error) => {
    return {
        type: SEND_OTP_FAILURE,
        emailSent: false,
        payload: '',
        generatedOTP: '',
        maxInActiveInterval: 0,
        email: email,
        error: error
    };
};