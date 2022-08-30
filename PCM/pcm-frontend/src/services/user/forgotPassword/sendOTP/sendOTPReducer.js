import { SEND_OTP_REQUEST, SEND_OTP_SUCCESS, SEND_OTP_FAILURE } from './sendOTPTypes';

const initialState = {
    loading: false,
    emailSent: false,
    message: '',
    generatedOTP: '',
    maxInActiveInterval: 0,
    email: '',
    error: ''
}

const sendOTPReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEND_OTP_REQUEST:
            return {
                ...state,
                loading: true
            };
        case SEND_OTP_SUCCESS:
            return {
                loading: false,
                emailSent: action.emailSent,
                message: action.payload,
                generatedOTP: action.generatedOTP,
                maxInActiveInterval: action.maxInActiveInterval,
                email: action.email,
                error: action.error
            };
        case SEND_OTP_FAILURE:
            return {
                loading: false,
                emailSent: action.emailSent,
                message: action.payload,
                generatedOTP: action.generatedOTP,
                maxInActiveInterval: action.maxInActiveInterval,
                email: action.email,
                error: action.error
            };
        default:
            return state;
    }
}

export default sendOTPReducer;