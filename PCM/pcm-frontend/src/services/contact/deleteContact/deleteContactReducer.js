import { DELETE_CONTACT_REQUEST, DELETE_CONTACT_CLEAR, DELETE_CONTACT_SUCCESS, DELETE_CONTACT_FAILURE } from "./deleteContactTypes";

const initialState = {
    loading: false,
    deleteContactSuccess: false,
    allDeleted: 0,
    deleteContactMessage: '',
    deleteContactError: ''
};

const deleteContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_CONTACT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case DELETE_CONTACT_CLEAR:
            return {
                loading: false,
                deleteContactSuccess: false,
                allDeleted: 0,
                deleteContactMessage: '',
                deleteContactError: ''
            };
        case DELETE_CONTACT_SUCCESS:
            return {
                loading: false,
                deleteContactSuccess: true,
                allDeleted: action.allDeleted,
                deleteContactMessage: action.payload,
                deleteContactError: action.error
            };
        case DELETE_CONTACT_FAILURE:
            return {
                loading: false,
                deleteContactSuccess: false,
                allDeleted: action.allDeleted,
                deleteContactMessage: action.payload,
                deleteContactError: action.error
            };
        default:
            return state;
    };
};

export default deleteContactReducer;