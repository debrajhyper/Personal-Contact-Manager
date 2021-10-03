import axios from "axios";
import { BASE_API_URL } from "../api/HomeAPI";

class LoginServices {
    
    // login user : generate token 
    generateToken(Credential) {
        return axios.post(`${BASE_API_URL}/generate-token`, Credential);
    }

    // login user : set token in LocalStorage
    setToken(token) {
        localStorage.setItem('token', token);
        return true;
    }

    // login user :  get token from localStorage
    getToken() {
        return localStorage.getItem('token');
    }

    // isLogged in : user is logged in or not
    isLoggedIn() {
        let tokenStr = localStorage.getItem('token');

        if(tokenStr !== undefined || tokenStr !== '' || tokenStr !== null) {
            return true;
        } else {
            return false;
        }
    }

    // logout : remove token from local storage
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return true;
    }

}

export default new LoginServices();