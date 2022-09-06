import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAILURE, CONTACT_CHECKED, CONTACT_CHECKED_ALL } from "./viewContactsTypes";

const initialState = {
    loading: false,
    contacts: [],
    totalContacts: 0,
    page: 0,
    totalPages: 0,
    error: '',
}

const viewContactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONTACT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CONTACT_SUCCESS:
            return {
                loading: false,
                contacts: action.payload,
                totalContacts: action.totalContacts,
                page: action.page,
                totalPages: action.totalPages,
                error: action.error
            };
        case CONTACT_FAILURE:
            return {
                loading: false,
                contacts: action.payload,
                totalContacts: action.totalContacts,
                page: action.page,
                totalPages: action.totalPages,
                error: action.error
            };
        case CONTACT_CHECKED:
            return {
                ...state,
                contacts: state.contacts.map(
                        contact => contact.cid === action.payload ? { ...contact, isChecked: action.checked } : contact
                    )
            };
        case CONTACT_CHECKED_ALL:
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