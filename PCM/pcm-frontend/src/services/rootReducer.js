import { combineReducers } from 'redux';
import authReducer from './user/auth/authReducer';
import registerReducer from './user/register/registerReducer';
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    currentUser: userReducer,
});

export default rootReducer;