import { combineReducers } from 'redux';
import contactMeReducer from './contactMe/contactMeReducer';
import authReducer from './user/auth/authReducer';
import sendOTPReducer from './user/forgotPassword/sendOTP/sendOTPReducer';
import verifyOTPReducer from './user/forgotPassword/verifyOTP/verifyOTPReducer';
import resetPasswordReducer from './user/forgotPassword/resetPassword/resetPasswordReducer';
import registerReducer from './user/register/registerReducer';
import userReducer from './user/userReducer';
import searchContactReducer from './contact/searchContact/searchContactReducer';
import paginationReducer from './contact/pagination/paginationReducer';
import viewContactsReducer from './contact/viewContacts/viewContactsReducer';
import viewContactReducer from './contact/viewContact/viewContactReducer';
import updateContactReducer from './contact/updateContact/updateContactReducer';
import deleteContactReducer from './contact/deleteContact/deleteContactReducer';
import addContactReducer from './contact/addContact/addContactReducer';
import updateUserReducer from './user/updateUser/updateUserReducer';

const rootReducer = combineReducers({
    contactMe: contactMeReducer,
    auth: authReducer,
    sendOTP: sendOTPReducer,
    verifyOTP: verifyOTPReducer,
    resetPassword: resetPasswordReducer,
    register: registerReducer,
    currentUser: userReducer,
    searchContact: searchContactReducer,
    pagination: paginationReducer,
    viewContacts: viewContactsReducer,
    viewContact: viewContactReducer,
    updateContact: updateContactReducer,
    deleteContact: deleteContactReducer,
    addContact: addContactReducer,
    updateUser: updateUserReducer,
});

export default rootReducer;