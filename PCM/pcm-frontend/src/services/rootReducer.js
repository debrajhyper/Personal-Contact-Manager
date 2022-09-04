import { combineReducers } from 'redux';
import authReducer from './user/auth/authReducer';
import sendOTPReducer from './user/forgotPassword/sendOTP/sendOTPReducer';
import verifyOTPReducer from './user/forgotPassword/verifyOTP/verifyOTPReducer';
import resetPasswordReducer from './user/forgotPassword/resetPassword/resetPasswordReducer';
import registerReducer from './user/register/registerReducer';
import userReducer from './user/userReducer';
import addContactReducer from './contact/addContact/addContactReducer';
import viewContactsReducer from './contact/viewContacts/viewContactsReducer';
import paginationReducer from './contact/pagination/paginationReducer';
import viewContactReducer from './contact/viewContact/viewContactReducer';
import deleteContactReducer from './contact/deleteContact/deleteContactReducer';
import searchContactReducer from './contact/searchContact/searchContactReducer';
import updateContactReducer from './contact/updateContact/updateContactReducer';
import updateUserReducer from './user/updateUser/updateUserReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    sendOTP: sendOTPReducer,
    verifyOTP: verifyOTPReducer,
    resetPassword: resetPasswordReducer,
    register: registerReducer,
    currentUser: userReducer,
    addContact: addContactReducer,
    viewContacts: viewContactsReducer,
    pagination: paginationReducer,
    viewContact: viewContactReducer,
    deleteContact: deleteContactReducer,
    searchContact: searchContactReducer,
    updateContact: updateContactReducer,
    updateUser: updateUserReducer,
});

export default rootReducer;