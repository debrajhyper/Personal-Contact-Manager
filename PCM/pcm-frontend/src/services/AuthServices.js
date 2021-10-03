import authAxios from "./AuthHeader";
import LoginServices from "./LoginServices";

class AuthServices {

    // get current user : which is logged in
    getCurrentUser() {
        return authAxios.get('/current-user');
    }

    // set userDetails
    setUser(user) {
        user.password = null;
        localStorage.setItem('user', JSON.stringify(user));
    }

    // get userDetails
    getUser() {
        let userStr = localStorage.getItem('user');
        if(userStr != null) {
            return JSON.parse(userStr);
        } else {
            LoginServices.logout();
            return null;
        }
    }

    // get user Role
    getUserRole() {
        let user = this.getUser();
        return user.authorities[0].authority;
    }
    
}

export default new AuthServices();