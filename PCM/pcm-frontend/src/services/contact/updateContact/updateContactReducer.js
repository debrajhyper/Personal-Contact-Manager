import { UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_CLEAR, UPDATE_CONTACT_SUCCESS, UPDATE_CONTACT_FAILURE } from "./updateContactTypes";

const initialState = {
    loading: false,
    updateContactSuccess: false,
    updateContactMessage: '',
    updateContactError: '',
};

const updateContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CONTACT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_CONTACT_CLEAR:
            return {
                loading: false,
                updateContactSuccess: false,
                updateContactMessage: '',
                updateContactError: '',
            };
        case UPDATE_CONTACT_SUCCESS:
            return {
                loading: false,
                updateContactSuccess: true,
                updateContactMessage: action.payload,
                updateContactError: action.error
            };
        case UPDATE_CONTACT_FAILURE:
            return {
                loading: false,
                updateContactSuccess: false,
                updateContactMessage: action.payload,
                updateContactError: action.error
            };
        default:
            return state;
    };
};

export default updateContactReducer;