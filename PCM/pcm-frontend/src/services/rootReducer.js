import { combineReducers } from 'redux';
import authReducer from './user/auth/authReducer';
import registerReducer from './user/register/registerReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer
});

export default rootReducer;