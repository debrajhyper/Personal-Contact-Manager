import { VIEW_CONTACT_REQUEST, VIEW_CONTACT_SUCCESS, VIEW_CONTACT_FAILURE } from "./viewContactTypes";

const initialState = {
    loading: false,
    contact: {},
    error: ''
};

const viewContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case VIEW_CONTACT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case VIEW_CONTACT_SUCCESS:
            return {
                loading: false,
                contact: action.payload,
                error: action.error
            };
        case VIEW_CONTACT_FAILURE:
            return {
                loading: false,
                contact: action.payload,
                error: action.error
            };
        default:
            return state;
    };
};

export default viewContactReducer;