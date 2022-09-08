import { ADD_CONTACT_REQUEST, ADD_CONTACT_SUCCESS, ADD_CONTACT_FAILURE } from "./addContactTypes";

const initialState = {
    loading: false,
    addContactMessage: '',
    addContactError: '',
};

const addContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTACT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ADD_CONTACT_SUCCESS:
            return {
                loading: false,
                addContactMessage: action.payload,
                addContactError: action.error
            };
        case ADD_CONTACT_FAILURE:
            return {
                loading: false,
                addContactMessage: action.payload,
                addContactError: action.error
            };
        default:
            return state;
    };
};

export default addContactReducer;