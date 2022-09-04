import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAILURE } from "./deleteContactTypes";

const initialState = {
    loading: false,
    deleteContactSuccess: false,
    allDeleted: false,
    message: '',
    error: ''
}

const deleteContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONTACT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CONTACT_SUCCESS:
            return {
                loading: false,
                deleteContactSuccess: true,
                allDeleted: action.allDeleted,
                message: action.payload,
                error: action.error
            }
        case CONTACT_FAILURE:
            return {
                loading: false,
                deleteContactSuccess: false,
                allDeleted: action.allDeleted,
                message: action.payload,
                error: action.error
            }
        default:
            return state;
    }
}

export default deleteContactReducer;