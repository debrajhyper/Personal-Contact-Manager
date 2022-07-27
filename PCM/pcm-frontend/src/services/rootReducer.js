import { combineReducers } from 'redux';
import authReducer from './user/auth/authReducer';
import registerReducer from './user/register/registerReducer';
import userReducer from './user/userReducer';
import addContactReducer from './contact/addContact/addContactReducer';
import viewContactsReducer from './contact/viewContacts/viewContactsReducer';
import viewContactReducer from './contact/viewContact/viewContactReducer';
import deleteContactReducer from './contact/deleteContact/deleteContactReducer';
import searchContactReducer from './contact/searchContact/searchContactReducer';
import updateContactReducer from './contact/updateContact/updateContactReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    currentUser: userReducer,
    addContact: addContactReducer,
    viewContacts: viewContactsReducer,
    viewContact: viewContactReducer,
    deleteContact: deleteContactReducer,
    searchContact: searchContactReducer,
    updateContact: updateContactReducer,
});

export default rootReducer;