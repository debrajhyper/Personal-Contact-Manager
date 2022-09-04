import { VERIFY_OTP_REQUEST, VERIFY_OTP_CLEAR, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE } from './verifyOTPTypes';

const initialState = {
    loading: false,
    verifiedOTP: false,
    verifyOTPError: '',
}

const verifyOTPReducer = (state = initialState, action) => {
    switch (action.type) {
        case VERIFY_OTP_REQUEST:
            return {
                ...state,
                loading: true
            };
        case VERIFY_OTP_CLEAR:
                return {
                    loading: false,
                    verifiedOTP: false,
                    verifyOTPError: '',
                };
        case VERIFY_OTP_SUCCESS:
            return {
                loading: false,
                verifiedOTP: action.payload,
                verifyOTPError: action.error
            };
        case VERIFY_OTP_FAILURE:
            return {
                loading: false,
                verifiedOTP: action.payload,
                verifyOTPError: action.error
            };
        default:
            return state;
    }
}

export default verifyOTPReducer;