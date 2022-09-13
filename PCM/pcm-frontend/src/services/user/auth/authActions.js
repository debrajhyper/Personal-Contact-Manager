import { LOGIN_REQUEST, LOGIN_CLEAR, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_ACTION } from './authTypes';
import axios, { axiosPrivate, JWT_TOKEN, verifyToken } from '../../../api/HomeAPI';
import { LOGIN_URL, LOGOUT_URL } from '../../../api/HomeAPI';
import { toast } from "react-toastify";

export const authenticationUser = (email, password) => {
    const credentials = {
        username: email,
        password: password
    };
    return dispatch => {
        dispatch(loginRequest());

        axios.post(LOGIN_URL, credentials)
        .then(response => {
            dispatch(loginSuccess(true));
            setToken(response?.data?.token);
        })
        .catch(error => {
            if(!error?.response) {
                dispatch(loginFailure('A network error occurred! Please try again later'));
            } 
            else if (error?.response?.status === 401) {
                dispatch(loginFailure('Invalid Credentials'));
            } 
            else if (error?.response?.status === 500) {
                dispatch(loginFailure('Internal Server Error'));
            } 
            else {
                dispatch(loginFailure(error?.response?.data?.message || 'oops... Something went wrong'));
            }
        })
    };
};

export const tokenVerification = token => {
    return dispatch => {
        const isTokenVerified = verifyToken(token);
        if(isTokenVerified) {
            dispatch(loginSuccess(true));
        }
        else {
            dispatch(loginFailure('The session you are currently using has expired. Please try logging in again'));
        }
    };
};

export const logoutUser = to => {
    return dispatch => {
        dispatch(logoutAction());
        
        axiosPrivate.get(LOGOUT_URL)
        .then(response => {
            dispatch(loginFailure(response?.data));
            removeToken();
            // window.location = to;
        })
        .catch(error => {
            toast.error(error?.response?.data?.message);
        })
    };
};

export const clearLogin = () => {
    return dispatch => {
        dispatch(loginClear());
    };
};

const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    };
};

const loginClear = () => {
    return {
        type: LOGIN_CLEAR
    };
};

const loginSuccess = isLoggedIn => {
    return {
        type: LOGIN_SUCCESS,
        payload: isLoggedIn,
        error: ''
    };
};

const loginFailure = error => {
    return {
        type: LOGIN_FAILURE,
        payload: false,
        error: error
    };
};

const logoutAction = () => {
    return {
        type: LOGOUT_ACTION
    };
};

export const setToken = jwtToken => {
    return localStorage.setItem(JWT_TOKEN, jwtToken);
};

export const getToken = () => {
    return localStorage.getItem(JWT_TOKEN);
}

export const removeToken = () => {
    return localStorage.removeItem(JWT_TOKEN);
};