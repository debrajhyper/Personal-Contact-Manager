import axios from "axios";
import { BASE_API_URL } from "../api/HomeAPI";

class RegisterServices {
    
    doRegister(user) {
        return axios.post(`${BASE_API_URL}/do_register`, user);
    }
}

export default new RegisterServices();