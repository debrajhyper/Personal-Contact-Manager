import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST } from './authTypes';
import axios from '../../../api/HomeAPI';
import { LOGIN_URL } from '../../../api/HomeAPI';

export const authenticationUser = (email, password) => {
    const credentials = {
        username: email,
        password: password
    }
    return dispatch => {
        dispatch(loginRequest());
        axios.post(LOGIN_URL, credentials)
        .then(response => {
            dispatch(loginSuccess(true));
            setToken(response?.data?.token);
        })
        .catch(error => {
            if(!error?.response) {
                dispatch(loginFailure(false, 'A network error occurred. Please try again later.'));
            } else if (error?.response?.status === 401) {
                dispatch(loginFailure(false, 'Invalid Credentials'));
            } else if (error?.response?.status === 500) {
                dispatch(loginFailure(false, 'Internal Server Error'));
            } else {
                dispatch(loginFailure(false, error?.response?.data?.message || 'Oops... Something went wrong'));
            }
        })
    };
};

const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    };
};

const loginSuccess = isLoggedIn => {
    return {
        type: LOGIN_SUCCESS,
        payload: isLoggedIn,
        error: ''
    };
};

const loginFailure = (isLoggedIn, error) => {
    return {
        type: LOGIN_FAILURE,
        payload: isLoggedIn,
        error: error
    };
};

const setToken = token => {
    return localStorage.setItem('jwtToken', token);
};

const logoutRequest = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

export const logoutUser = (to) => {
    return dispatch => {
        dispatch(logoutRequest());
        dispatch(loginSuccess(false));
        localStorage.removeItem('jwtToken');
        window.location = to;
    };
};