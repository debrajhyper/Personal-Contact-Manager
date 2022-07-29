import { UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE } from './updateUserTypes';

const initialState = {
    loading: false,
    success: false,
    message: '',
    error: '',
}

const updateUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_USER_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload,
                error: action.error,
            }
        case UPDATE_USER_FAILURE:
            return {
                loading: false,
                success: false,
                message: action.payload,
                error: action.error,
            }
        default:
            return state
    }
}

export default updateUserReducer;