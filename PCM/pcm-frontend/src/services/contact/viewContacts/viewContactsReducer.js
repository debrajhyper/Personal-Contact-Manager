import { VIEW_CONTACTS_REQUEST, VIEW_CONTACTS_SUCCESS, VIEW_CONTACTS_FAILURE, VIEW_CONTACTS_CHECKED, VIEW_CONTACTS_CHECKED_ALL } from "./viewContactsTypes";

const initialState = {
    loading: false,
    contacts: [],
    totalContacts: 0,
    page: 0,
    totalPages: 0,
    error: '',
};

const viewContactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case VIEW_CONTACTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case VIEW_CONTACTS_SUCCESS:
            return {
                loading: false,
                contacts: action.payload,
                totalContacts: action.totalContacts,
                page: action.page,
                totalPages: action.totalPages,
                error: action.error
            };
        case VIEW_CONTACTS_FAILURE:
            return {
                loading: false,
                contacts: action.payload,
                totalContacts: action.totalContacts,
                page: action.page,
                totalPages: action.totalPages,
                error: action.error
            };
        case VIEW_CONTACTS_CHECKED:
            return {
                ...state,
                contacts: state.contacts.map(
                        contact => contact.cid === action.payload ? { ...contact, isChecked: action.checked } : contact
                    )
            };
        case VIEW_CONTACTS_CHECKED_ALL:
            return {
                ...state,
                contacts: state.contacts.map(
                        contact => {
                            return { ...contact, isChecked: action.checked }
                        }
                    )
            };
        default:
            return state;
    }
}

export default viewContactsReducer;