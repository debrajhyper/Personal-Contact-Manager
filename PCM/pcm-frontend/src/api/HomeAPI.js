import axios from "axios";

const BASE_URL = "http://localhost:1010";
export const LOGIN_URL = "/generate-token";
export const SIGNUP_URL = "/do_register";
export const CURRENT_USER_URL = "/current-user";

const TOKEN_HEADER = 'Authorization';


export default axios.create({
    baseURL: BASE_URL,
    // withCredentials: true,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    // withCredentials: true
});

axiosPrivate.interceptors.request.use((config) => {
    const jwtToken = localStorage.getItem('jwtToken');
    config.headers[TOKEN_HEADER] = `Bearer ${jwtToken}`;
    return config;
});