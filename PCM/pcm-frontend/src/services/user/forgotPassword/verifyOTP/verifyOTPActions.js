import { VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE } from './verifyOTPTypes';
import axios, { CHANGE_PASSWORD_URL, VERIFY_OTP_URL }  from '../../../../api/HomeAPI';

export const verifyOTP = (userEmail, userOTP, serviceOTP) => {
    return dispatch => {
        dispatch(verifyOTPRequest());

        console.log(userEmail, userOTP, serviceOTP)

        axios.post(VERIFY_OTP_URL , null, {
            params: {
                email: userEmail,
                otp: userOTP,
                generatedOTP: serviceOTP
            }
        })
        .then(response => {
            console.log(response.data)
            dispatch(verifyOTPSuccess(response?.data));
        })
        .catch(error => {
            console.log(error.response.data);
            dispatch(verifyOTPFailure(error.response.data.message));
        })
    }
}

export const clearVerifyOTPError = () => {
    return dispatch => {
        dispatch(verifyOTPFailure(''));
    }
}

const verifyOTPRequest = () => {
    return {
        type: VERIFY_OTP_REQUEST
    };
};

const verifyOTPSuccess = verifiedOTP => {
    return {
        type: VERIFY_OTP_SUCCESS,
        payload: verifiedOTP,
        error: ''
    };
};

const verifyOTPFailure = error => {
    return {
        type: VERIFY_OTP_FAILURE,
        payload: false,
        error: error
    };
};