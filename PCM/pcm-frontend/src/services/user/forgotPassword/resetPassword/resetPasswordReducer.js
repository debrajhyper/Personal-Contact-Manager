import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_CLEAR, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from './resetPasswordTypes';

const initialState = {
    loading: false,
    passwordReset: false,
    resetPasswordMessage: '',
    resetPasswordError: ''
};

const resetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            };
        case RESET_PASSWORD_CLEAR:
            return {
                loading: false,
                passwordReset: false,
                resetPasswordMessage: '',
                resetPasswordError: ''
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                passwordReset: action.passwordReset,
                resetPasswordMessage: action.payload,
                resetPasswordError: action.error
            };
        case RESET_PASSWORD_FAILURE:
            return {
                loading: false,
                passwordReset: action.passwordReset,
                resetPasswordMessage: action.payload,
                resetPasswordError: action.error
            };
        default:
            return state;
    }
}

export default resetPasswordReducer;