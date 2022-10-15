import { CONTACT_ME_EMAIL_REQUEST, CONTACT_ME_EMAIL_CLEAR, CONTACT_ME_EMAIL_SUCCESS, CONTACT_ME_EMAIL_FAILURE } from './contactMeTypes';

const initialState = {
    loading: false,
    contactMeMailSend: false,
    contactMeMailError: '',
};

const contactMeReducer = (state = initialState, action) => {
    switch(action.type) {
        case CONTACT_ME_EMAIL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case CONTACT_ME_EMAIL_CLEAR:
            return {
                loading: false,
                contactMeMailSend: false,
                contactMeMailError: ''
            };
        case CONTACT_ME_EMAIL_SUCCESS:
            return {
                loading: false,
                contactMeMailSend: action.payload,
                contactMeMailError: action.error
            };
        case CONTACT_ME_EMAIL_FAILURE:
            return {
                loading: false,
                contactMeMailSend: action.payload,
                contactMeMailError: action.error
            };
        default:
            return state;
    }
}

export default contactMeReducer;