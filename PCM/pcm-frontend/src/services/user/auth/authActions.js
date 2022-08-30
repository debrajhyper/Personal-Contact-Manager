import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_ACTION } from './authTypes';
import axios, { axiosPrivate } from '../../../api/HomeAPI';
import { LOGIN_URL, LOGOUT_URL } from '../../../api/HomeAPI';
import { toast } from "react-toastify";

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

export const logoutUser = to => {
    return dispatch => {
        dispatch(logoutAction());
        
        axiosPrivate.get(LOGOUT_URL)
        .then(response => {
            console.log(response?.data)
            dispatch(loginFailure(false, "User logged out successfully."));
            setTimeout(() => {
                dispatch(loginFailure(false, ''));
            }, 4000);
            removeToken();
            // window.location = to;
        })
        .catch(error => {
            console.log(error?.response?.data)
            toast.error(error?.response?.data?.message);
        })
    }
}

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

const logoutAction = () => {
    return {
        type: LOGOUT_ACTION
    };
};

const setToken = token => {
    // axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return localStorage.setItem('jwtToken', token);
};

const removeToken = () => {
    return localStorage.removeItem('jwtToken');
};


// const logoutSuccess = (to) => {
//     return {
//         dispatch(loginSuccess(false));
//         localStorage.removeItem('jwtToken');
//         window.location = to;
//     };
// };