import axios from "axios";
import { BASE_API_URL } from "../api/HomeAPI";
import LoginServices from "./LoginServices";

const TOKEN_HEADER = 'Authorization';

const token = LoginServices.getToken();
//console.log("Local Storage Token -> ", token)

const authAxios = axios.create({
    baseURL: BASE_API_URL
})

authAxios.interceptors.request.use((config) => {
    //console.log(config);
    config.headers[TOKEN_HEADER] = `Bearer ${token}`;

    return config;
})

export default authAxios;

