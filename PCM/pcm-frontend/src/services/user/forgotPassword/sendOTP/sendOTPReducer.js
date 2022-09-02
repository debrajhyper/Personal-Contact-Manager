import { SEND_OTP_REQUEST, SEND_OTP_SUCCESS, SEND_OTP_FAILURE } from './sendOTPTypes';

const initialState = {
    loading: false,
    emailSent: false,
    sendOTPMessage: '',
    generatedOTP: '',
    maxInActiveInterval: 0,
    email: '',
    sendOTPError: ''
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
                sendOTPMessage: action.payload,
                generatedOTP: action.generatedOTP,
                maxInActiveInterval: action.maxInActiveInterval,
                email: action.email,
                sendOTPError: action.error
            };
        case SEND_OTP_FAILURE:
            return {
                loading: false,
                emailSent: action.emailSent,
                sendOTPMessage: action.payload,
                generatedOTP: action.generatedOTP,
                maxInActiveInterval: action.maxInActiveInterval,
                email: action.email,
                sendOTPError: action.error
            };
        default:
            return state;
    }
}

export default sendOTPReducer;