import { combineReducers } from 'redux';
import authReducer from './user/auth/authReducer';
import registerReducer from './user/register/registerReducer';
import userReducer from './user/userReducer';
import contactReducer from './contact/contactReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    currentUser: userReducer,
    addContact: contactReducer,
});

export default rootReducer;