import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST } from './authTypes';

const token = localStorage.jwtToken;

const initialState = {
    loading: false,
    isLoggedIn: token ? true : '',
    logInError: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case LOGIN_SUCCESS:
            return {
                loading: false,
                isLoggedIn: action.payload,
                logInError: action.error
            };
        case LOGIN_FAILURE:
            return {
                loading: false,
                isLoggedIn: action.payload,
                logInError: action.error
            };
        case LOGOUT_REQUEST:
            return {
                ...state
            };
        default:
            return state;
    }
}

export default authReducer;