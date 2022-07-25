import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAILURE } from "./deleteContactTypes";

const initialState = {
    loading: false,
    success: false,
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
                success: true,
                allDeleted: action.allDeleted,
                message: action.payload,
                error: action.error
            }
        case CONTACT_FAILURE:
            return {
                loading: false,
                success: false,
                allDeleted: action.allDeleted,
                message: action.payload,
                error: action.error
            }
        default:
            return state;
    }
}

export default deleteContactReducer;