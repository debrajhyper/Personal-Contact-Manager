import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST } from './authTypes';
import axios from 'axios';
import { BASE_API_URL } from '../../../api/HomeAPI';

export const authenticationUser = (email, password) => {
    const credentials = {
        username: email,
        password: password
    }
    return dispatch => {
        dispatch(loginRequest());
        axios.post(`${BASE_API_URL}/generate-token`, credentials)
        .then(response => {
            dispatch(loginSuccess(true));
            setToken(response.data.token);
        })
        .catch(error => {
            dispatch(loginFailure(false, error.response.data.message));
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

export const logoutUser = () => {
    return dispatch => {
        dispatch(logoutRequest());
        dispatch(loginSuccess(false));
        localStorage.removeItem('jwtToken');
        window.location = "/";
    };
}