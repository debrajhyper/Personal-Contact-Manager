import { SEND_OTP_REQUEST, SEND_OTP_SUCCESS, SEND_OTP_FAILURE } from './sendOTPTypes';
import axios, { SEND_OTP_URL } from '../../../../api/HomeAPI';

export const sendOTP = (email) => {
    return dispatch => {
        dispatch(sendOTPRequest());

        axios.post(SEND_OTP_URL , null, {
            params: email
        })
        .then(response => {
            console.log(response.data)
            dispatch(sendOTPSuccess(true, response?.data?.message, response?.data?.generatedOTP, response?.data?.maxInActiveInterval, response?.data?.email));
            setTimeout(() => {
                dispatch(sendOTPSuccess(false, response?.data?.message, response?.data?.generatedOTP, response?.data?.maxInActiveInterval, response?.data?.email));
            }, 1000);
            setTimeout(() => {
                dispatch(sendOTPFailure(''));
            }, response?.data?.maxInActiveInterval);
        })
        .catch(error => {
            console.log(error.response.data)
            dispatch(sendOTPFailure(error?.response?.data?.message));
        })
    }
}

const sendOTPRequest = () => {
    return {
        type: SEND_OTP_REQUEST
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

const sendOTPFailure = error => {
    return {
        type: SEND_OTP_FAILURE,
        emailSent: false,
        payload: '',
        generatedOTP: '',
        maxInActiveInterval: 0,
        email: '',
        error: error
    };
};