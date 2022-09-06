import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./registerTypes";

const initialState = {
    loading: false,
    isRegistered: false,
    status: null,
    registerError: ''
};

const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {
                ...state,
                loading: true
            };
        case SIGNUP_SUCCESS:
            return {
                loading: false,
                isRegistered: action.payload,
                status: action.status,
                registerError: action.error
            };
        case SIGNUP_FAILURE:
            return {
                loading: false,
                isRegistered: action.payload,
                status: action.status,
                registerError: action.error
            };
        default:
            return state;
    }
}

export default signupReducer;