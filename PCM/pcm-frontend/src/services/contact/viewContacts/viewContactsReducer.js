import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAILURE } from "./viewContactsTypes";

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
            }
        case CONTACT_SUCCESS:
            return {
                loading: false,
                contacts: action.payload,
                totalContacts: action.totalContacts,
                page: action.page,
                totalPages: action.totalPages,
                error: action.error
            }
        case CONTACT_FAILURE:
            return {
                loading: false,
                contacts: action.payload,
                totalContacts: action.totalContacts,
                page: action.page,
                totalPages: action.totalPages,
                error: action.error
            }
        default:
            return state;
    }
}

export default viewContactsReducer;