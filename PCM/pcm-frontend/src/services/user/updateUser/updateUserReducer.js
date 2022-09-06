import { UPDATE_USER_REQUEST, UPDATE_USER_CLEAR, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE } from './updateUserTypes';

const initialState = {
    loading: false,
    updateUserSuccess: false,
    message: '',
    error: '',
};

const updateUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_USER_CLEAR:
            return {
                loading: false,
                updateUserSuccess: false,
                message: '',
                error: '',
            };
        case UPDATE_USER_SUCCESS:
            return {
                loading: false,
                updateUserSuccess: action.success,
                message: action.payload,
                error: action.error,
            };
        case UPDATE_USER_FAILURE:
            return {
                loading: false,
                updateUserSuccess: action.success,
                message: action.payload,
                error: action.error,
            };
        default:
            return state;
    }
}

export default updateUserReducer;