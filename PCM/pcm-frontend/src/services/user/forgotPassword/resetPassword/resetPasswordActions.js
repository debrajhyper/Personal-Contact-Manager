import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_CLEAR, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from './resetPasswordTypes';
import axios, { RESET_PASSWORD_URL } from '../../../../api/HomeAPI';

export const resetPassword = (userEmail, newPassword) => {
    return dispatch => {
        dispatch(resetPasswordRequest());

        axios.post(RESET_PASSWORD_URL, null, {
            params: {
                email: userEmail,
                password: newPassword
            }
        })
        .then(response => {
            dispatch(resetPasswordSuccess(true, response?.data));
            setTimeout(() => {
                dispatch(resetPasswordSuccess(false, response?.data));
            }, 1000);
        })
        .catch(error => {
            dispatch(resetPasswordFailure(error?.response?.data?.message));
        })
    };
};

export const clearResetPassword = () => {
    return dispatch => {
        dispatch(resetPasswordClear());
    };
};

const resetPasswordRequest = () => {
    return {
        type: RESET_PASSWORD_REQUEST
    };
};

const resetPasswordClear = () => {
    return {
        type: RESET_PASSWORD_CLEAR
    };
};

const resetPasswordSuccess = (passwordReset, message) => {
    return {
        type: RESET_PASSWORD_SUCCESS,
        passwordReset: passwordReset,
        payload: message,
        error: ''
    };
};

const resetPasswordFailure = error => {
    return {
        type: RESET_PASSWORD_FAILURE,
        passwordReset: false,
        payload: '',
        error: error
    };
};