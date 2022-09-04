import { LOGIN_REQUEST, LOGIN_CLEAR, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_ACTION } from './authTypes';

const token = localStorage.jwtToken;

const initialState = {
    loading: false,
    isLoggedIn: token ? true : false,
    // isLoggedIn: '',
    logInError: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case LOGIN_CLEAR:
            return {
                loading: false,
                isLoggedIn: false,
                logInError: ''
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
        case LOGOUT_ACTION:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default authReducer;