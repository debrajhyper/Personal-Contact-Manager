import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAILURE } from "./addContactTypes";

const initialState = {
    loading: false,
    addContactMessage: '',
    addContactError: '',
};

const addContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONTACT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case CONTACT_SUCCESS:
            return {
                loading: false,
                addContactMessage: action.payload,
                addContactError: action.error
            };
        case CONTACT_FAILURE:
            return {
                loading: false,
                addContactMessage: action.payload,
                addContactError: action.error
            };
        default:
            return state;
    }
}

export default addContactReducer;