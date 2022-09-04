import { VERIFY_OTP_REQUEST, VERIFY_OTP_CLEAR, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE } from './verifyOTPTypes';
import axios, { VERIFY_OTP_URL }  from '../../../../api/HomeAPI';

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
            dispatch(verifyOTPFailure(error?.response?.data?.message));
        })
    }
}

export const clearVerifyOTP = () => {
    return dispatch => {
        dispatch(verifyOTPClear());
    }
}

const verifyOTPRequest = () => {
    return {
        type: VERIFY_OTP_REQUEST
    };
};

const verifyOTPClear = () => {
    return {
        type: VERIFY_OTP_CLEAR
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