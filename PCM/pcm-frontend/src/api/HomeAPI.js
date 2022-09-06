import axios from "axios";
import jwtDecode from "jwt-decode";

const BASE_URL = "http://localhost:1010";
export const LOGIN_URL = "/generate-token";
export const SEND_OTP_URL = "/send-otp";
export const VERIFY_OTP_URL = "/verify-otp";
export const RESET_PASSWORD_URL = "/reset-password";
export const LOGOUT_URL = "/logout-user";
export const SIGNUP_URL = "/register";
export const CURRENT_USER_URL = "/current-user";
export const SEARCH_CONTACT_URL = "/search/";
export const VIEW_CONTACTS_URL = "/view-contacts/";
export const VIEW_CONTACT_URL = "/view-contact/";
export const UPDATE_CONTACT_URL = "/update-contact";
export const DELETE_CONTACT_URL = "/delete-contact/";
export const DELETE_SELECTED_CONTACTS_URL = "/delete-selected-contacts/";
export const ADD_CONTACT_URL = "/add-contact";
export const UPDATE_USER_URL = "/update-user";

const TOKEN_HEADER = 'Authorization';

export const config = {
    headers: {
        'content-type': 'multipart/form-data; boundary=<calculated when request is sent>'
    }
}

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL
});

// axiosPrivate.defaults.headers.common[TOKEN_HEADER] = `Bearer ${jwtToken}`;
axiosPrivate.interceptors.request.use(config => {
    const jwtToken = localStorage.getItem('jwtToken');
    
    const verify = verifyToken(jwtToken);
    if(verify) {
        config.headers[TOKEN_HEADER] = `Bearer ${jwtToken}`;
    }
    else {
        localStorage.removeItem('jwtToken');
    }
    
    // console.log(config);
    return config;
});

export const verifyToken = jwtToken => {
    if(jwtToken === undefined || jwtToken === null) {
        return false;
    }
    const expires_at = new Date(jwtDecode(jwtToken).exp * 1000);
    return (new Date(expires_at) > new Date()) ? true : false;
}