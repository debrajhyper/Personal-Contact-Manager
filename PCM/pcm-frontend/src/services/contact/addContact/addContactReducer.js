import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAILURE } from "./addContactTypes";

const initialState = {
    loading: false,
    contact: {},
    error: '',
}

const addContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONTACT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CONTACT_SUCCESS:
            return {
                loading: false,
                contact: action.payload,
                error: action.error
            }
        case CONTACT_FAILURE:
            return {
                loading: false,
                contact: action.payload,
                error: action.error
            }
        default:
            return state;
    }
}

export default addContactReducer;