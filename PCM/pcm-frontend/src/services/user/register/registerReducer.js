import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./registerTypes";

const initialState = {
    loading: false,
    isRegistered: '',
    status: null,
    registerError: ''
};

const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {
                loading: true,
                isRegistered: action.payload,
                status: action.status,
                registerError: action.error
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