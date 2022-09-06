import { CONTACT_REQUEST, CONTACT_CLEAR, CONTACT_SUCCESS, CONTACT_FAILURE } from "./updateContactTypes";

const initialState = {
    loading: false,
    updateContactSuccess: false,
    contact: {},
    error: '',
};

const updateContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONTACT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CONTACT_CLEAR:
            return {
                loading: false,
                updateContactSuccess: false,
                contact: {},
                error: '',
            };
        case CONTACT_SUCCESS:
            return {
                loading: false,
                updateContactSuccess: true,
                contact: action.payload,
                error: action.error
            };
        case CONTACT_FAILURE:
            return {
                loading: false,
                updateContactSuccess: false,
                contact: action.payload,
                error: action.error
            };
        default:
            return state;
    };
};

export default updateContactReducer;